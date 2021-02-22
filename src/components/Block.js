import { useBox } from "use-cannon";
import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

export const Block = (props) => {
  const { size, active } = props;
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={size}/>
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};
