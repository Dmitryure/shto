import { useCallback, useMemo, useState } from "react";
import { useBox } from "use-cannon";

export const Block = (props) => {
  const { size, color } = props;
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
        console.log(isHovered, color, "hovered");
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        console.log(isHovered, color, "unhovered");
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
