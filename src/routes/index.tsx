import { createFileRoute } from "@tanstack/react-router";
import { SignalEarth } from "@/components/signal/App";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SignalEarth />;
}
