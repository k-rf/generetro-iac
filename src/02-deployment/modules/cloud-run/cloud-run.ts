import { Service } from "@pulumi/gcp/cloudrun";
import { cloudrun } from "@pulumi/gcp/types/input";

import { Properties, Resource } from "../../../shared";
import { GCP_CONFIG } from "../../../variables/config/gcp";

type Props = Properties & Pick<cloudrun.ServiceTemplateSpecContainer, "envs" | "image">;

export class CloudRun extends Resource<Service, Props> {
  protected resource: Service;

  constructor(props: Props) {
    super(props);

    this.resource = new Service(props.resourceName, {
      ...props,
      name: props.resourceName,
      location: GCP_CONFIG.REGION,
      project: GCP_CONFIG.PROJECT,
      metadata: {
        annotations: {
          "run.googleapis.com/ingress": "all",
          "run.googleapis.com/ingress-status": "all",
        },
      },
      template: {
        spec: {
          containers: [
            {
              image: props.image,
              ports: [{ containerPort: 3000 }],
              envs: props.envs,
            },
          ],
        },
      },
    });
  }
}
