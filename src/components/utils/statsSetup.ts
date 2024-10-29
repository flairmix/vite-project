import * as OBC from "@thatopen/components";
import Stats from "stats.js";

export function setupStats(world: OBC.World): void 
{
  const stats = new Stats();
  stats.showPanel(2);
  document.body.append(stats.dom);
  stats.dom.style.left = "0px";
  stats.dom.style.zIndex = "unset";

  if (world != null && world.renderer != null){
    world.renderer.onBeforeUpdate.add(() => stats.begin());
    world.renderer.onAfterUpdate.add(() => stats.end());
  }
}

