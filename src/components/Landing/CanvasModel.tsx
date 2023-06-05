
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import {Model3d} from "./Model3d"
import {iModel} from "../../models/Model";
import {observer} from "mobx-react-lite";


const CanvasModel = observer( ({cart}:{cart:iModel}) => {
    return (
            <Canvas>
                <Suspense fallback={null}>
                    <Model3d cart={cart} />
                </Suspense>
                <pointLight position={[10, -10, 10]} power={1} />
                <pointLight position={[-10, -10, -10]} power={1} />
                <pointLight position={[10, 10, -10]} power={4} />
                <directionalLight
                    intensity={0.8}
                    position={[-10, 10, 5]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    castShadow
                />
                <OrbitControls
                    rotateSpeed={0.1}
                />
            </Canvas>
    );

})
export default CanvasModel

