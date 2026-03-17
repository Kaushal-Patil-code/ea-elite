import * as THREE from 'three';

export function createShip(scene: THREE.Scene): THREE.Group {
  const shipGroup = new THREE.Group();

  // ---- HULL ----
  // Create hull shape using a custom profile
  const hullShape = new THREE.Shape();
  // Bottom of hull (keel)
  hullShape.moveTo(-2, -0.3);
  hullShape.lineTo(-1.8, -0.5);
  hullShape.lineTo(1.6, -0.5);
  hullShape.lineTo(2.2, -0.2);
  hullShape.lineTo(2.4, 0);
  // Deck line (top)
  hullShape.lineTo(2.2, 0.1);
  hullShape.lineTo(-2, 0.1);
  hullShape.lineTo(-2.1, 0);
  hullShape.closePath();

  // Extrude hull for width
  const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
    depth: 1.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
  });
  hullGeometry.center();

  // Hull solid fill (very low opacity)
  const hullMaterial = new THREE.MeshPhongMaterial({
    color: 0x0A0F1C,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const hullMesh = new THREE.Mesh(hullGeometry, hullMaterial);
  shipGroup.add(hullMesh);

  // Hull wireframe edges (gold)
  const hullEdges = new THREE.EdgesGeometry(hullGeometry, 15);
  const hullLineMaterial = new THREE.LineBasicMaterial({
    color: 0xC5A55A,
    transparent: true,
    opacity: 0.7,
  });
  const hullLines = new THREE.LineSegments(hullEdges, hullLineMaterial);
  shipGroup.add(hullLines);

  // ---- DECK ----
  const deckGeometry = new THREE.BoxGeometry(4.0, 0.06, 1.1);
  const deckMaterial = new THREE.MeshPhongMaterial({
    color: 0x1B2A4A,
    transparent: true,
    opacity: 0.4,
  });
  const deck = new THREE.Mesh(deckGeometry, deckMaterial);
  deck.position.set(0.1, 0.15, 0);
  shipGroup.add(deck);

  const deckEdges = new THREE.EdgesGeometry(deckGeometry);
  const deckLines = new THREE.LineSegments(deckEdges, hullLineMaterial.clone());
  deckLines.position.copy(deck.position);
  shipGroup.add(deckLines);

  // ---- BRIDGE / SUPERSTRUCTURE ----
  // Main bridge block
  const bridgeGeo = new THREE.BoxGeometry(0.6, 0.7, 0.7);
  const bridgeMat = new THREE.MeshPhongMaterial({
    color: 0x111B2E,
    transparent: true,
    opacity: 0.4,
  });
  const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
  bridge.position.set(-1.4, 0.55, 0);
  shipGroup.add(bridge);

  const bridgeEdges = new THREE.EdgesGeometry(bridgeGeo);
  const bridgeLines = new THREE.LineSegments(bridgeEdges, hullLineMaterial.clone());
  bridgeLines.position.copy(bridge.position);
  shipGroup.add(bridgeLines);

  // Bridge windows
  const windowGeo = new THREE.BoxGeometry(0.02, 0.12, 0.5);
  const windowMat = new THREE.MeshBasicMaterial({
    color: 0xC5A55A,
    transparent: true,
    opacity: 0.4,
  });
  const windowMesh = new THREE.Mesh(windowGeo, windowMat);
  windowMesh.position.set(-1.09, 0.65, 0);
  shipGroup.add(windowMesh);

  // Upper bridge
  const upperBridgeGeo = new THREE.BoxGeometry(0.4, 0.3, 0.5);
  const upperBridge = new THREE.Mesh(upperBridgeGeo, bridgeMat.clone());
  upperBridge.position.set(-1.4, 1.0, 0);
  shipGroup.add(upperBridge);

  const upperBridgeEdges = new THREE.EdgesGeometry(upperBridgeGeo);
  const upperBridgeLines = new THREE.LineSegments(upperBridgeEdges, hullLineMaterial.clone());
  upperBridgeLines.position.copy(upperBridge.position);
  shipGroup.add(upperBridgeLines);

  // Antenna / mast
  const mastGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 6);
  const mastMat = new THREE.MeshBasicMaterial({ color: 0xC5A55A, transparent: true, opacity: 0.6 });
  const mast = new THREE.Mesh(mastGeo, mastMat);
  mast.position.set(-1.4, 1.4, 0);
  shipGroup.add(mast);

  // ---- FUNNEL / SMOKESTACK ----
  const funnelGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.4, 8);
  const funnelMat = new THREE.MeshPhongMaterial({
    color: 0xC5A55A,
    transparent: true,
    opacity: 0.5,
  });
  const funnel = new THREE.Mesh(funnelGeo, funnelMat);
  funnel.position.set(-1.1, 1.0, 0);
  shipGroup.add(funnel);

  // ---- WATERLINE GLOW ----
  const waterlineGeo = new THREE.BoxGeometry(4.2, 0.02, 1.25);
  const waterlineMat = new THREE.MeshBasicMaterial({
    color: 0xC5A55A,
    transparent: true,
    opacity: 0.15,
  });
  const waterline = new THREE.Mesh(waterlineGeo, waterlineMat);
  waterline.position.set(0.1, -0.2, 0);
  shipGroup.add(waterline);

  // ---- BOW RAIL ----
  const bowPoints = [
    new THREE.Vector3(1.8, 0.15, -0.55),
    new THREE.Vector3(2.2, 0.15, 0),
    new THREE.Vector3(1.8, 0.15, 0.55),
  ];
  const bowCurve = new THREE.CatmullRomCurve3(bowPoints);
  const bowGeo = new THREE.TubeGeometry(bowCurve, 16, 0.01, 4, false);
  const bowMat = new THREE.MeshBasicMaterial({ color: 0xC5A55A, transparent: true, opacity: 0.5 });
  const bowRail = new THREE.Mesh(bowGeo, bowMat);
  shipGroup.add(bowRail);

  scene.add(shipGroup);
  return shipGroup;
}
