import { useState, Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '../components/Loader'

import Island from '../models/Island'
import  Sky  from '../models/Sky'
import Bird from '../models/Bird'
import  Plane  from '../models/Plane'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */}
const home = () => {
  const [isRotating, setIsRotating] = useState(false);

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

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition ;
  

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [5, -1.5, 0]
    } else  {
      screenScale = [3, 3, 3]
      screenPosition = [0, -2, -4]
    }
    return [ screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]}  intensity={2}/>
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky  />
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane 
          isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default home