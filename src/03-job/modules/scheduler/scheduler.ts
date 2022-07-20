import { Job, JobArgs } from "@pulumi/gcp/cloudscheduler";

import { Properties, Resource } from "../../../shared";

type Props = Properties & Pick<JobArgs, "description" | "schedule" | "timeZone" | "httpTarget">;

export class Scheduler extends Resource<Job, Props> {
  protected resource: Job;

  constructor(props: Props) {
    super(props);

    this.resource = new Job(props.resourceName, {
      description: props.description,
      schedule: props.schedule,
      timeZone: props.timeZone ?? "Asia/Tokyo",
      httpTarget: props.httpTarget,
    });
  }
}
