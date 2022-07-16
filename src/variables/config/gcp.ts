import * as pulumi from "@pulumi/pulumi";

export type GcpConfig = {
  PROJECT: string;
  REGION: string;
};

const gcpConfig = new pulumi.Config("gcp");

export const GCP_CONFIG: GcpConfig = {
  PROJECT: gcpConfig.require("project"),
  REGION: gcpConfig.require("region"),
};
