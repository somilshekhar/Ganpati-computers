import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async ({ command, mode }) => {
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadedEnv)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"]
        }
      }
    }),
    react()
  ];

  // Include the Nitro preset plugin when compiling for production builds
  if (command === "build") {
    try {
      const nitroMod = await import("nitro/vite");
      if (nitroMod?.nitro) {
        plugins.push(
          nitroMod.nitro({
            preset: "cloudflare-module",
            output: {
              dir: "dist",
              serverDir: "dist/server",
              publicDir: "dist/client",
            },
            cloudflare: {
              nodeCompat: true,
              deployConfig: true,
            }
          })
        );
      }
    } catch (e) {
      console.warn("Skipping Nitro build plugin as it was not found or failed to load.");
    }
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core"
      ]
    },
    server: {
      host: "::",
      port: 8080,
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100
        }
      }
    },
    plugins
  };
});

