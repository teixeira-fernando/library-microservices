# How to run the application with kubernetes

## Requirements

- Kubectl
- minikube

## Instructions

Make sure that you have minikube running locally first:

``` minikube start ```

Make sure that there are no pods running with the command:

``` kubectl get pods ```

Then, you can deploy the application with:

``` cd kubernetes ```
``` kubectl apply -f . ```

After that, you can monitor the pods by running:

``` minikube dashboard ```


Then, to expose a certain service to external access, you can run:

``` minikube service ((name-of-the-service)) ```

like for example:

``` minikube service customer-service ```

You should get a URL where your service will be exposed, like: http://192.168.49.2:30261/

Once you have that URL, you can make requests and use your service as you want :)


# Helpful links

- https://medium.com/google-cloud/running-a-mean-stack-on-google-cloud-platform-with-kubernetes-149ca81c2b5d
- https://github.com/kubernetes/examples/blob/master/staging/nodesjs-mongodb/README.md
