"use client";
import React, { useEffect, useState } from "react";
import {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { GridLayout } from "@antv/layout";
import { Graph } from "@antv/graphlib";

function GraphExample() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "node-center",
      position: {
        x: 400,
        y: -50,
      },
      data: {
        label: "node-center",
      },
    },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { fitView } = useReactFlow();
  useEffect(() => {
    const gridLayout = new GridLayout({
      width: 800,
      height: 500,
      sortBy: "label",
      rows: 7,
      cols: 5,
      // nodeSize: [200, 50],
    });

    const data = {
      nodes: [
        { id: "0", data: {} },
        { id: "1", data: {} },
        { id: "2", data: {} },
        { id: "3", data: {} },
        { id: "4", data: {} },
        { id: "5", data: {} },
        { id: "6", data: {} },
        { id: "7", data: {} },
      ],
      edges: [],
    };

    const graph = new Graph({
      nodes: data.nodes,
      edges: data.edges,
    });

    gridLayout.execute(graph).then((res) => {
      setNodes((preNodes) => [
        ...preNodes,
        ...res.nodes.map((node) => ({
          id: node.id.toString(),
          position: node.data,
          data: {
            label: `node-${node.id}`,
          },
        })),
      ]);
      setEdges([
        { id: "e0", source: "node-center", target: "1", data: {} },
        { id: "e1", source: "node-center", target: "2", data: {} },
        { id: "e2", source: "node-center", target: "3", data: {} },
        { id: "e3", source: "node-center", target: "4", data: {} },
        { id: "e4", source: "node-center", target: "6", data: {} },
        { id: "e5", source: "node-center", target: "7", data: {} },
        { id: "e6", source: "node-center", target: "5", data: {} },
        { id: "e7", source: "node-center", target: "0", data: {} },
      ]);
    });
  }, [fitView]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges]);

  return (
    <div className="fixed w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} fitView maxZoom={10} minZoom={0.1}>
        <Background />
        <Controls position="bottom-right" orientation={"horizontal"} />
      </ReactFlow>
    </div>
  );
}

export default GraphExample;
