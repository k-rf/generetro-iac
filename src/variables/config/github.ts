import * as pulumi from "@pulumi/pulumi";

export type GithubConfig = {
  REPOSITORY: string;
  OWNER: string;
};

const githubConfig = new pulumi.Config("github");

export const GITHUB_CONFIG: GithubConfig = {
  OWNER: githubConfig.require("owner"),
  REPOSITORY: githubConfig.require("repository"),
};
