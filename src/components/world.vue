<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as THREE from "three";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";
import { setupThreeScene } from "./utils/threeSetup";
import { setupStats } from "./utils/statsSetup";


let container: HTMLElement;

let backgroundColor = "#202932";


onMounted(() => {
  const container = document.getElementById("container")!;

  if (!container) {
    console.error("Container element not found");
    return;
  }

  const { world, components } = setupThreeScene(container, backgroundColor);
  
  setupStats(world);

  setupObjects(world);
  setupLighting(world);
  animate(world);

  BUI.Manager.init();

const panel = BUI.Component.create<BUI.PanelSection>(() => {
return BUI.html`
  <bim-panel label="Worlds Tutorial" class="options-menu">
    <bim-panel-section collapsed label="Controls">

      <bim-color-input 
        label="Background Color" color=${backgroundColor} 
        @input="${({ target }: { target: BUI.ColorInput }) => {
          world.scene.config.backgroundColor = new THREE.Color(target.color);
        }}">
      </bim-color-input>

      <bim-number-input 
        slider step="0.1" label="Directional lights intensity" value="1.5" min="0.1" max="10"
        @change="${({ target }: { target: BUI.NumberInput }) => {
          world.scene.config.directionalLight.intensity = target.value;
        }}">
      </bim-number-input>

      <bim-number-input 
        slider step="0.1" label="Ambient light intensity" value="1" min="0.1" max="5"
        @change="${({ target }: { target: BUI.NumberInput }) => {
          world.scene.config.ambientLight.intensity = target.value;
        }}">
      </bim-number-input>

    </bim-panel-section>
  </bim-panel>
  `;
});

document.body.append(panel);










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
  <div class="full-screen" id="container" style="width: 100vw; height: 95vh;">

  </div>
</template>

<style scoped>
 body {
          margin: 0;
          padding: 0;
          font-family: "Plus Jakarta Sans", sans-serif;
          overflow: hidden;
      }

      .full-screen {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
      }

      .options-menu {
          position: fixed;
          min-width: unset;
          top: 5px;
          right: 5px;
          max-height: calc(100vh - 10px);
      }

      .phone-menu-toggler {
          visibility: hidden;
      }

      @media (max-width: 480px) {
          .options-menu {
              visibility: hidden;
              bottom: 5px;
              left: 5px;
          }

          .options-menu-visible {
              visibility: visible;
          }

          .phone-menu-toggler {
              visibility: visible;
              position: fixed;
              top: 5px;
              right: 5px;
          }
      }

      .minimap {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
      }
</style>
