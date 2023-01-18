
export class ResultSet<T> {

  public declare data: T[];

  public declare count: number;

  constructor(args: {
    data: T[]
    count: number;
  }) {
    Object.assign(this, args);

    this.data ??= [];
    this.count ??= this.data.length;
  }

}
