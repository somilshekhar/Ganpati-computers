import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Product } from "../../routes/products";

// Helper to auto-detect Upstash/Vercel KV REST URL and Token from process.env
function getKvConfig() {
  // 1. Check common direct keys
  const directUrl = process.env.KV_REST_API_URL || 
                    process.env.UPSTASH_REDIS_REST_URL || 
                    process.env.STORAGE_REST_API_URL ||
                    process.env.STORAGE_URL;
                    
  const directToken = process.env.KV_REST_API_TOKEN || 
                      process.env.UPSTASH_REDIS_REST_TOKEN || 
                      process.env.STORAGE_REST_API_TOKEN ||
                      process.env.STORAGE_TOKEN;
                      
  if (directUrl && directToken) {
    return { url: directUrl, token: directToken };
  }

  // 2. Scan all environment variables for matching suffix patterns
  let url: string | undefined;
  let token: string | undefined;

  for (const key of Object.keys(process.env)) {
    const val = process.env[key];
    if (typeof val === "string" && val.startsWith("https://")) {
      if (key.endsWith("_URL") || key.endsWith("_REST_API_URL")) {
        url = val;
        const prefix = key.replace(/_URL$/, "").replace(/_REST_API_URL$/, "");
        token = process.env[`${prefix}_TOKEN`] || process.env[`${prefix}_REST_API_TOKEN`];
        if (token) {
          break;
        }
      }
    }
  }

  if (url && token) {
    return { url, token };
  }

  return null;
}

export const getDbProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    const config = getKvConfig();

    if (!config) {
      return { status: "no-kv" as const };
    }

    try {
      const response = await fetch(config.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "ganpati_products"]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vercel KV returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.result) {
        try {
          const products = JSON.parse(data.result) as Product[];
          return { status: "success" as const, products };
        } catch (parseError) {
          throw new Error("Failed to parse products from Vercel KV JSON storage.");
        }
      }

      return { status: "success" as const, products: null };
    } catch (err: any) {
      console.error("getDbProducts error:", err);
      return { status: "error" as const, message: err.message || "Failed to fetch from remote database" };
    }
  });

export const saveDbProducts = createServerFn({ method: "POST" })
  .inputValidator(z.array(z.any()))
  .handler(async ({ data: products }) => {
    const config = getKvConfig();

    if (!config) {
      return { status: "no-kv" as const };
    }

    try {
      const response = await fetch(config.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "ganpati_products", JSON.stringify(products)]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vercel KV returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return { status: "success" as const };
    } catch (err: any) {
      console.error("saveDbProducts error:", err);
      return { status: "error" as const, message: err.message || "Failed to save to remote database" };
    }
  });
