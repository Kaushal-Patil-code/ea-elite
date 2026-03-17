import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave1 = sin(pos.x * 1.5 + uTime * 0.8) * 0.06;
    float wave2 = sin(pos.y * 2.0 + uTime * 0.6 + 1.5) * 0.04;
    float wave3 = sin((pos.x + pos.y) * 1.0 + uTime * 0.4) * 0.03;

    pos.z += wave1 + wave2 + wave3;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 deepColor = vec3(0.039, 0.059, 0.11);   // #0A0F1C
    vec3 surfaceColor = vec3(0.106, 0.165, 0.29); // #1B2A4A
    vec3 goldTint = vec3(0.77, 0.647, 0.353);     // #C5A55A

    float mixFactor = smoothstep(-0.05, 0.1, vElevation);
    vec3 color = mix(deepColor, surfaceColor, mixFactor);

    // Subtle gold reflection on wave peaks
    float goldAmount = smoothstep(0.04, 0.1, vElevation) * 0.08;
    color = mix(color, goldTint, goldAmount);

    // Subtle grid lines for tech feel
    float gridX = smoothstep(0.48, 0.5, fract(vUv.x * 20.0));
    float gridY = smoothstep(0.48, 0.5, fract(vUv.y * 20.0));
    float grid = max(gridX, gridY) * 0.03;
    color += vec3(grid) * goldTint;

    gl_FragColor = vec4(color, 0.85);
  }
`;

export function createOcean(scene: THREE.Scene): {
  ocean: THREE.Mesh;
  uniforms: { uTime: { value: number } };
} {
  const uniforms = {
    uTime: { value: 0.0 },
  };

  const geometry = new THREE.PlaneGeometry(20, 20, 80, 80);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const ocean = new THREE.Mesh(geometry, material);
  ocean.position.y = -0.35;
  scene.add(ocean);

  return { ocean, uniforms };
}
