import { CONFIG } from "../../variables";
import { CloudBuildTriggerProps } from "../modules/cloud-build";

type BuildSteps = (props: {
  artifactRegistryName: string;
  cloudRunName: string;
}) => CloudBuildTriggerProps["build"];

const imagesOnCloudBuild = {
  docker: "gcr.io/cloud-builders/docker",
  gcloud: "gcr.io.google.com/cloudsdktool/cloud-sdk",
};

export const buildSteps: BuildSteps = (props) => {
  const prefix = [
    `${CONFIG.GCP.REGION}-docker.pkg.dev`,
    CONFIG.PULUMI.PROJECT,
    props.artifactRegistryName,
  ].join("/");
  const targetImage = `${prefix}/${CONFIG.APP.NAME}-image`;

  return {
    timeout: "7200s",
    steps: [
      {
        id: "Test",
        name: imagesOnCloudBuild.docker,
        args: [`--target=test`],
      },
      {
        id: "Build",
        name: imagesOnCloudBuild.docker,
        args: [`--target=build`],
      },
      {
        id: "Deploy",
        name: imagesOnCloudBuild.gcloud,
        entrypoint: "gcloud",
        args: [
          `run`,
          `deploy`,
          `${props.cloudRunName}`,
          `--platform=managed`,
          `--image=${targetImage}`,
          `--labels=commit-sha=$COMMIT_SHA,gcb-build-id=$BUILD_ID`,
          `--region=${CONFIG.GCP.REGION}`,
          `--port=3000`,
          `--quiet`,
          `--allow-unauthenticated`,
          `--project=${CONFIG.PULUMI.PROJECT}`,
        ],
      },
    ],
  };
};
