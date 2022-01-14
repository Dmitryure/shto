import React from 'react'
import  { usePlane } from "@react-three/cannon";


function PlaneWithBorders(props) {
  const { color } = props;
  const [ref] = usePlane(() => ({
    position: [0, -5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  const [border1] = usePlane(() => ({
    mass: 0,
    rotation: [0, Math.PI / 2, 0],
    position: [-3.5, 2.5, 0],
    ...props,
  }));
  const [border2] = usePlane(() => ({
    mass: 0,
    rotation: [0, -Math.PI / 2, 0],
    position: [3.5, 2.5, 0],
    ...props,
  }));
  // front
  const [border3] = usePlane(() => ({
    mass: 0,
    rotation: [0, -Math.PI, 0],
    position: [0, 2.5, 0.7],
    ...props,
  }));
  // back
  const [border4] = usePlane(() => ({
    mass: 0,
    rotation: [0, Math.PI * 2, 0],
    position: [0, 2.5, -0.7],
    ...props,
  }));
  return (
    <>
      <mesh ref={border1}>
        <planeBufferGeometry attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh ref={border2}>
        <planeBufferGeometry attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh ref={border3}>
        <planeBufferGeometry attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh ref={border4}>
        <planeBufferGeometry attach="geometry" args={[10, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh receiveShadow ref={ref}>
        <planeBufferGeometry attach="geometry" args={[7, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

export default PlaneWithBorders;
