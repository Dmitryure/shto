import { Debug, Physics } from "@react-three/cannon";
import { throttle } from "lodash";
import React, { useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Block } from "./components/Block";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PlaneWithBorders from "./components/Plane";

import { Zigzag } from "./components/Zigzag";
import { baseSizeUnit, colors, spawnPosition } from "./utils";
import { Long } from "./components/Long";
import { Hook } from "./components/Hook";
import { Lcube } from "./components/Lcube";
import { T } from "./components/T";

function getRandomInt(min = 0, max) {
  if (!max) {
    throw Error("getRandomInt requires max argument to be an integer");
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const generateBlock = () => {
  const cube = {
    type: "cube",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#4974a5",
  };
  const zigzag = {
    type: "zigzag",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#16acea",
  };
  const long = {
    type: "long",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#e8d71e",
  };
  const hook = {
    type: "hook",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#d71b3b",
  };
  const lcube = {
    type: "lcube",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#1EE8D7",
  };
  const t = {
    type: "t",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: "#4203c9",
  };
  const arr = [cube, zigzag, long, hook, lcube, t];
  return () => arr[getRandomInt(0, arr.length)];
};

function App() {
  const [blocks, setBlocks] = useState([]);

  const addBlock = useCallback(
    throttle(() => {
      setBlocks((state) => {
        return [...state, generateBlock()()];
      });
    }, 1800),
    []
  );

  useFrame(() => {
    if (blocks.length < 10) {
      addBlock();
    }
  });

  return (
    <>
      <directionalLight
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        castShadow
        position={[15, 15, 30]}
      />
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 5, 12]} />
      <Physics gravity={[0, -2, 0]}>
        {/* <Debug color="black" scale={1.1}> */}
        <PlaneWithBorders color={colors[0]} />
        {[
          ...blocks.slice(0, blocks.length - 1),
          { ...blocks[blocks.length - 1], active: true },
        ].map((el, i) => {
          if (el.type === "cube") {
            return <Block key={i} {...el} />;
          } else if (el.type === "zigzag") {
            return <Zigzag key={i} {...el} />;
          } else if (el.type === "long") {
            return <Long key={i} {...el} />;
          } else if (el.type === "hook") {
            return <Hook key={i} {...el} />;
          } else if (el.type === "lcube") {
            return <Lcube key={i} {...el} />;
          } else if (el.type === "t") {
            return <T key={i} {...el} />;
          }
        })}
        {/* </Debug> */}
      </Physics>
    </>
  );
}

export default App;
