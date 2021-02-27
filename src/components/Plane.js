import { usePlane } from "use-cannon";


function Plane(props) {
  const {color} = props
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Plane;
