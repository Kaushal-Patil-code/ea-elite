import * as THREE from 'three';

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  handleResize: () => void;
}

export function createScene(canvas: HTMLCanvasElement, container: HTMLElement): SceneContext {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Renderer — use the provided canvas element so React controls the DOM
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(3, 2, 5);
  camera.lookAt(0, 0, 0);

  // Scene
  const scene = new THREE.Scene();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xC5A55A, 0.8);
  directionalLight.position.set(5, 8, 5);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0x4A6FA5, 0.3);
  backLight.position.set(-3, 2, -5);
  scene.add(backLight);

  // Resize handler
  const handleResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  return { scene, camera, renderer, handleResize };
}
