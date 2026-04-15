import { describe, expect, it } from "bun:test";
import { getFlatResponse } from "@/lib";

describe("getFlatResponse", () => {
    it("uses every pool when no params are provided", () => {
        expect(getFlatResponse({}).pool).toBeOneOf(["yes", "no", "maybe"]);
    });

    it("uses multiple explicit trues together", () => {
        expect(getFlatResponse({ yes: "true", maybe: "true" }).pool).toBeOneOf(["yes", "maybe"]);
    });

    it("treats a present flag as an explicit include", () => {
        expect(getFlatResponse({ yes: "" }).pool).toBe("yes");
    });

    it("uses multiple explicit includes together", () => {
        expect(getFlatResponse({ yes: "", no: "" }).pool).toBeOneOf(["yes", "no"]);
    });

    it("excludes a pool when it is set to false", () => {
        expect(getFlatResponse({ yes: "false" }).pool).not.toBe(["yes"])
    });

    it("keeps explicit includes narrower than exclusions", () => {
        expect(getFlatResponse({ yes: "", no: "false" }).pool).toBe("yes");
    });
});
