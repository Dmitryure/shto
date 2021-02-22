import { Physics } from "use-cannon";
import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { useDrag, useMove } from "react-use-gesture";
import { Block } from "./components/Block";
import { PerspectiveCamera } from '@react-three/drei'
import Plane from "./components/Plane";

function App(props) {
  // This reference will give us direct access to the mesh

  const [boxes, setBoxes] = useState([]);

  const addBlock = useCallback(
    throttle(() => {
      setBoxes((state) => {
        console.log(state);
        return [
          ...state,
          {
            size: [Math.random(), Math.random(), Math.random()],
            position: { x: 0, y: 0 },
            active: false,
          },
        ];
      });
    }, 1000),
    []
  );

  useFrame(() => {
    addBlock();
    console.log([
      ...boxes.slice(0, boxes.length - 1),
      { ...boxes[boxes.length], active: true },
    ]);
  });

  return (
    <>
      <pointLight position={[10, 20, 130]} />
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <Physics>
        <Plane />
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
