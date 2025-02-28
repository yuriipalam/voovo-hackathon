import type { MetaFunction } from "@remix-run/node";
import { Home } from "@/modules";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};

export default function HomePage() {
  return <Home />;
}
