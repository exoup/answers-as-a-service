import yesRes from "@/pools/yes.json";
import noRes from "@/pools/no.json";
import maybeRes from "@/pools/maybe.json";

import { InferInput } from 'valibot';
import { answerSchema } from "@/index";

type getFlatResponse = InferInput<typeof answerSchema>;
type PoolFlag = boolean | undefined;

const coerceInput = (i: getFlatResponse[keyof getFlatResponse]): PoolFlag => {
    if (i === 'true' || i === '') return true;
    if (i === 'false') return false;
    return undefined;
};

export const getFlatResponse = ({ yes, no, maybe }: getFlatResponse) => {
    const poolsWithAnswers = [
        { name: 'yes', enabled: coerceInput(yes), answers: yesRes },
        { name: 'no', enabled: coerceInput(no), answers: noRes },
        { name: 'maybe', enabled: coerceInput(maybe), answers: maybeRes },
    ];
    const hasIncludedPools = poolsWithAnswers.some(({ enabled }) => enabled === true);
    const pools = poolsWithAnswers
        .filter(({ enabled }) => hasIncludedPools ? enabled === true : enabled !== false)
        .map(({ name, answers }) => ({ name, answers }));

    if (!pools.length) {
        return { pool: '??', answer: 'why' };
    }

    const randomPool = pools[Math.floor(Math.random() * pools.length)];
    const randomAnswer = randomPool.answers[Math.floor(Math.random() * randomPool.answers.length)];

    return { pool: randomPool.name, answer: randomAnswer };
};
