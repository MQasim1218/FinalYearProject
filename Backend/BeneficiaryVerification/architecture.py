from torch.nn import functional as F
import torch.nn.parallel
import torch.nn as nn
import os
from PIL import Image
import numpy as np
import torch.utils.data as data
import torch.backends.cudnn as cudnn
import torch.optim
import torchvision.transforms as transforms
import torch.utils.data
import torchvision.datasets as datasets
import torchvision.models as models


# Create an inference loader!!
inference_loader = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


def get_predictions_from_model(
    incidents_model,
    batch_input,
    image_paths,
    index_to_incident_mapping,
    index_to_place_mapping,
    inference_dict,
    topk=1,
    activation="softmax",
):
    """
    Input:
    {
        "image_paths" = [list of image paths],
    }
    Returns {
        "incidents": [], # list of topk elements
        "places": [] # list of topk elements
    }
    """
    print("Trying to load the model!")

    trunk_model, incident_layer, place_layer = incidents_model

    # loaded the model
    print("Loaded the model!!")

    # compute output with models
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    input = batch_input.to(device)
    output = trunk_model(input)
    incident_output = incident_layer(output)
    place_output = place_layer(output)

    if activation == "softmax":
        incident_output = F.softmax(incident_output, dim=1)
        place_output = F.softmax(place_output, dim=1)
    elif activation == "sigmoid":
        m = nn.Sigmoid()
        incident_output = m(incident_output)
        place_output = m(place_output)

    incident_probs, incident_idx = incident_output.sort(1, True)
    place_probs, place_idx = place_output.sort(1, True)

    temp_inference_dict = {}

    # batch_input[0] is the batch dimension (the # in the batch)
    for batch_idx in range(len(batch_input.numpy())):
        incidents = []
        for idx in incident_idx[batch_idx].cpu().numpy()[:topk]:
            if idx < len(index_to_incident_mapping):
                incidents.append(
                    index_to_incident_mapping[idx]
                )
            else:
                incidents.append("no incident")

        places = []
        for idx in place_idx[batch_idx].cpu().numpy()[:topk]:
            if idx < len(index_to_place_mapping):
                places.append(
                    index_to_place_mapping[idx]
                )
            else:
                places.append("no place")

        output = {
            "incidents": incidents,
            "places": places,
            "incident_probs": incident_probs[batch_idx].cpu().detach().numpy()[:topk],
            "place_probs": place_probs[batch_idx].cpu().detach().numpy()[:topk]
        }
        image_path = image_paths[batch_idx]
        temp_inference_dict[image_path] = output

    # TODO: maybe return the output here
    if inference_dict is not None:
        inference_dict.update(temp_inference_dict)
    return temp_inference_dict


def update_incidents_model_to_eval_mode(incidents_model):
    print("Switching to eval mode.")
    for m in incidents_model:
        # switch to evaluation mode
        m.eval()


def update_incidents_model_with_checkpoint(incidents_model, mode="", config="config/eccv_final_model", checkpoint_path="pretrained_weights/"):
    """
    Update incidents model with checkpoints (in args.checkpoint_path)
    """

    trunk_model, incident_layer, place_layer = incidents_model

    # TODO: optionally resume from a checkpoint
    # TODO: bring in the original pretrained weights maybe?
    # TODO: remove the args.trunk_resume, etc.
    # TODO: remove path prefix

    config_name = os.path.basename(config)
    print(config_name)

    best_str = "_best" if mode == "test" else ""

    trunk_resume = os.path.join(
        checkpoint_path, "eccv_final_model_trunk{}.pth.tar".format(best_str))
    place_resume = os.path.join(
        checkpoint_path, "eccv_final_model_place{}.pth.tar".format(best_str))
    incident_resume = os.path.join(
        checkpoint_path, "eccv_final_model_incident{}.pth.tar".format(best_str))

    # trunk_resume = "/data/vision/torralba/scratch/ethanweber/DamageAssessment/external/IncidentsDataset/pretrained_weights/eccv_final_model_trunk.pth.tar"
    # place_resume = "/data/vision/torralba/scratch/ethanweber/DamageAssessment/external/IncidentsDataset/pretrained_weights/eccv_final_model_place.pth.tar"
    # incident_resume = "/data/vision/torralba/scratch/ethanweber/DamageAssessment/external/IncidentsDataset/pretrained_weights/eccv_final_model_incident.pth.tar"

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    for (path, net) in [(trunk_resume, trunk_model), (place_resume, place_layer), (incident_resume, incident_layer)]:
        if os.path.isfile(path):
            checkpoint = torch.load(path, map_location=device)
            start_epoch = checkpoint['epoch']
            net.load_state_dict(checkpoint['state_dict'])
            print("Loaded checkpoint '{}' (epoch {}).".format(
                path, checkpoint['epoch']))
        else:
            print("No checkpoint found at '{}'.".format(path))


