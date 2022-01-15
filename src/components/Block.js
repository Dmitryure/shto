import React, { useCallback, useMemo, useState } from "react";
import { useBox } from "@react-three/cannon";

export const Block = (props) => {
  const { size, color, type } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    mass: 20,
    args: size,
    position: [0, 4, 0],
  }));


  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      castShadow
    >
      <boxBufferGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "dodgerblue" : color} />
    </mesh>
  );
};
