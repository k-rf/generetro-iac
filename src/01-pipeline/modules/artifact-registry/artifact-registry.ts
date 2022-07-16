import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";

import { Properties, Resource } from "../../../shared";
import { GCP_CONFIG } from "../../../variables/config/gcp";

type Props = Properties & Pick<RepositoryArgs, "description" | "labels">;

export class ArtifactRegistry extends Resource<Repository, Props> {
  protected resource: Repository;

  constructor(props: Props) {
    super(props);

    this.resource = new Repository(props.resourceName, {
      ...props,
      location: GCP_CONFIG.REGION,
      project: GCP_CONFIG.PROJECT,
      format: "Docker",
      repositoryId: props.resourceName,
    });
  }
}
