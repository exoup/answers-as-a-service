import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { handleError, handleMissing } from '@/error';
import { getFlatResponse } from '@/lib';
import * as v from 'valibot';
import { sValidator } from '@hono/standard-validator';

const app = new Hono();

export const answerSchema = v.partial(v.object({
    yes: v.optional(v.picklist(['true', 'false', ''], "Invalid value for 'yes'. Expected one of 'true', 'false', ''")),
    no: v.picklist(['true', 'false', ''], "Invalid value for 'no'. Expected one of 'true', 'false', ''"),
    maybe: v.picklist(['true', 'false', ''], "Invalid value for 'maybe'. Expected one of 'true', 'false', ''")
}));

app.get('/', sValidator('query', answerSchema, (result, c) => {
    if (!result.success) throw new HTTPException(400, {
        cause: "BAD_REQUEST",
        message: result.error.flatMap((error) => error.message).join(', ')
    });

    return c.json(
        getFlatResponse(result.data)
    );
}));

app.on('GET', ['/doc', '/docs'], (c) => {
    return c.redirect('https://github.com/exoup/answers-as-a-service#%EF%B8%8F-usage', 301);
});

app.onError(handleError);
app.notFound(handleMissing);

export default app;
