import type { MaybePromise } from '@/types/MaybePromise.ts';

export type MaybeFunction<T> = T | (() => MaybePromise<T>);
