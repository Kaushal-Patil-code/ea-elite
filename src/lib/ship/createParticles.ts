import * as THREE from 'three';

export interface ParticleSystem {
  ambientParticles: THREE.Points;
  wakeParticles: THREE.Points;
  update: (time: number) => void;
}

export function createParticles(scene: THREE.Scene): ParticleSystem {
  // ---- AMBIENT GOLDEN PARTICLES ----
  const ambientCount = 150;
  const ambientPositions = new Float32Array(ambientCount * 3);
  const ambientSizes = new Float32Array(ambientCount);
  const ambientSpeeds = new Float32Array(ambientCount);

  for (let i = 0; i < ambientCount; i++) {
    const radius = 3 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    ambientPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    ambientPositions[i * 3 + 1] = (Math.random() - 0.3) * 3;
    ambientPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    ambientSizes[i] = 0.5 + Math.random() * 1.5;
    ambientSpeeds[i] = 0.2 + Math.random() * 0.5;
  }

  const ambientGeo = new THREE.BufferGeometry();
  ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
  ambientGeo.setAttribute('size', new THREE.BufferAttribute(ambientSizes, 1));

  const ambientMat = new THREE.PointsMaterial({
    color: 0xC5A55A,
    size: 0.03,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
  scene.add(ambientParticles);

  // ---- WAKE TRAIL PARTICLES ----
  const wakeCount = 80;
  const wakePositions = new Float32Array(wakeCount * 3);
  const wakeOpacities = new Float32Array(wakeCount);

  for (let i = 0; i < wakeCount; i++) {
    const progress = i / wakeCount;
    wakePositions[i * 3] = -2.0 - progress * 3;  // Behind the ship
    wakePositions[i * 3 + 1] = -0.25 + (Math.random() - 0.5) * 0.1;
    wakePositions[i * 3 + 2] = (Math.random() - 0.5) * (0.3 + progress * 0.8);
    wakeOpacities[i] = 1.0 - progress;
  }

  const wakeGeo = new THREE.BufferGeometry();
  wakeGeo.setAttribute('position', new THREE.BufferAttribute(wakePositions, 3));

  const wakeMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const wakeParticles = new THREE.Points(wakeGeo, wakeMat);
  scene.add(wakeParticles);

  // ---- UPDATE FUNCTION ----
  function update(time: number) {
    // Animate ambient particles - slow drift
    const aPos = ambientGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < ambientCount; i++) {
      const speed = ambientSpeeds[i];
      aPos.array[i * 3 + 1] += Math.sin(time * speed + i) * 0.0005;
      // Subtle circular drift
      const angle = time * 0.1 * speed + i * 0.5;
      aPos.array[i * 3] += Math.cos(angle) * 0.0003;
      aPos.array[i * 3 + 2] += Math.sin(angle) * 0.0003;
    }
    aPos.needsUpdate = true;

    // Pulse ambient opacity
    ambientMat.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;

    // Animate wake particles
    const wPos = wakeGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < wakeCount; i++) {
      const progress = i / wakeCount;
      // Spread outward over time
      wPos.array[i * 3 + 2] += (Math.random() - 0.5) * 0.002;
      // Subtle wave motion
      wPos.array[i * 3 + 1] = -0.25 + Math.sin(time * 2 + i * 0.3) * 0.02 * (1 - progress);
    }
    wPos.needsUpdate = true;
  }

  return { ambientParticles, wakeParticles, update };
}
