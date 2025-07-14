import { type TRPCLink, createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';

import type { AppRouter } from '@/../../server/src/trpc/router';
import { API_CONFIG } from '@/config/api.ts';
import { useAppOptionsStore } from '@/stores/options.ts';
import { useSnackbarStore } from '@/stores/snackbar.ts';

const responseHeaderLink: TRPCLink<AppRouter> = () => {
  return ({ op, next }) => {
    return observable(observer => {
      next(op).subscribe({
        next(result) {
          /* eslint-disable @typescript-eslint/no-explicit-any */
          const headers = (result as any).context?.responseHeaders as
            | Record<string, string>
            | undefined;

          const appOptionsStore = useAppOptionsStore();
          const snackbarStore = useSnackbarStore();

          if (
            headers &&
            appOptionsStore.appOptions.giveCacheFeedback &&
            headers['x-cache-status']
          ) {
            const status = headers['x-cache-status'];
            const ttl = headers['x-cache-ttl'] ? Number(headers['x-cache-ttl']) : undefined;

            if (status === 'HIT') {
              snackbarStore.snackbarError = false;
              snackbarStore.snackbarText =
                'Önbellekte bulunan veriler getirildi' +
                (ttl ? `, güncel verileri görmek için ${ttl} saniye sonra yenileyin.` : '.');
              snackbarStore.snackbar = true;
            }
          }

          observer.next(result);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
    });
  };
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    responseHeaderLink,
    httpBatchLink({
      url: API_CONFIG.baseURL,
      async fetch(input, init) {
        const res = await fetch(input, {
          ...init,
          credentials: 'include',
        });

        /* eslint-disable @typescript-eslint/no-explicit-any */
        (res as any).responseHeaders = Object.fromEntries(res.headers.entries());

        return res;
      },
    }),
  ],
});

export const cleanPayload = <T extends Record<string, unknown>>(payload: T) => {
  return Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== ''));
};
