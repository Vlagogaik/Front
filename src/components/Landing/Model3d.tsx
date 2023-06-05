import React, {useEffect, useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import { Mesh } from 'three'
import {iModel} from "../../models/Model";
import {observer} from "mobx-react-lite";



export const Model3d = observer( ({cart}:{cart:iModel}) => {

    let path = "http://localhost:5001/3dModel/" + cart.model3d
    useEffect(() => {
        console.log(path)
    },[path])
    const modelRef = useRef<Mesh>(null!)
    const gltf = useGLTF(path); // Choose model to render

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.001; // Default rotation every frame
        }
    });

    return <mesh ref={modelRef} rotation-x={Math.PI * 0.05} >
        <primitive object={gltf.scene} />

    </mesh>
})
