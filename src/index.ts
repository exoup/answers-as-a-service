import { Hono } from 'hono';
import { accepts } from 'hono/accepts'
import { HTTPException } from 'hono/http-exception';
import { handleError, handleMissing } from '@/error';
import * as v from 'valibot';
import { sValidator } from '@hono/standard-validator';

import { getFlatResponse } from '@/lib';
import { human, robots } from './lib/const';

const app = new Hono();

export const answerSchema = v.partial(v.object({
    yes: v.optional(v.picklist(['true', 'false', ''], "Invalid value for 'yes'. Expected one of 'true', 'false', ''")),
    no: v.picklist(['true', 'false', ''], "Invalid value for 'no'. Expected one of 'true', 'false', ''"),
    maybe: v.picklist(['true', 'false', ''], "Invalid value for 'maybe'. Expected one of 'true', 'false', ''")
}));

app.on(
    'GET',
    ['/', '/me'],
    sValidator('query', answerSchema, (result) => {
        if (!result.success) throw new HTTPException(400, {
            cause: "BAD_REQUEST",
            message: result.error.flatMap((error) => error.message).join(', ')
        });
    }),
    (c) => {
        const response = getFlatResponse(c.req.valid('query'));
        const type = accepts(c, {
            header: 'Accept',
            supports: ['text/html', 'application/json', 'text/plain', '*/*'],
            default: 'application/json',
        });
        const responseType = c.req.path === '/me' && type === 'text/html'
            ? 'application/json'
            : type;

        switch (responseType) {
            case 'application/json':
            case '*/*':
                return c.json(response);
            case 'text/plain':
                return c.text(response.answer);
            case 'text/html':
            default:
                return c.env.ASSETS.fetch(new URL('/index.html', c.req.url));
        };
    }
);

app.on('GET', ['/doc', '/docs'], (c) => c.redirect('https://github.com/exoup/answers-as-a-service#%EF%B8%8F-usage', 301));
app.get('/robots.txt', (c) => c.text(robots));
app.get('/humans.txt', (c) => c.text(human));

app.onError(handleError);
app.notFound(handleMissing);

export default app;
