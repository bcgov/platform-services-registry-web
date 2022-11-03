# BCGOV platform registry

## How to Deploy

### Pre Requisites

0. install kustomize cli (https://kubectl.docs.kubernetes.io/installation/kustomize/)
1. Login to Openshift
2. oc project to the correct namespaces(currently it living in 101ed4)

## Create buildconfig

You can update the parameter's that will apply to the buildconfig template by updating build-config.properties.

To create the buildconfig and imagestream:

```
oc process -f buildconfig.yaml --param-file=build-config.properties | oc apply -f -
```

## Deploy the app

1. Use kustomize to generate infrastructure code

```
kustomize build openshift/deployment/env/dev > ${ENV}-deployment.yaml
```

2. Check if env is correct in generated yaml file

```
oc apply -f ${ENV}-deployment.yaml
```
