import { Animations, BoyAnimations } from "src/scripts/game/Components/Animations";
export class AnimationsController extends PIXI.Container {
  private _animatios: Animations;
  constructor() {
    super();
    this.awake();
  }

  private awake(): void {
    this._animatios = new Animations();
    this.addChild(this._animatios);
  }

  public setCharacterAnimation(anim: BoyAnimations, loop: boolean = false) {
    this._animatios.boyAnimation.state.setAnimation(0, anim, loop);
  }
}
