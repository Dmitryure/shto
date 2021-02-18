import { useRef, useState } from 'react'
import {useSpring} from "react-spring"
import { useFrame, useThree } from 'react-three-fiber'
import { useDrag, useMove } from 'react-use-gesture'

function App(props) {
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
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default App;
