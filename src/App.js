import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { useDrag, useMove } from "react-use-gesture";
import { Block } from "./components/Block";

function App(props) {
  // This reference will give us direct access to the mesh

  const [boxes, setBoxes] = useState([]);

  const addBlock = useCallback(
    throttle(() => {
      console.log(1);
      setBoxes((state) => {
        console.log(state);
        return [
          ...state,
          {
            size: [Math.random(), Math.random(), Math.random()],
            position: { x: 0, y: 0 },
          },
        ];
      });
    }, 5000),
    []
  );

  useFrame(() => {
    addBlock();
  });

  return (
    <>
      <pointLight position={[10, 20, 130]} />
      {boxes.map((el) => {
        return <Block {...el} />;
      })}
    </>
  );
}

export default App;
