import { BehaviorSubject, distinctUntilChanged, map, Observable, ObservableInput, Subscription, takeUntil, tap } from 'rxjs';

import { isFunction } from '@loriini/miscellaneous';

import { pluck, pluckSync } from './pluck';
import { isArrayOfString } from './is-array-of-string';

const noop = <T>(ob: Observable<T>) => ob;

export class Store<TState extends Record<string | number | symbol, unknown>> {

  protected readonly state: BehaviorSubject<TState>;

  protected readonly state$: Observable<TState>;

  protected constructor(initialState: TState) {
    this.state = new BehaviorSubject<TState>(initialState);
    this.state$ = this.state.asObservable();
  }

  /**
   * Return all state
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue() => {
   *   user: {
   *     name: string
   *   }
   * };
   */
  public getValue(): TState;

  /**
   * Return state by selector
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue((state) => state.user) => { name: string };
   */
  public getValue<T>(selector: (state: TState) => T): T;

  /**
   * Return state by paths
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue(['user']) => { name: string };
   * this.store.getValue(['user', 'name']) => string;
   */
  public getValue<
    K1 extends keyof TState,
  >(path: [K1]): TState[K1];
  public getValue<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
  >(path: [K1, K2]): TState[K1][K2];
  public getValue<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
  >(path: [K1, K2, K3]): TState[K1][K2][K3];
  public getValue<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
    K4 extends keyof TState[K1][K2][K3],
  >(path: [K1, K2, K3, K4]): TState[K1][K2][K3][K4];
  public getValue<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
    K4 extends keyof TState[K1][K2][K3],
    K5 extends keyof TState[K1][K2][K3][K4],
  >(path: [K1, K2, K3, K4, K5]): TState[K1][K2][K3][K4][K5];

  /**
   * @internal
   * */
  public getValue<T>(arg?: unknown): TState | T {
    const state = this.state.getValue();

    if (!arg) {
      return state;
    }

    if (isFunction(arg)) {
      return arg.call(null, state);
    }

    if (isArrayOfString(arg)) {
      return pluckSync(state, arg);
    }

    throw new Error('Error passing arguments.');
  }

  /**
   * Return observable state
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue() => Observable<{
   *   user: {
   *     name: string
   *   }
   * }>;
   */
  public select(): Observable<TState>;

  /**
   * Return observable state by selector
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue((state) => state.user) => Observable<{ name: string }>;
   */
  public select<T>(selector: (state: TState) => T): Observable<T>;

  /**
   * Return observable state by paths
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.getValue(['user']) => Observable<{ name: string }>;
   * this.store.getValue(['user', 'name']) => Observable<string>;
   */
  public select<
    K1 extends keyof TState,
  >(path: [K1]): Observable<TState[K1]>;
  public select<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
  >(path: [K1, K2]): Observable<TState[K1][K2]>;
  public select<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
  >(path: [K1, K2, K3]): Observable<TState[K1][K2][K3]>;
  public select<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
    K4 extends keyof TState[K1][K2][K3],
  >(path: [K1, K2, K3, K4]): Observable<TState[K1][K2][K3][K4]>;
  public select<
    K1 extends keyof TState,
    K2 extends keyof TState[K1],
    K3 extends keyof TState[K1][K2],
    K4 extends keyof TState[K1][K2][K3],
    K5 extends keyof TState[K1][K2][K3][K4],
  >(path: [K1, K2, K3, K4, K5]): Observable<TState[K1][K2][K3][K4][K5]>;

  /**
   * @internal
   * */
  public select<T>(arg?: unknown): Observable<TState | T> {

    if (!arg) {
      return this.state$;
    }

    if (isFunction(arg)) {
      return this.state$
        .pipe(
          map((state) => arg.call(null, state)),
          distinctUntilChanged()
        );
    }

    if (isArrayOfString(arg)) {
      return this.state$
        .pipe(
          pluck(arg),
          distinctUntilChanged()
        ) as Observable<T>;
    }

    throw new Error('Error passing arguments.');
  }

  /**
   * Update state
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.update((state) => ({ ...state, user: { name: 'next' } }));
   *
   * */
  public update(...reducers: ((state: TState) => TState)[]): void {
    const state = (reducers ?? []).reduce((acc, reducer) => reducer.call(null, acc), this.state.getValue());
    // TODO: Batch
    this.state.next(state);
  }

  /**
   * Connect to observable
   *
   * stream$ = Observable<{
   *   user: {
   *     name: string
   *   }
   * }>
   *
   * state = {
   *   user: {
   *     name: string
   *   }
   * }
   *
   * this.store.connect(stream$, (state, value) => ({ ...state, user: value }));
   * this.store.connect(stream$, (state, value) => ({ ...state, user: value }), destroy$);
   *
   * */
  public connect<T, U>(observable$: Observable<T>, fn: (state: TState, value: T) => TState, takeUntilNotifier?: ObservableInput<U>): Subscription {
    return observable$.pipe(
      takeUntilNotifier ? takeUntil(takeUntilNotifier) : noop,
      tap((value) => this.update((state) => fn.call(null, state, value))),
    ).subscribe()
  }

}

