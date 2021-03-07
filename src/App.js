import { Physics } from "use-cannon";
import { throttle } from "lodash";
import { useCallback, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Block } from "./components/Block";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PlaneWithBorders from "./components/Plane";
import { v4 as uuidv4 } from "uuid";
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

function App() {
  const [boxes, setBoxes] = useState([]);
  const colors = palletes[13];

  const setActive = (id) => {
    setBoxes((state) => {
      const newBoxes = state.map((el) => {
        if (id === el.id) {
          return { ...el, active: true };
        } else {
          return { ...el, active: false };
        }
      });
      return newBoxes;
    });
  };

  const addBlock = useCallback(
    throttle(() => {
      setBoxes((state) => {
        return [
          ...state,
          {
            size: [randomXSide(), 0.5, randomXSide()],
            position: { x: 0, y: 0 },
            active: false,
            color: colors[getRandomInt(1, colors.length - 1)],
            id: uuidv4(),
          },
        ];
      });
    }, 1800),
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
        {boxes.map((el, i) => {
          return <Block setActive={setActive} key={el.id} {...el} />;
        })}
      </Physics>
    </>
  );
}

export default App;
