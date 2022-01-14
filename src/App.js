import { Debug, Physics } from "@react-three/cannon";
import { throttle } from "lodash";
import React, { useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Block } from "./components/Block";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PlaneWithBorders from "./components/Plane";

import { J } from "./components/J";
import { baseSizeUnit, colors, spawnPosition } from "./utils";

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
    color: colors[getRandomInt(1, colors.length)],
  };
  const j = {
    type: "j",
    size: [baseSizeUnit, baseSizeUnit, baseSizeUnit],
    position: spawnPosition,
    active: false,
    color: colors[getRandomInt(1, colors.length)],
  };
  const arr = [cube, j];
  return arr[getRandomInt(0, arr.length)];
};

function App() {
  const [blocks, setBlocks] = useState([]);

  const addBlock = useCallback(
    throttle(() => {
      setBlocks((state) => {
        return [...state, generateBlock()];
      });
    }, 800),
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
          console.log(el.type, el);
          if (el.type === "cube") {
            return <Block key={i} {...el} />;
          } else if (el.type === "j") {
            return <J key={i} {...el} />;
          }
        })}
        {/* </Debug> */}
      </Physics>
    </>
  );
}

export default App;
