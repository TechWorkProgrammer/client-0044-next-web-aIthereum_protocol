import React, {useCallback, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {GLTFLoader, OrbitControls} from "three-stdlib";
import Loader from "@/components/common/Loader";
import {useAlert} from "@/context/Alert";

type ModelViewerProps = {
    modelUrl?: string;
};

const MeshViewer: React.FC<ModelViewerProps> = ({modelUrl}) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const alert = useAlert();

    const renderObject = useCallback(async () => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        scene.background = null;
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.shadowMap.enabled = false;
        currentMount.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
            60,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 5);

        scene.add(new THREE.AmbientLight(0xffffff, 1.0));

        const directions = [
            [5, 10, 5],
            [-5, 10, 5],
            [5, 10, -5],
            [-5, 10, -5],
            [0, 10, 0],
            [0, -10, 0],
            [5, -10, 5],
            [-5, -10, 5],
            [5, -10, -5],
            [-5, -10, -5]
        ];

        for (const [x, y, z] of directions) {
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
            dirLight.position.set(x, y, z);
            scene.add(dirLight);
        }

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 1;
        controls.enablePan = true;
        controls.enableZoom = true;

        const size = 50;
        const divisions = 1;
        const grid = new THREE.GridHelper(size, divisions, 0x888888, 0x888888);
        grid.material.opacity = 0.1;
        grid.material.transparent = true;
        scene.add(grid);

        if (modelUrl) {
            const loader = new GLTFLoader();
            loader.load(
                modelUrl,
                (gltf) => {
                    const root = gltf.scene;
                    const bbox = new THREE.Box3().setFromObject(root);
                    const center = bbox.getCenter(new THREE.Vector3());
                    root.position.x -= center.x;
                    root.position.z -= center.z;
                    root.position.y -= bbox.min.y;

                    scene.add(root);
                    setIsModelLoading(false);
                },
                undefined,
                (err) => {
                    alert("Opps...", "Error loading model: " + err.message, "error");
                    setIsModelLoading(false);
                }
            );
        } else {
            setIsModelLoading(false);
        }

        const handleResize = () => {
            if (!mountRef.current) return;
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            currentMount.removeChild(renderer.domElement);
            renderer.dispose();
            controls.dispose();
        };
    }, [modelUrl, alert]);
    useEffect(() => {
        renderObject().then();
    }, [renderObject]);


    return (
        <div ref={mountRef} className="relative w-full h-full max-h-[70vh]">
            {isModelLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                    <Loader size="large"/>
                </div>
            )}
        </div>
    );
};

export default MeshViewer;