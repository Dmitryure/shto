import { Physics } from "use-cannon";
import { throttle } from "lodash";
import { useCallback, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Block } from "./components/Block";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PlaneWithBorders from "./components/Plane";
import palletes from "nice-color-palettes";

function getRandomInt(min = 0, max) {
  if (!max) {
    throw Error("getRandomInt requires max argument to be an integer");
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomXSide() {
  return [0.3, 0.4, 0.5, 0.6, 0.7][getRandomInt(0, 4)];
}

function randomGenerationLocation() {
  return [0, 1, 2, 3][getRandomInt(0,3)]
}

function App() {
  const [boxes, setBoxes] = useState([]);
  const colors = palletes[13];

  const addBlock = useCallback(
    throttle(() => {
      setBoxes((state) => {
        console.log(state);
        return [
          ...state,
          {
            size: [randomXSide(), 0.5, randomXSide()],
            position: { x: 0, y: 0 },
            active: false,
            color: colors[getRandomInt(1, colors.length - 1)],
          },
        ];
      });
    }, 800),
    []
  );

  useFrame(() => {
    if (boxes.length < 100) {
      addBlock();
    }
  });

  return (
    <>
      <directionalLight
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        castShadow
        position={[2, 20, 30]}
      />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <Physics gravity={[0, -2, 0]}>
        <PlaneWithBorders color={colors[0]} />
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
