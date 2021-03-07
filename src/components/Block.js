import { useState } from "react";
import { useBox } from "use-cannon";
import { useSpring, animated } from "react-spring/three";

export const Block = (props) => {
  const { size, color, id, setActive, active } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { springedSize } = useSpring({
    springedSize: active ? size.map((el) => el * 5) : size,
  });
  console.log(springedSize);
  const [ref] = useBox(() => ({
    mass: 20,
    args: springedSize,
    position: [0, 5, 0],
  }));

  return (
    <animated.mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={() => {
        setActive(id);
      }}
      ref={ref}
      castShadow
    >
      <animated.boxBufferGeometry args={springedSize} />
      <meshStandardMaterial color={isHovered ? "dodgerblue" : color} />
    </animated.mesh>
  );
};
