import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import missing from "@/pools/missing.json";

/**
 * Error handler
 */
export const handleError = (err: Error, c: Context) => {
    if (err instanceof HTTPException) {
        return c.json({
            status: err.cause,
            message: err.message
        }, err.status);
    };
    return c.json({
        status: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
    }, 500);
};

/**
 * Missing handler
 */
export const handleMissing = (c: Context) => {
    return c.json({
        status: "NOT_FOUND",
        message: missing[Math.floor(Math.random() * missing.length)] || "NOT_FOUND"
    }, 404);
};
