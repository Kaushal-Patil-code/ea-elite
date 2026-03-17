'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { createScene } from '@/lib/ship/createScene';
import { createShip } from '@/lib/ship/createShip';
import { createContainers, highlightDivision } from '@/lib/ship/createContainers';
import { createOcean } from '@/lib/ship/createOcean';
import { createParticles } from '@/lib/ship/createParticles';
import type { ContainerGroup } from '@/lib/ship/createContainers';

interface Props {
  className?: string;
  activeDiv?: number | null;
  onContainerClick?: (divisionIndex: number, divisionName: string) => void;
  onContainerHover?: (divisionIndex: number | null, divisionName: string | null, screenPos: { x: number; y: number } | null) => void;
}

export default function CargoShip({ className = '', activeDiv = null, onContainerClick, onContainerHover }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);
  const divisionsRef = useRef<ContainerGroup[]>([]);
  const allMeshesRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const animFrameRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: -0.3 });
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!wrapperRef.current || !canvasRef.current) return;

    const ctx = createScene(canvasRef.current, wrapperRef.current);
    sceneRef.current = ctx;

    const ship = createShip(ctx.scene);

    const { containerGroup, divisions, allMeshes } = createContainers(ctx.scene);
    divisionsRef.current = divisions;
    allMeshesRef.current = allMeshes;

    const { uniforms: oceanUniforms } = createOcean(ctx.scene);
    const particles = createParticles(ctx.scene);

    // Parent containers under ship so they rotate together
    ctx.scene.remove(containerGroup);
    ship.add(containerGroup);

    lastTimeRef.current = performance.now() / 1000;

    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);

      const now = performance.now() / 1000;
      const dt = Math.min(now - lastTimeRef.current, 0.1); // Cap delta
      lastTimeRef.current = now;
      timeRef.current += dt;
      const t = timeRef.current;

      // Auto-rotation (when not dragging)
      if (!isDraggingRef.current) {
        rotationRef.current.y += dt * 0.15;
      }

      // Apply rotation + bob
      ship.rotation.y = rotationRef.current.y;
      ship.rotation.x = rotationRef.current.x;
      ship.position.y = Math.sin(t * 0.8) * 0.05;
      ship.rotation.z = Math.sin(t * 0.6) * 0.015;

      // Update ocean
      oceanUniforms.uTime.value = t;

      // Update particles
      particles.update(t);

      // Container pulse animation
      divisions.forEach((div, divIdx) => {
        div.meshes.forEach((mesh, meshIdx) => {
          const mat = mesh.material as THREE.MeshPhongMaterial;
          const baseLine = mat.userData?.baseEmissive ?? 0.1;
          const pulse = Math.sin(t * 2 + divIdx * 0.5 + meshIdx * 0.3) * 0.05;
          mat.emissiveIntensity = Math.max(0.05, baseLine + pulse);
        });
      });

      ctx.renderer.render(ctx.scene, ctx.camera);
    }

    animate();

    const onResize = () => ctx.handleResize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);

      ctx.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
        if (child instanceof THREE.LineSegments) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
        if (child instanceof THREE.Points) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      ctx.renderer.dispose();
    };
  }, []);

  // Highlight active division
  useEffect(() => {
    if (divisionsRef.current.length > 0) {
      highlightDivision(divisionsRef.current, activeDiv ?? null);
    }
  }, [activeDiv]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!wrapperRef.current || !sceneRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDraggingRef.current) {
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      rotationRef.current.y += dx * 0.005;
      rotationRef.current.x += dy * 0.003;
      rotationRef.current.x = Math.max(-0.5, Math.min(0.8, rotationRef.current.x));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    } else {
      raycasterRef.current.setFromCamera(mouseRef.current, sceneRef.current.camera);
      const intersects = raycasterRef.current.intersectObjects(allMeshesRef.current);
      if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        if (data.divisionIndex !== undefined && onContainerHover) {
          onContainerHover(data.divisionIndex, data.divisionName, { x: e.clientX, y: e.clientY });
        }
        wrapperRef.current.style.cursor = 'pointer';
      } else {
        if (onContainerHover) onContainerHover(null, null, null);
        wrapperRef.current.style.cursor = 'grab';
      }
    }
  }, [onContainerHover]);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!sceneRef.current || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    raycasterRef.current.setFromCamera(mouse, sceneRef.current.camera);
    const intersects = raycasterRef.current.intersectObjects(allMeshesRef.current);
    if (intersects.length > 0 && onContainerClick) {
      const data = intersects[0].object.userData;
      if (data.divisionIndex !== undefined) {
        onContainerClick(data.divisionIndex, data.divisionName);
      }
    }
  }, [onContainerClick]);

  return (
    <div
      ref={wrapperRef}
      className={`w-full h-full relative ${className}`}
      style={{ cursor: 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
