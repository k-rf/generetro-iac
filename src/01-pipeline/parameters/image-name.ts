import { CONFIG, RESOURCES } from "../../variables";

const prefix = [
  `${CONFIG.GCP.REGION}-docker.pkg.dev`,
  CONFIG.GCP.PROJECT,
  RESOURCES.ARTIFACT_REGISTRY.NAME,
].join("/");

export const testImage = `${prefix}/${CONFIG.APP.NAME}-test-image`;
export const prodImage = `${prefix}/${CONFIG.APP.NAME}-prod-image`;
