import { usePlane } from "use-cannon";

function PlaneWithBorders(props) {
  const { color } = props;
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [border1] = usePlane(() => ({
    mass: 0,
    rotation: [0, Math.PI / 2, 0],
    position: [-5, 2.5, 0],
    ...props,
  }));
  const [border2] = usePlane(() => ({
    mass: 0,
    rotation: [0, -Math.PI / 2, 0],
    position: [5, 2.5, 0],
    ...props,
  }));
  const [border3] = usePlane(() => ({
    mass: 0,
    rotation: [0, -Math.PI, 0],
    position: [0, 2.5, 5],
    ...props,
  }));
  const [border4] = usePlane(() => ({
    mass: 0,
    rotation: [0, Math.PI * 2, 0],
    position: [0, 2.5, -5],
    ...props,
  }));
  return (
    <>
      <mesh  ref={border1}>
        <planeBufferGeometry  attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} color={"blue"} />
      </mesh>
      <mesh  ref={border2}>
        <planeBufferGeometry  attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} color={"yellow"} />
      </mesh>
      <mesh  ref={border3}>
        <planeBufferGeometry  attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} color={"red"} />
      </mesh>
      <mesh  ref={border4}>
        <planeBufferGeometry  attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} color={"green"} />
      </mesh>
      <mesh receiveShadow ref={ref}>
        <planeBufferGeometry attach="geometry" args={[10, 10]} />
        <meshStandardMaterial color={color} />
        
      </mesh>
    </>
  ); 
}
 
export default PlaneWithBorders;
