import {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '../components/Loader'

import Island from '../models/Island'
import  Sky  from '../models/Sky'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */}
const home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [-8.5, -15.5, -30];
    let rotation = [-1.1, 0, -1.5]

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    } else  {
      screenScale = [1, 1, 1]
    }
    return [ screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]}  intensity={2}/>
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
          <Sky  />
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default home