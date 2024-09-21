import Image from "next/image";
import Graph from "./components/Graph";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
  return (
    <ReactFlowProvider>
      <Graph />
    </ReactFlowProvider>
  );
}
