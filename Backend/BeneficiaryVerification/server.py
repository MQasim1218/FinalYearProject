import grpc
from concurrent import futures
import time
import sys
import os

path = os.path.abspath("proto/")

sys.path.append(path)

import proto.server_pb2 as server_pb2  
import proto.server_pb2_grpc as server_pb2_grpc  

# import server_pb2
# import server_pb2_grpc

class VerificationServicer(server_pb2_grpc.Ser):
    def SayHello(self, request, context):
        response = server_pb2.HelloResponse()
        response.message = "Hello, " + request.name
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    server_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Server started")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()
