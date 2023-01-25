import { BehaviorSubject } from 'rxjs';


export class Store<TState extends Record<string | number | symbol, unknown>> {

  protected readonly state$: BehaviorSubject<TState>;

  constructor() {
  }

  public select() {}

  public update() {}

  public getValue(): TState;
  public getValue(...keys: KeysUnion<TState>)
  public getValue(...keys: KeysUnion<TState>) {}

}

// https://catchts.com/deep-pick

type Primitive = string | number | symbol;

type KeysUnion<T, Accumulation extends Array<Primitive> = []> =
  T extends Primitive ? Accumulation : {
    [P in keyof T]:
    | [...Accumulation, P]
    | KeysUnion<T[P], [...Accumulation, P]>
  }[keyof T]



// import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
//
// import { isArray, isObject, isString } from '@loriini/miscellaneous';
//
// export class Store<
//   TState extends Record<string | number | symbol, unknown>
// > {
//
//   private readonly state$: BehaviorSubject<TState>;
//
//   constructor(state: TState) {
//     this.state$ = new BehaviorSubject<TState>(state);
//   }
//
//   /**
//    * @internal
//    */
//   public select(): Observable<TState>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState
//   >(k1: K1): Observable<TState[K1]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1]
//   >(k1: K1, k2: K2): Observable<TState[K1][K2]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2]
//   >(k1: K1, k2: K2, k3: K3): Observable<TState[K1][K2][K3]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//   >(k1: K1, k2: K2, k3: K3, k4: K4): Observable<TState[K1][K2][K3][K4]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Observable<TState[K1][K2][K3][K4][K5]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): Observable<TState[K1][K2][K3][K4][K5][K6]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7): Observable<TState[K1][K2][K3][K4][K5][K6][K7]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8): Observable<TState[K1][K2][K3][K4][K5][K6][K7][K8]>;
//
//   /**
//    * @internal
//    */
//   public select<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//     K9 extends keyof TState[K1][K2][K3][K4][K5][K6][K7][K8],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8, k9: K9): Observable<TState[K1][K2][K3][K4][K5][K6][K7][K8][K9]>;
//
//   /**
//    * @internal
//    */
//   public select<T>(...args: string[]): Observable<T | TState> {
//     let state$: Observable<T | TState> = this.state$.asObservable();
//
//     if (isArray(args) && args.length === 0 && args.every(isString)) {
//       const argsLength = args.length;
//
//       state$ = state$.pipe(
//         map((state) => {
//           let target: T = state as unknown as T;
//
//           for (let i = 0; i < argsLength; i++) {
//             const p = target?.[args[i]];
//             if (typeof p !== 'undefined') {
//               target = p;
//             } else {
//               return undefined;
//             }
//           }
//
//           return target;
//         })
//       );
//     }
//
//     return state$.pipe(
//       distinctUntilChanged()
//     );
//   }
//
//   /**
//    * @internal
//    */
//   public set<
//     Value extends TState,
//   >(value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     Value extends TState[K1]
//   >(k1: K1, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     Value extends TState[K1][K2]
//   >(k1: K1, k2: K2, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     Value extends TState[K1][K2][K3]
//   >(k1: K1, k2: K2, k3: K3, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     Value extends TState[K1][K2][K3][K4]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     Value extends TState[K1][K2][K3][K4][K5]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     Value extends TState[K1][K2][K3][K4][K5][K6]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     Value extends TState[K1][K2][K3][K4][K5][K6][K7]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//     Value extends TState[K1][K2][K3][K4][K5][K6][K7][K8]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8, value: Value): void;
//
//   /**
//    * @internal
//    */
//   public set<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//     K9 extends keyof TState[K1][K2][K3][K4][K5][K6][K7][K8],
//     Value extends TState[K1][K2][K3][K4][K5][K6][K7][K8][K9]
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8, k9: K9, value: Value): void;
//
//   public set(...args: string[] | unknown[]): void {
//     const value = args.pop();
//     const argsLength = args.length;
//
//     if (argsLength === 1 && isObject(args[0])) {
//       this.update(() => value as TState);
//     } else if (argsLength >= 2) {
//       const obj: any = {};
//
//       let target = obj;
//       for (let i = 0; i < argsLength; i++) {
//         const key = args[i] as any;
//
//         if (target[key] === undefined || isObject(target[key])) {
//           target[key] = {};
//         }
//
//         target = target[key];
//       }
//
//       this.update((state) => ({ ...state, ...obj }));
//     }
//   }
//
//   /**
//    * @internal
//    */
//   public get(): TState;
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState
//   >(k1: K1): TState[K1];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1]
//   >(k1: K1, k2: K2): TState[K1][K2];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2]
//   >(k1: K1, k2: K2, k3: K3): TState[K1][K2][K3];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//   >(k1: K1, k2: K2, k3: K3, k4: K4): TState[K1][K2][K3][K4];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): TState[K1][K2][K3][K4][K5];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): TState[K1][K2][K3][K4][K5][K6];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7): TState[K1][K2][K3][K4][K5][K6][K7];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8): TState[K1][K2][K3][K4][K5][K6][K7][K8];
//
//   /**
//    * @internal
//    */
//   public get<
//     K1 extends keyof TState,
//     K2 extends keyof TState[K1],
//     K3 extends keyof TState[K1][K2],
//     K4 extends keyof TState[K1][K2][K3],
//     K5 extends keyof TState[K1][K2][K3][K4],
//     K6 extends keyof TState[K1][K2][K3][K4][K5],
//     K7 extends keyof TState[K1][K2][K3][K4][K5][K6],
//     K8 extends keyof TState[K1][K2][K3][K4][K5][K6][K7],
//     K9 extends keyof TState[K1][K2][K3][K4][K5][K6][K7][K8],
//   >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8, k9: K9): TState[K1][K2][K3][K4][K5][K6][K7][K8][K9];
//
//   public get<T>(...args: string[]): T | TState {
//     const argsLength = args.length
//     const state = this.state$.getValue();
//
//     let target: T = state as unknown as T;
//
//     for (let i = 0; i < argsLength; i++) {
//       const p = target?.[args[i]];
//       if (typeof p !== 'undefined') {
//         target = p;
//       } else {
//         return undefined;
//       }
//     }
//
//     return target;
//   }
//
//   public update(...reducers: ((state: TState) => TState)[]) {
//     const currentState = this.state$.getValue();
//
//     const nextState = reducers.reduce((value, reducer) => {
//       value = reducer(value);
//
//       return value;
//     }, currentState);
//
//     this.state$.next(nextState);
//   }
//
// }
