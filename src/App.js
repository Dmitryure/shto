import { Physics } from "use-cannon";
import { throttle } from "lodash";
import { useCallback, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Block } from "./components/Block";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Plane from "./components/Plane";
import palletes from "nice-color-palettes";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App(props) {
  // This reference will give us direct access to the mesh

  const [boxes, setBoxes] = useState([]);
  const colors = palletes[13];

  const addBlock = useCallback(
    throttle(() => {
      setBoxes((state) => {
        return [
          ...state,
          {
            size: [Math.random(), Math.random(), Math.random()],
            position: { x: 0, y: 0 },
            active: false,
            color: colors[getRandomInt(1, colors.length-1)],
          },
        ];
      });
    }, 2000),
    []
  );

  useFrame(() => {
    if (boxes.length < 100) {
      addBlock();
    }
  });

  return (
    <>
      <pointLight position={[10, 20, 130]} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <Physics gravity={[0, -2, 0]}>
        <Plane color={colors[0]} />
        {[
          ...boxes.slice(0, boxes.length - 1),
          { ...boxes[boxes.length - 1], active: true },
        ].map((el, i) => {
          return <Block key={i} {...el} />;
        })}
      </Physics>
    </>
  );
}

export default App;
