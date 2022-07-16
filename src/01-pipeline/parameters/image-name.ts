import { RESOURCES } from "../../variables";
import { APP_CONFIG } from "../../variables/config/app";
import { GCP_CONFIG } from "../../variables/config/gcp";

const prefix = [
  `${GCP_CONFIG.REGION}-docker.pkg.dev`,
  GCP_CONFIG.PROJECT,
  RESOURCES.ARTIFACT_REGISTRY.NAME,
].join("/");

export const testImage = `${prefix}/${APP_CONFIG.NAME}-test-image`;
export const prodImage = `${prefix}/${APP_CONFIG.NAME}-prod-image`;
