import React from "react";
import { useCompoundBody } from "@react-three/cannon";
import { baseSizeUnit } from "../utils";

// const c1pos = [baseSizeUnit, 0, 0];
// const c2pos = [baseSizeUnit, baseSizeUnit, 0];
// const c3pos = [baseSizeUnit, baseSizeUnit * -1, 0];

const c1pos = [baseSizeUnit, baseSizeUnit, 0];
const c2pos = [baseSizeUnit, 0, 0];
const c3pos = [0, baseSizeUnit, 0];

export const Lcube = (props) => {
  const { size, color } = props;
  const [ref] = useCompoundBody(() => ({
    mass: 20,
    position: [0, 4, 0],
    shapes: [
      { type: "Box", position: [0, 0, 0], rotation: [0, 0, 0], args: size },
      {
        type: "Box",
        position: c1pos,
        rotation: [0, 0, 0],
        args: size,
      },
      {
        type: "Box",
        position: c2pos,
        rotation: [0, 0, 0],
        args: size,
      },
      {
        type: "Box",
        position: c3pos,
        rotation: [0, 0, 0],
        args: size,
      },
    ],
  }));

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxBufferGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={c1pos} castShadow>
        <boxBufferGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={c2pos} castShadow>
        <boxBufferGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={c3pos} castShadow>
        <boxBufferGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
