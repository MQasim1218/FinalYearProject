# Imports
from architecture import update_incidents_model_to_eval_mode, get_predictions_from_model, get_incidents_model, update_incidents_model_with_checkpoint, preprocess_data

from utils import get_index_to_incident_mapping, get_index_to_place_mapping

import torchvision.transforms as transforms
import cv2

# import torch Already imported top!

import glob
from tqdm import tqdm
import pprint

import matplotlib.pyplot as plt

# The models
model = []

# Create an inference loader!!
inference_loader = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


def get_model():
    # Get the model with pretrained weights
    incidents_model = get_incidents_model()
    
    # 
    update_incidents_model_with_checkpoint(incidents_model)
    
    # Set the model mode to evaluation
    update_incidents_model_to_eval_mode(incidents_model)

    return incidents_model





def get_data():
    # get the data
    image_filenames = sorted(
        glob.glob("test_images/*")
    )

    print(image_filenames)

    # Check the incoming images!
    # for image_filename in image_filenames:
    #     img = cv2.imread(image_filename)[:, :, ::-1].copy()
    #     plt.imshow(img)
    #     plt.show()

    return image_filenames


"""
Program flow
    Get the incident model
    Get the data
    Get the predictions 
"""

# images = get_data()

batch_input = preprocess_data(images)


# Create empty dictionaries to store the inference results
inference_dict = {}

# Get the predictions from the model
predictions = get_predictions_from_model(
    incidents_model=model,
    batch_input=batch_input,
    image_paths=images,
    index_to_incident_mapping=get_index_to_incident_mapping(),
    index_to_place_mapping=get_index_to_place_mapping(),
    inference_dict=inference_dict,
    topk=1,
    activation="softmax", 
)

pprint.pprint(predictions) 

for image in predictions:
    img = cv2.imread(image)[:, :, ::-1].copy()
    plt.imshow(img)
    plt.show()
    pprint.pprint(predictions[image])


# This is the rpc endpoint that the node api
def getPrediction(img_paths):
    """
        1. Call the getPrediction method with the image paths from the node 
        2. Load the image from its path
        3. Preprocess the image.
        4. Load the model, if not already loaded!
        5. Process the image.
        6. Return the prediction as the RPC response.
        7. In Node, save the result in the database!
    """
    print("Getting the prediction for the input images")
    if (model == []):
        model = get_model()
