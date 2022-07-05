import { Trigger, TriggerArgs } from "@pulumi/gcp/cloudbuild";

import { Properties, Resource } from "../../../shared";
import { CONFIG } from "../../../variables";

type Props = Properties & Pick<TriggerArgs, "description" | "tags" | "build">;

export class CloudBuildTrigger extends Resource<Trigger, Props> {
  protected resource: Trigger;

  constructor(props: Props) {
    super(props);

    this.resource = new Trigger(props.resourceName, {
      ...props,
      name: props.resourceName,
      github: {
        name: CONFIG.GITHUB.REPOSITORY,
        owner: CONFIG.GITHUB.OWNER,
        push: {
          branch: "^main$",
        },
      },
      build: props.build,
    });
  }
}

export { Props as CloudBuildTriggerProps };
