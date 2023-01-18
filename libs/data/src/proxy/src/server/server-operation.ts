import { Operation } from '../operation';

export interface ServerOperation extends Operation {
  extraParams?: { [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  extraHeaders?: { [key: string]: string | string[]; };
}
