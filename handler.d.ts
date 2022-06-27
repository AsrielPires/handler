export interface Arg<T = any> {
  v: T;
  p?: boolean;
}
export interface Options<DT = any> {
  delay?: number;
  once?: boolean;
  passive?: boolean;
  check?: (data: DT) => boolean;
}
export declare type EventTargetCallback<T = any, DT = any> = ((this: T, e: DT) => any) & Options<DT>;
export interface EventObject<T extends object = any> {
  eh: {
    [P in keyof T]?: EventTargetCallback<this, T[P]>[];
  };
  slip?: boolean;
}
export declare function on<E extends EventObject>(e: E, event: string, callback: EventTargetCallback<E>, options?: Options): E;
export declare function off<E extends EventObject>(e: E, event: string, callback?: EventTargetCallback<E>): E;
export declare function emit<E extends EventObject>(e: E, event: string, data?: any): void;
