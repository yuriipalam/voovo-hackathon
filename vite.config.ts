import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          // landing
          route("/", "routes/landing/_layout.tsx", () => {
            route("", "routes/landing/home.tsx", { index: true });
            route("sign-in", "routes/landing/sign-in.tsx");
            route("sign-up", "routes/landing/sign-up.tsx");
          });

          // client-app
          route("/", "routes/client-app/_layout.tsx", () => {
            route("/chat", "routes/client-app/chat/_layout.tsx", () => {
              route("", "routes/client-app/chat/new-chat.tsx", { index: true });
              route(
                ":conversationId",
                "routes/client-app/chat/chat-conversation.tsx"
              );
            });
          });

          // api
          route("/api/chat", "routes/api/chat/index.ts");
          route("/api/conversation", "routes/api/conversation/create.ts");
          route(
            "/api/conversation/:conversationId",
            "routes/api/conversation/delete.ts"
          );
          route("/api/context", "routes/api/context.ts");

          // resources
          route("/auth/confirm", "routes/resources/auth/confirm.tsx");
          route("/auth/callback", "routes/resources/auth/callback.tsx");
        });
      }
    }),
    tsconfigPaths()
  ]
});
