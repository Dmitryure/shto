import { useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

export const Block = (props) => {
  const {size} = props
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const {viewport, mouse} = useThree();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if(active) {
      mesh.current.position.x = (mouse.x * viewport.width) / 2
      mesh.current.position.y = (mouse.y * viewport.height) / 2
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      position={[1,1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={size} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}