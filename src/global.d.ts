import { } from 'hono';

declare module 'hono' {
    interface Env {
        Bindings: {
            ASSETS: Fetcher
        }
    }
};
