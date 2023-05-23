import grpc
from concurrent import futures
import time
import sys
import os
import RunModel

path = os.path.abspath("proto/")

sys.path.append(path)

import proto.server_pb2 as server_pb2  
import proto.server_pb2_grpc as server_pb2_grpc  


class VerificationServicer(server_pb2_grpc.Ben_VerificationServicer):
    
    def InitSrv(self, request, context):
        # Initialize the Model and the Global variables!
        RunModel.init()
    
    def VerifyImages(self, request, context):
        # Create a response object
        response = server_pb2.PredictionsRes()

        # Get the image files from the request.
        images = request.images
        print("THE IMAGES RECIEVED ARE: ", images)

        # Send the image urls to the getPrediction function of the Model.
        
        preds = RunModel.getPrediction(images)
        print("Predictions by the model are: ", preds)

        # response.preds[:] = []

        for image_path, prediction in preds.items():
            pred_message = response.preds[image_path]
            pred_message.incidents.extend(prediction['incidents'])
            pred_message.places.extend(prediction['places'])

        # The problem is simple. I have an array of objects, keys are strings and values are again objects, and I need the values.


        
        return response
    
    


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    server_pb2_grpc.add_Ben_VerificationServicer_to_server(VerificationServicer(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Server started")
    try:
        # ! Run the server forever!
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()
