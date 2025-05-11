export type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;
