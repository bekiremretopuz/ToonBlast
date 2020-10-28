import "pixi-particles";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { Bounce, TimelineLite, TweenLite, TweenMax } from "gsap";
import { particleConfig } from "app/Helper/GameSettings";
export class Grid extends PIXI.Container {
  private _gridContainer: PIXI.Container;
  private _particleContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();
  private _particleAnimation: PIXI.particles.Emitter[] = [];
  public _symbol: any[][] = [];
  private _rotateAnimation: TweenMax;
  private _scaleAnimation: TweenMax;
  private _gridMask: PIXI.Graphics;
  private _requestAnimationFrameId: number;
  constructor(private readonly sequence: string[][]) {
    super();
  }

  public restartSetGrid(level: number): void {
    for (let column = 0; column < 9; column++) {
      for (let row = 0; row < 9; row++) {
        this._symbol[column][row].setTexture(this.sequence[column][row]);
      }
    }
    this.setInteractivity(true);
  }

  public createGrid(columns: number, rows: number) {
    this._gridContainer = new PIXI.Container();
    this.addChild(this._gridContainer);
    this._gridMask = new PIXI.Graphics()
      .beginFill(0xffffff, 1)
      .drawRect(40, 315, 680, 825)
      .endFill();
    this._gridContainer.mask = this._gridMask;
    this.addChild(this._gridMask);
    for (let column = 0; column < columns; column++) {
      this._symbol[column] = [];
      for (let row = 0; row < rows; row++) {
        this._symbol[column][row] = new SimpleButton2D(
          this.sequence[column][row],
          { x: 80 + column * 75, y: 360 + row * 90 },
          () => {
            this.emit("actiontaken", [column, row], this._symbol[column][row]);
          }
        );
        this._symbol[column][row].name = this.sequence[column][row];
        this._symbol[column][row].anchor.set(0.5, 0.5);
        this._symbol[column][row].scale.set(0.75, 0.75);
        this._gridContainer.addChild(this._symbol[column][row]);
      }
    }
    this.setType();
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
    this.createAndPlayParticleAnimation(
      column,
      row,
      this._symbol[column][row].name
    );
    this._symbol[column][row].scale.set(0.1);
    this.emit("matchanimationstarted", [column, row]);
    setTimeout(() => {
      this.emit("matchanimationcompleted", [column, row]);
    }, 100);
  }

  public setCallback(column: number, row: number) {
    const callback = () => {
      this.emit("actiontaken", [column, row], this._symbol[column][row]);
    };
    this._symbol[column][row].setCallback(callback);
  }

  public fallAnimation(value: number[], callback: (a: any) => void): void {
    for (let i = 0; i <= value[1]; i++) {
      TweenLite.to(this._symbol[value[0]][i].position, 0.85, {
        y: 360 + i * 90,
        ease: Bounce.easeOut,
        onComplete: () => {
          callback([value[0], i]);
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

  public setInteractivity(value: boolean): void {
    for (let column = 0; column < 9; column++) {
      for (let row = 0; row < 9; row++) {
        this._symbol[row][column].Interactive = value;
      }
    }
  }

  public setType(): void {
    for (let column = 0; column < 9; column++) {
      for (let row = 0; row < 9; row++) {
        const name = this._symbol[row][column].name;
        if (name == "solid1") {
          this._symbol[column][row].type = 1;
        }
        if (name == "solid2") {
          this._symbol[column][row].type = 2;
        }
        if (name == "solid3") {
          this._symbol[column][row].type = 3;
        }
        if (name == "solid4") {
          this._symbol[column][row].type = 4;
        }
      }
    }
  }
}
