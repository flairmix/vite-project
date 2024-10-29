<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";

// defineProps<{ msg: string }>()

let container: HTMLElement;

onMounted(() => {
  const container = document.getElementById("container")!;

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

  components.init();

  world.scene.setup();

  // Set background to a color instead of null for better visualization
  world.scene.three.background = new THREE.Color(0xeeeeee);

  const material = new THREE.MeshLambertMaterial({ color: "#6528D7" });
  const geometry = new THREE.BoxGeometry();
  const cube = new THREE.Mesh(geometry, material);
  world.scene.three.add(cube);

  world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);

  // Create a basic lighting setup
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  world.scene.three.add(light);


  // Start the animation loop to continuously render the scene
  function animate() {
  world.renderer.update();
  requestAnimationFrame(animate);
  }

  animate();


  const stats = new Stats();
  stats.showPanel(2);
  document.body.append(stats.dom);
  stats.dom.style.left = "0px";
  stats.dom.style.zIndex = "unset";

  world.renderer.onBeforeUpdate.add(() => stats.begin());
  world.renderer.onAfterUpdate.add(() => stats.end());


});



</script>

<template>
  <div id="container" style="width: 100vw; height: 95vh;"></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
