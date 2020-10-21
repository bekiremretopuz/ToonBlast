import { SimpleButton2D } from "app/Display/SimpleButton2D";
import { TweenLite, TweenMax } from "gsap";
export class Grid extends PIXI.Container {
  private _symbol: SimpleButton2D[][] = [];
  private _rotateAnimation: TweenMax;
  constructor(private readonly sequence: string[][]) {
    super();
    this.init();
  }

  private init() {
    for (let i = 0; i < 9; i++) {
      this._symbol[i] = [];
      for (let j = 0; j < 9; j++) {
        this._symbol[i][j] = new SimpleButton2D(
          this.sequence[j][i],
          { x: 80 + i * 75, y: 360 + j * 90 },
          this.onButtonClick.bind(this),
          "solid1"
        );
        this._symbol[i][j].anchor.set(0.5, 0.5);
        this._symbol[i][j].scale.set(0.75, 0.75);
        this.addChild(this._symbol[i][j]);
      }
    }
  }

  private onButtonClick(button: SimpleButton2D): void {
    this.rotateAnimation(button);
  }

  private rotateAnimation(target: SimpleButton2D): void {
    if (this._rotateAnimation) this._rotateAnimation.seek(1, false);
    this._rotateAnimation = TweenMax.to(target, 0.1, {
      rotation: Math.random() < 0.5 ? 0.1 : -0.1,
      repeat: 5,
      yoyo: true,
    });
    this._rotateAnimation = TweenMax.to(target.scale, 0.1, {
      x: 0.65,
      y: 0.65,
      repeat: 3,
      yoyo: true,
    });
  }
}
