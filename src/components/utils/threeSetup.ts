import * as THREE from "three";
import * as OBC from "@thatopen/components";

export function setupThreeScene(container: HTMLElement, backgroundColor: string): {
  world: any;
  components: any;
} {
  const components = new OBC.Components();
  const worlds = components.get(OBC.Worlds);

  const world = worlds.create<
    OBC.SimpleScene,
    OBC.SimpleCamera,
    OBC.SimpleRenderer
  >();

  world.scene = new OBC.SimpleScene(components);
  world.renderer = new OBC.SimpleRenderer(components, container);
  world.camera = new OBC.SimpleCamera(components);

  const grids = components.get(OBC.Grids);
  grids.create(world);

  components.init();
  world.scene.setup();
  world.scene.three.background = new THREE.Color(backgroundColor);

  return { world, components };
}