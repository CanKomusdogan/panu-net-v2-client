import { defineStore } from 'pinia';

function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
}

export const useAsyncGateStore = defineStore('asyncGate', () => {
  let deferred = createDeferred<void>();

  function markReady() {
    deferred.resolve();
  }

  function reset() {
    deferred = createDeferred<void>();
  }

  return {
    get promise() {
      return deferred.promise;
    },
    markReady,
    reset,
  };
});
