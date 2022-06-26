type Primitive = number | string | boolean | Date | undefined | null;
type Arr = Array<Primitive>;
type Obj = Record<string, Primitive | Arr | unknown>;

export type Properties = Obj & {
  resourceName: string;
};

export abstract class Resource<R, P extends Properties> {
  protected abstract resource: R;

  constructor(protected readonly properties: P) {}

  get created() {
    return this.resource;
  }
}
