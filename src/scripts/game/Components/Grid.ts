import "pixi-particles";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { TimelineLite, TweenLite, TweenMax } from "gsap";
import { particleConfig } from "app/Helper/GameSettings";
export class Grid extends PIXI.Container {
  private _gridContainer: PIXI.Container;
  private _particleContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();
  private _particleAnimation: PIXI.particles.Emitter[] = [];
  private _symbol: any[][] = [];
  private _rotateAnimation: TweenMax;
  private _scaleAnimation: TweenMax;
  private _gridMask: PIXI.Graphics;
  private _requestAnimationFrameId: number;
  constructor(private readonly sequence: string[][]) {
    super();
  }

  public createGrid(column: number, row: number) {
    this._gridContainer = new PIXI.Container();
    this.addChild(this._gridContainer);
    this._gridMask = new PIXI.Graphics()
      .beginFill(0xcecece, 1)
      .drawRect(40, 300, 680, 825)
      .endFill();
    this._gridContainer.mask = this._gridMask;
    this.addChild(this._gridMask);
    for (let i = 0; i < column; i++) {
      this._symbol[i] = [];
      for (let j = 0; j < row; j++) {
        this._symbol[i][j] = new SimpleButton2D(
          this.sequence[j][i],
          { x: 80 + i * 75, y: 360 + j * 90 },
          this.onButtonClick.bind(this, [i, j])
        );
        //TODO:need refactor
        if (this.sequence[i][j] == "solid1") {
          this._symbol[i][j].type = 1;
        }
        if (this.sequence[i][j] == "solid2") {
          this._symbol[i][j].type = 2;
        }
        if (this.sequence[i][j] == "solid3") {
          this._symbol[i][j].type = 3;
        }
        if (this.sequence[i][j] == "solid4") {
          this._symbol[i][j].type = 4;
        }
        this._symbol[i][j].name = this.sequence[j][i];
        this._symbol[i][j].anchor.set(0.5, 0.5);
        this._symbol[i][j].scale.set(0.75, 0.75);
        this._gridContainer.addChild(this._symbol[i][j]);
      }
    }
  }

  private onButtonClick(index: number[], button: SimpleButton2D): void {
    this.emit("actiontaken", index, button);
  }

  public rotateAnimation(target: SimpleButton2D): void {
    if (this._rotateAnimation) this._rotateAnimation.seek(1, false);
    if (this._scaleAnimation) this._scaleAnimation.seek(1, false);
    TweenMax.killTweensOf(target.scale);
    TweenMax.killTweensOf(target.rotation);
    this._rotateAnimation = TweenMax.to(target, 0.1, {
      rotation: Math.random() < 0.5 ? 0.1 : -0.1,
      repeat: 5,
      yoyo: true,
    });
    this._scaleAnimation = TweenMax.to(target.scale, 0.1, {
      x: 0.65,
      y: 0.65,
      repeat: 3,
      yoyo: true,
    });
  }

  public matchAnimation(column: number, row: number) {
    if (this._rotateAnimation) {
      this._rotateAnimation.kill();
      this._rotateAnimation.seek(this._rotateAnimation.duration, false);
    }
    if (this._scaleAnimation) {
      this._scaleAnimation.kill();
      this._scaleAnimation.seek(this._scaleAnimation.duration, false);
    }
    this._symbol[column][row].scale.set(0);
    this.emit("matchanimationstarted", [column, row]);
    this.createAndPlayParticleAnimation(
      column,
      row,
      this._symbol[column][row].name
    );
    setTimeout(() => {
      this.emit("matchanimationcompleted", [column, row]);
    }, 300);
  }

  public fallAnimation(value: number[], callback: Function): void {
    for (let i = 0; i <= value[1]; i++) {
      TweenLite.to(this._symbol[value[0]][i].position, 0.5, {
        y: 360 + i * 90,
        onComplete: () => {
          callback();
        },
      });
    }
  }

  public createAndPlayParticleAnimation(
    column: number,
    row: number,
    symbolType: string
  ): void {
    window.cancelAnimationFrame(this._requestAnimationFrameId);
    const i = this._particleAnimation.length;
    this._particleAnimation[i] = new PIXI.particles.Emitter(
      this._particleContainer,
      ["solidParticle1", "solidParticle2"],
      particleConfig
    );
    this.addChild(this._particleContainer);
    let colorHax: number = 0x2b97e2;
    switch (symbolType) {
      case "solid1":
        colorHax = 0xefd401;
        break;
      case "solid2":
        colorHax = 0xe30e0e;
        break;
      case "solid3":
        colorHax = 0x2b97e2;
        break;
      case "solid4":
        colorHax = 0x40bb0b;
        break;
    }
    this._particleContainer.tint = colorHax;
    this._particleAnimation[i].updateSpawnPos(75 + column * 75, 360 + row * 90);
    let elapsed = Date.now();
    const update = () => {
      this._requestAnimationFrameId = requestAnimationFrame(update);
      let now = Date.now();
      for (let i = 0; i < this._particleAnimation.length; i++) {
        this._particleAnimation[i].update((now - elapsed) * 0.001);
      }
      elapsed = now;
    };
    this._particleAnimation[i].emit = true;
    update();
  }

  public destroyParticleAnimation(): void {
    for (let i = 0; i < this._particleAnimation.length; i++) {
      this._particleAnimation[i].destroy();
    }
  }

  public get symbol(): any[][] {
    return this._symbol;
  }
}
