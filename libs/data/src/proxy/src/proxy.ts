import { Observable } from 'rxjs';

import { Operation } from './operation';
import { ResultSet } from './result-set';

export abstract class Proxy {

  public abstract execute<T>(operation: Operation): Observable<ResultSet<T>>;

}
