<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";
import { setupThreeScene } from "./utils/threeSetup";
import { setupStats } from "./utils/statsSetup";

// defineProps<{ msg: string }>()

let container: HTMLElement;

onMounted(() => {
  const container = document.getElementById("container")!;

  if (!container) {
    console.error("Container element not found");
    return;
  }

  const { world, components } = setupThreeScene(container, 0x000000);
  setupStats(world);

  setupObjects(world);
  setupLighting(world);
  animate(world);

function setupObjects(world: any) {
  const material = new THREE.MeshLambertMaterial({ color: "#ff5522" });
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

  cube.position.set(0, 0.5, 0);
  world.scene.three.add(cube);
  world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
}

function setupLighting(world: any) {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  world.scene.three.add(light);
}

function animate(world: any) {
  function render() {
    world.renderer.update();
    requestAnimationFrame(render);
  }
  render();
}

});
</script>

<template>
  <div id="container" style="width: 100vw; height: 95vh;"></div>
</template>

<style scoped>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
