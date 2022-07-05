import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";

import { Properties, Resource } from "../../../shared";
import { CONFIG } from "../../../variables";

type Props = Properties & Pick<RepositoryArgs, "description" | "labels">;

export class ArtifactRegistry extends Resource<Repository, Props> {
  protected resource: Repository;

  constructor(props: Props) {
    super(props);

    this.resource = new Repository(props.resourceName, {
      ...props,
      location: CONFIG.GCP.REGION,
      project: CONFIG.GCP.PROJECT,
      format: "Docker",
      repositoryId: props.resourceName,
    });
  }
}