def get_incidents_model():
    """
    Returns [trunk_model, incident_layer, place_layer]
    """
    # the shared feature trunk model
    trunk_model = get_trunk_model()
    # the incident model
    incident_layer = get_incident_layer()
    # the place model
    place_layer = get_place_layer()

    # print("Let's use", num_gpus, "GPUs!")

    trunk_model = torch.nn.DataParallel(
        # trunk_model, device_ids=range(args.num_gpus)
        trunk_model
    )

    incident_layer = torch.nn.DataParallel(
        # incident_layer, device_ids=range(args.num_gpus)
        incident_layer
    )

    place_layer = torch.nn.DataParallel(
        place_layer
    )

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    trunk_model.to(device)
    incident_layer.to(device)
    place_layer.to(device)
    return [trunk_model, incident_layer, place_layer]


def get_trunk_model(arch="resnet50", pretrained_with_places=True):
    if pretrained_with_places:
        print("loading places weights for pretraining")
        # Declare the model here
        model = models.__dict__[arch](num_classes=365)

        # dir_path = os.path.dirname(os.path.realpath(__file__))

        # Get the current working directory
        dir_path = os.getcwd()
        print("Current Directory:", dir_path)

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # ! Args has an arch property
        if arch == "resnet18":
            model_file = os.path.join(
                dir_path, "pretrained_weights/resnet18_places365.pth.tar"
            )

            checkpoint = torch.load(model_file, map_location=device)

            state_dict = {
                str.replace(k, 'module.', ''): v for k,
                v in checkpoint['state_dict'].items()
            }

            # Load the model
            model.load_state_dict(state_dict)

            model.fc = nn.Linear(512, 1024)
            model = nn.Sequential(model, nn.ReLU())

        elif arch == "resnet50":
            model_file = os.path.join(
                dir_path, "pretrained_weights/resnet50_places365.pth.tar"
            )

            checkpoint = torch.load(model_file, map_location=device)

            state_dict = {
                str.replace(k, 'module.', ''): v for k,
                v in checkpoint['state_dict'].items()
            }
            model.load_state_dict(state_dict)

            model.fc = nn.Linear(2048, 1024)
            model = nn.Sequential(model, nn.ReLU())
        return model

    else:
        # Need to avoid this else statement
        print("loading imagenet weights for pretraining")
        # Otherwise load with imagenet weights
        if arch == "resnet18":
            model = models.resnet18(pretrained=True)
            model.fc = nn.Linear(512, 1024)
            model = nn.Sequential(model, nn.ReLU())

        elif arch == "resnet50":
            model = models.resnet50(pretrained=True)
            model.fc = nn.Linear(2048, 1024)
            model = nn.Sequential(model, nn.ReLU())
        return model


def get_place_layer(activation="sigmoid", fc_dim=1024, num_places=49):
    if activation == "softmax":
        return nn.Linear(fc_dim, num_places + 1)
    elif activation == "sigmoid":
        return nn.Linear(fc_dim, num_places)


def get_incident_layer(activation="sigmoid", fc_dim=1024, num_incidents=43):
    if activation == "softmax":
        return nn.Linear(fc_dim, num_incidents + 1)
    elif activation == "sigmoid":
        return nn.Linear(fc_dim, num_incidents)


def preprocess_data(image_filenames):
    preprocessed_images = []
    # Load and preprocess the images
    preprocessed_images = []
    for filename in image_filenames:
        image = Image.open(filename)
        preprocessed_image = inference_loader(image)
        preprocessed_images.append(preprocessed_image)

    # Convert the list of preprocessed images into a batch tensor
    batch_input = torch.stack(preprocessed_images)

    return batch_input


