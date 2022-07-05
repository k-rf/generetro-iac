import * as pulumi from "@pulumi/pulumi";

import { CONFIG } from "../variables";

import { ArtifactRegistry } from "./modules/artifact-registry";
import { CloudBuildTrigger } from "./modules/cloud-build";
import { buildSteps } from "./parameters/build-steps";

const artifactRegistry = new ArtifactRegistry({
  resourceName: "generetro-artifact-registry",
  description: "The artifact registry for generetro",
});

export const artifactRegistryName = artifactRegistry.created.name;

const cloudBuildTrigger = new CloudBuildTrigger({
  resourceName: "generetro-cloud-build-trigger",
  description: "The pipeline for generetro",
  build: buildSteps({
    artifactRegistryName: artifactRegistryName.get(),
    cloudRunName: pulumi.output("").get(),
  }),
  tags: [CONFIG.APP.NAME],
});

export const triggerName = cloudBuildTrigger.created.name;
