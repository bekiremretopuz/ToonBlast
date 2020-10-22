import "pixi-spine";
import { EmreBase } from "app/EntryPoint";
import { SequenceAnimation } from "app/Display/SequenceAnimation";
enum BoyAnimations {
  Walk = "walk",
  Jump = "jump",
}
export class Animations extends PIXI.Container {
  private _game: EmreBase.EntryPoint;
  private _logoAnimation: SequenceAnimation;
  private _spineBoyAnim: PIXI.spine.Spine;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
    this.awake();
  }

  private awake(): void {
    //Logo sequence animation
    // this._logoAnimation = new SequenceAnimation("", 19, { x:1120, y: 650});
    // this._logoAnimation.animationSpeed = 0.2;
    // this._logoAnimation.anchor.set(0.5, 0.5);
    // this._logoAnimation.gotoAndPlay(0);
    // this.addChild(this._logoAnimation);

    this._spineBoyAnim = new PIXI.spine.Spine(
      this._game.resource.loader.resources.spine.spineData
    );
    this._spineBoyAnim.scale.set(0.5, 0.5);
    this._spineBoyAnim.state.timeScale = 1;
    this._spineBoyAnim.position.set(137, 215);
    this._spineBoyAnim.stateData.setMix(
      BoyAnimations.Walk,
      BoyAnimations.Walk,
      0.01
    );
    this._spineBoyAnim.stateData.setMix(
      BoyAnimations.Walk,
      BoyAnimations.Jump,
      0.1
    );
    this._spineBoyAnim.stateData.setMix(
      BoyAnimations.Jump,
      BoyAnimations.Walk,
      0.1
    );
    this._spineBoyAnim.state.setAnimation(0, BoyAnimations.Walk, true);
    this.addChild(this._spineBoyAnim);
  }
}
