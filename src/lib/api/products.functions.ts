import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Product } from "../../routes/products";

export const getDbProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      return { status: "no-kv" as const };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      return { status: "no-kv" as const };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
