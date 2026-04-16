import { describe, expect, it } from "bun:test";
import yesPool from "@/pools/yes.json";
import noPool from "@/pools/no.json";
import maybePool from "@/pools/maybe.json";
import missingPool from "@/pools/missing.json";

describe("pool responses", () => {
    const normalize = (strings: string[]) => strings.map((str) => str.trim().toLowerCase());

    it("Should have responses.", () => {
        expect(yesPool.length).toBeGreaterThan(0);
        expect(noPool.length).toBeGreaterThan(0);
        expect(maybePool.length).toBeGreaterThan(0);
        expect(missingPool.length).toBeGreaterThan(0);
    });

    const pools = { yesPool, noPool, maybePool, missingPool };
    for (const [name, pool] of Object.entries(pools)) {
        it(`${name} pool should not contain duplicates in itself minified.`, () => {
            const normalPool = normalize(pool);

            expect(normalPool).toHaveLength(new Set(normalPool).size);
        });
    }
});
