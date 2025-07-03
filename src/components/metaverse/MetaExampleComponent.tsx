import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {OrbitControls} from "three-stdlib";
import Loader from "@/components/common/Loader";

const MetaverseMap: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0);

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 50, 100);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        hemiLight.position.set(0, 200, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(-100, 100, -100);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        scene.add(dirLight);

        const groundGeo = new THREE.PlaneGeometry(1000, 1000);
        const groundMat = new THREE.MeshPhongMaterial({color: 0x666666, depthWrite: false});
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        const roads: THREE.Mesh[] = [];
        const roadMaterial = new THREE.MeshStandardMaterial({color: 0x333333});

        for (let i = 0; i < 6; i++) {
            const roadX = new THREE.Mesh(new THREE.PlaneGeometry(1000, 12), roadMaterial);
            roadX.rotation.x = -Math.PI / 2;
            roadX.position.z = Math.random() * 300 - 150;
            scene.add(roadX);
            roads.push(roadX);

            const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(12, 1000), roadMaterial);
            roadZ.rotation.x = -Math.PI / 2;
            roadZ.position.x = Math.random() * 300 - 150;
            scene.add(roadZ);
            roads.push(roadZ);
        }

        for (let i = 0; i < 20; i++) {
            const width = Math.random() * 10 + 5;
            const height = Math.random() * 40 + 20;
            const depth = Math.random() * 10 + 5;

            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(`hsl(0, 0%, ${Math.random() * 30 + 50}%)`),
            });

            const building = new THREE.Mesh(geometry, material);

            let xPos: number, zPos: number;
            do {
                xPos = Math.random() * 400 - 200;
                zPos = Math.random() * 400 - 200;
            } while (
                roads.some(
                    (road) =>
                        Math.abs(xPos - road.position.x) < 15 &&
                        Math.abs(zPos - road.position.z) < 15
                )
                );

            building.position.set(xPos, height / 2, zPos);
            building.castShadow = true;
            building.receiveShadow = true;
            scene.add(building);

            const windowRows = Math.floor(height / 5);
            const windowCols = Math.floor(width / 2);

            const createWindows = (side: "front" | "back" | "left" | "right") => {
                for (let r = 0; r < windowRows; r++) {
                    for (let c = 0; c < windowCols; c++) {
                        if (Math.random() > 0.7) continue;

                        const windowGeometry = new THREE.PlaneGeometry(1, 1);
                        const windowMaterial = new THREE.MeshStandardMaterial({
                            color: 0x555555,
                            emissive: Math.random() > 0.5 ? 0xffff99 : 0x777777,
                            emissiveIntensity: Math.random() * 0.3 + 0.1,
                        });

                        const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

                        if (side === "front") {
                            windowMesh.position.set(
                                building.position.x - width / 2 + c * 2 + 1,
                                building.position.y - height / 2 + r * 5 + 2.5,
                                building.position.z + depth / 2 + 0.01
                            );
                        } else if (side === "back") {
                            windowMesh.position.set(
                                building.position.x - width / 2 + c * 2 + 1,
                                building.position.y - height / 2 + r * 5 + 2.5,
                                building.position.z - depth / 2 - 0.01
                            );
                        } else if (side === "left") {
                            windowMesh.position.set(
                                building.position.x - width / 2 - 0.01,
                                building.position.y - height / 2 + r * 5 + 2.5,
                                building.position.z - depth / 2 + c * 2 + 1
                            );
                            windowMesh.rotation.y = Math.PI / 2;
                        } else if (side === "right") {
                            windowMesh.position.set(
                                building.position.x + width / 2 + 0.01,
                                building.position.y - height / 2 + r * 5 + 2.5,
                                building.position.z - depth / 2 + c * 2 + 1
                            );
                            windowMesh.rotation.y = Math.PI / 2;
                        }

                        scene.add(windowMesh);
                    }
                }
            };

            createWindows("front");
            createWindows("back");
            createWindows("left");
            createWindows("right");
        }

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", handleResize);

        const loadAssets = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setIsLoaded(true);
            } catch {
                setError("Failed to load assets.");
            }
        };

        loadAssets().then();

        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            controls.dispose();
            if (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <div className="w-full h-[300px] bg-primary-800 rounded-lg relative">
            {!isLoaded && !error && (
                <div className="absolute inset-0 flex justify-center items-center bg-primary-900">
                    <Loader size="large"/>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex justify-center items-center bg-red-500 text-white">
                    {error}
                </div>
            )}
            <div ref={mountRef} className="w-full h-full mx-auto overflow-hidden"/>
        </div>
    );
};

export default MetaverseMap;
