import type { MaybePromise } from '@/types/maybe-promise.ts';

export type MaybeFunction<T> = T | (() => MaybePromise<T>);
