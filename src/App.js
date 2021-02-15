import { useRef, useState } from 'react'
import {useSpring} from "react-spring"
import { useFrame } from 'react-three-fiber'
import { useDrag } from 'react-use-gesture'

function App(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const [{x,y}, set] = useSpring(() => ({x: 1, y: 1}))
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y }))

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      {...bind()}
      position={[x.value/100, y.value / 100, 0]}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default App;
