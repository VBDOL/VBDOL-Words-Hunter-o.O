import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export const vitePort = 3000;

export default defineConfig(({ mode }) => {
  return {
    base: "/VBDOL-Words-Hunter-o.O/",
    plugins: [
      react(),
      {
        name: "handle-source-map-requests",
        apply: "serve",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.endsWith(".map")) {
              req.url = req.url.split("?")[0];
            }
            next();
          });
        },
      },
      {
        name: "add-cors-headers",
        apply: "serve",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, POST, PUT, DELETE, PATCH, OPTIONS"
            );
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Content-Type, Authorization, X-Requested-With"
            );

            if (req.method === "OPTIONS") {
              res.statusCode = 204;
              return res.end();
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client/src"),
      },
    },
    root: path.join(process.cwd(), "client"),
    build: {
      outDir: path.join(process.cwd(), "dist"),
      emptyOutDir: true,
    },
    clearScreen: false,
    server: {
      hmr: {
        overlay: false,
      },
      host: true,
      port: vitePort,
      allowedHosts: true,
      cors: true,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    esbuild: {
      sourcemap: true,
    },
  };
});
