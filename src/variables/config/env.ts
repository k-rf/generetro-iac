import * as pulumi from "@pulumi/pulumi";

export type EnvConfig = {
  NOTION_KEY: string;
  NOTION_DATABASE_ID: string;

  NOTION_TEMPLATE_DAILY_ID: string;
  NOTION_TEMPLATE_WEEKLY_ID: string;
};

const envConfig = new pulumi.Config("env");

export const ENV_CONFIG: EnvConfig = {
  NOTION_KEY: envConfig.require("notion-key"),
  NOTION_DATABASE_ID: envConfig.require("notion-database-id"),

  NOTION_TEMPLATE_DAILY_ID: envConfig.require("notion-template-daily-id"),
  NOTION_TEMPLATE_WEEKLY_ID: envConfig.require("notion-template-weekly-id"),
};
