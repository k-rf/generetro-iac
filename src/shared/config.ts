import * as pulumi from "@pulumi/pulumi";

export type Config = {
  PULUMI: {
    PROJECT: string;
  };
  APP: {
    NAME: string;
  };
  GCP: {
    PROJECT: string;
    REGION: string;
  };
  GITHUB: {
    REPOSITORY: string;
    OWNER: string;
  };
};

const appConfig = new pulumi.Config("app");
const gcpConfig = new pulumi.Config("gcp");
const githubConfig = new pulumi.Config("github");

export const CONFIG: Config = {
  PULUMI: {
    PROJECT: pulumi.getProject(),
  },
  APP: {
    NAME: appConfig.require("name"),
  },
  GCP: {
    PROJECT: gcpConfig.require("project"),
    REGION: gcpConfig.require("region"),
  },
  GITHUB: {
    OWNER: githubConfig.require("owner"),
    REPOSITORY: githubConfig.require("repository"),
  },
};
