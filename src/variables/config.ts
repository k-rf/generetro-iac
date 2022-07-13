import * as pulumi from "@pulumi/pulumi";

export type Config = {
  PULUMI: {
    PROJECT: string;
  };
  APP: {
    NAME: string;
  };
  ENV: {
    NOTION_KEY: string;
    NOTION_DATABASE_ID: string;

    NOTION_TEMPLATE_DAILY_ID: string;
    NOTION_TEMPLATE_WEEKLY_ID: string;

    NOTION_REMIND_COLUMN: string;
    NOTION_TAG_COLUMN: string;
    NOTION_ELEMENT_COLUMN: string;
    NOTION_TAG_DAILY: string;
    NOTION_TAG_WEEKLY: string;
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
const envConfig = new pulumi.Config("env");
const gcpConfig = new pulumi.Config("gcp");
const githubConfig = new pulumi.Config("github");

export const CONFIG: Config = {
  PULUMI: {
    PROJECT: pulumi.getProject(),
  },
  APP: {
    NAME: appConfig.require("name"),
  },
  ENV: {
    NOTION_KEY: envConfig.require("notion-key"),
    NOTION_DATABASE_ID: envConfig.require("notion-database-id"),
    NOTION_TEMPLATE_DAILY_ID: envConfig.require("notion-template-daily-id"),
    NOTION_TEMPLATE_WEEKLY_ID: envConfig.require("notion-template-weekly-id"),
    NOTION_REMIND_COLUMN: envConfig.require("notion-remind-column"),
    NOTION_TAG_COLUMN: envConfig.require("notion-tag-column"),
    NOTION_ELEMENT_COLUMN: envConfig.require("notion-element-column"),
    NOTION_TAG_DAILY: envConfig.require("notion-tag-daily"),
    NOTION_TAG_WEEKLY: envConfig.require("notion-tag-weekly"),
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
