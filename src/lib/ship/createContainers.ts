import * as THREE from 'three';

export interface ContainerGroup {
  name: string;
  nameKey: string;
  color: string;
  meshes: THREE.Mesh[];
  positions: THREE.Vector3[];
}

const DIVISIONS = [
  { name: 'Agriculture', nameKey: 'divisions.1.name', color: '#C5A55A' },
  { name: 'Seafood', nameKey: 'divisions.2.name', color: '#4ECDC4' },
  { name: 'Minerals', nameKey: 'divisions.3.name', color: '#F39C12' },
  { name: 'Hotels', nameKey: 'divisions.4.name', color: '#FF6B6B' },
  { name: 'F&B', nameKey: 'divisions.5.name', color: '#45B7D1' },
  { name: 'Plantation', nameKey: 'divisions.6.name', color: '#2ECC71' },
];

const CONTAINER_W = 0.32;
const CONTAINER_H = 0.25;
const CONTAINER_D = 0.28;
const GAP = 0.04;

export function createContainers(scene: THREE.Scene): {
  containerGroup: THREE.Group;
  divisions: ContainerGroup[];
  allMeshes: THREE.Mesh[];
} {
  const containerGroup = new THREE.Group();
  const allMeshes: THREE.Mesh[] = [];
  const divisionGroups: ContainerGroup[] = [];

  const containerGeo = new THREE.BoxGeometry(CONTAINER_W, CONTAINER_H, CONTAINER_D);

  // Layout: 3 columns wide (x), 2 layers high (y), 4 rows deep (z) along ship
  // Each division gets 4 containers (one column of 2 high x 2 deep)
  const startX = -0.7;
  const startY = 0.3;
  const startZ = -0.32;

  let divIndex = 0;

  for (let col = 0; col < 3; col++) {
    for (let layer = 0; layer < 2; layer++) {
      const division = DIVISIONS[divIndex];
      if (!division) break;

      const color = new THREE.Color(division.color);
      const meshes: THREE.Mesh[] = [];
      const positions: THREE.Vector3[] = [];

      for (let row = 0; row < 2; row++) {
        // Container solid
        const mat = new THREE.MeshPhongMaterial({
          color,
          transparent: true,
          opacity: 0.6,
          emissive: color,
          emissiveIntensity: 0.1,
        });
        const mesh = new THREE.Mesh(containerGeo, mat);
        const x = startX + col * (CONTAINER_W + GAP);
        const y = startY + layer * (CONTAINER_H + GAP);
        const z = startZ + row * (CONTAINER_D + GAP);
        mesh.position.set(x, y, z);
        mesh.userData = {
          divisionIndex: divIndex,
          divisionName: division.name,
          divisionNameKey: division.nameKey,
          divisionColor: division.color,
        };
        containerGroup.add(mesh);
        meshes.push(mesh);
        positions.push(new THREE.Vector3(x, y, z));
        allMeshes.push(mesh);

        // Container wireframe edges
        const edges = new THREE.EdgesGeometry(containerGeo);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.2,
        });
        const lines = new THREE.LineSegments(edges, lineMat);
        lines.position.copy(mesh.position);
        containerGroup.add(lines);
      }

      divisionGroups.push({
        name: division.name,
        nameKey: division.nameKey,
        color: division.color,
        meshes,
        positions,
      });

      divIndex++;
    }
  }

  scene.add(containerGroup);

  return { containerGroup, divisions: divisionGroups, allMeshes };
}

export function highlightDivision(
  divisions: ContainerGroup[],
  activeIndex: number | null
) {
  divisions.forEach((div, i) => {
    div.meshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshPhongMaterial;
      if (activeIndex === null) {
        mat.opacity = 0.6;
        mat.emissiveIntensity = 0.1;
      } else if (i === activeIndex) {
        mat.opacity = 0.9;
        mat.emissiveIntensity = 0.35;
      } else {
        mat.opacity = 0.25;
        mat.emissiveIntensity = 0.02;
      }
    });
  });
}
