import "pixi-spine";
import { EmreBase } from "src/scripts/game/EntryPoint";
export enum BoyAnimations {
  Walk = "walk",
  Jump = "jump",
}
export class Animations extends PIXI.Container {
  private _game: EmreBase.EntryPoint;
  private _spineBoyAnim: PIXI.spine.Spine;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
    this.awake();
    this.initSpineEvents();
    this._spineBoyAnim.state.setAnimation(0, BoyAnimations.Walk, true);
  }

  private awake(): void {
    this._spineBoyAnim = new PIXI.spine.Spine(this._game.resource.loader.resources.spine.spineData);
    this._spineBoyAnim.autoUpdate = true;
    this._spineBoyAnim.scale.set(0.5, 0.5);
    this._spineBoyAnim.position.set(137, 215);
    this.addChild(this._spineBoyAnim);
  }

  private initSpineEvents(): void {
    //Spine animation state data mix.
    this._spineBoyAnim.stateData.setMix(BoyAnimations.Walk, BoyAnimations.Jump, 0.01);
    this._spineBoyAnim.stateData.setMix(BoyAnimations.Walk, BoyAnimations.Walk, 0.1);
    this._spineBoyAnim.stateData.setMix(BoyAnimations.Jump, BoyAnimations.Walk, 0.01);
    this._spineBoyAnim.stateData.setMix(BoyAnimations.Jump, BoyAnimations.Jump, 0.1);
    //Spine events.
    this._spineBoyAnim.state.addListener({
      complete: (event) => {
        if (event.animation.name == BoyAnimations.Jump) {
          this._spineBoyAnim.state.setAnimation(0, BoyAnimations.Walk, true);
        }
      },
    });
  }
  public get boyAnimation(): PIXI.spine.Spine {
    return this._spineBoyAnim;
  }
}
