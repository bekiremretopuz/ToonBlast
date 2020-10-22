import { Animations } from "app/Components/Animations";
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
}
