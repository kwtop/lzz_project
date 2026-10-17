const scene = (
  slug: string,
  alt: string,
  disclosure: string,
) => ({
  src: `/media/editorial/${slug}-1536.webp`,
  srcset: [480, 800, 1200, 1536]
    .map((width) => `/media/editorial/${slug}-${width}.webp ${width}w`)
    .join(', '),
  alt,
  disclosure,
});

export const illustrativeScenes = {
  factoryOperator: scene(
    'factory-operator-illustrative',
    'AI-generated illustrative scene of a machinist monitoring a CNC machine through its closed safety window.',
    "The people and equipment are illustrative and are not a photograph of LZZ's staff or facility.",
  ),
  manualInspection: scene(
    'manual-inspection-illustrative',
    'AI-generated illustrative scene of a technician checking a machined component with a digital caliper.',
    'It does not show a real LZZ inspection, measurement result or calibration record.',
  ),
  engineeringReview: scene(
    'engineering-review-illustrative',
    'AI-generated illustrative scene of two engineers reviewing a machined part and a drawing.',
    "It is not a photograph of LZZ staff or a specific customer project.",
  ),
  packingScene: scene(
    'packing-scene-illustrative',
    'AI-generated illustrative scene of workers placing protected machined parts into a packing insert.',
    'It is not an actual LZZ shipment, export case or customer order.',
  ),
  prototypeBatch: scene(
    'prototype-batch-comparison-illustrative-v1',
    'AI-generated illustration comparing a single machined prototype with a small group of visually matching generic components.',
    'It is not an LZZ order, delivered quantity or production record.',
  ),
  materialFamily: scene(
    'material-family-editorial-illustrative-v1',
    'AI-generated illustration of several different generic machined component forms.',
    'The image does not identify material grades, stock availability or certification.',
  ),
  surfaceFinish: scene(
    'surface-finish-coupons-illustrative-v1',
    'AI-generated illustration of machined surface-finish coupons with varied visual appearances.',
    'It is not an LZZ finish sample or process record; specify a finish standard rather than relying on a photograph.',
  ),
  cmmOperator: scene(
    'cmm-operator-illustrative-v1',
    'AI-generated illustration of a technician operating a coordinate measuring machine on a machined component.',
    'It is not an LZZ employee, measurement result or calibration record.',
  ),
  roboticsApplication: scene(
    'robotics-application-illustrative-v1',
    'AI-generated illustration of generic machined components in an industrial robotics assembly.',
    'It is not a specific LZZ customer project or qualified end-use example.',
  ),
  hydraulicManifold: scene(
    'hydraulic-manifold-illustrative-v1',
    'AI-generated illustration of a generic machined hydraulic manifold and fittings.',
    'It is not a specific LZZ customer project or pressure-test evidence.',
  ),
} as const;

export type IllustrativeSceneId = keyof typeof illustrativeScenes;
