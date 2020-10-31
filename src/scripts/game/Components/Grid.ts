import "pixi-particles";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { Bounce, Linear, TweenLite, TweenMax } from "gsap";
import { explodeConfig, sparksConfig } from "app/Helper/GameSettings";
export class Grid extends PIXI.Container {
  private _gridContainer: PIXI.Container;
  private _gridMask: PIXI.Graphics;
  public _symbol: any[][] = [];
  private _symbolRotateAnimation: TweenMax;
  private _symbolScaleAnimation: TweenMax;
  private _explodeParticleContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();
  private _explodeParticleAnimation: PIXI.particles.Emitter[] = [];
  private _sparksParticleContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();
  private _sparksParticleAnimation: PIXI.particles.Emitter;
  private _requestAnimationExplodeFrameId: number;
  private _requestAnimationSparksFrameId: number;
  constructor(private readonly sequence: string[][]) {
    super();
    this.addChild(this._sparksParticleContainer);
  }

  public createGrid(columns: number, rows: number) {
    this._gridContainer = new PIXI.Container();
    this.addChild(this._gridContainer);
    this._gridMask = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(40, 315, 680, 825).endFill();
    this._gridContainer.mask = this._gridMask;
    this.addChild(this._gridMask);
    for (let column = 0; column < columns; column++) {
      this._symbol[column] = [];
      for (let row = 0; row < rows; row++) {
        this._symbol[column][row] = new SimpleButton2D(this.sequence[column][row], { x: 80 + column * 75, y: 360 + row * 90 }, () => {
          this.emit("actiontaken", [column, row], this._symbol[column][row]);
        });
        this._symbol[column][row].name = this.sequence[column][row];
        this._symbol[column][row].anchor.set(0.5, 0.5);
        this._symbol[column][row].scale.set(0.75, 0.75);
        this._gridContainer.addChild(this._symbol[column][row]);
      }
    }
    this.setType();
  }

  public rotateAnimation(target: SimpleButton2D): void {
    if (this._symbolRotateAnimation) this._symbolRotateAnimation.seek(1, false);
    if (this._symbolScaleAnimation) this._symbolScaleAnimation.seek(1, false);
    TweenMax.killTweensOf(target.scale);
    TweenMax.killTweensOf(target.rotation);
    this._symbolRotateAnimation = TweenMax.to(target, 0.1, {
      rotation: Math.random() < 0.5 ? 0.1 : -0.1,
      repeat: 5,
      yoyo: true,
    });
    this._symbolScaleAnimation = TweenMax.to(target.scale, 0.1, {
      x: 0.65,
      y: 0.65,
      repeat: 3,
      yoyo: true,
    });
  }

  public createDuplicateSymbol(column: number, row: number, symbolType: string, clusterLength: number): void {
    const duplicateSymbol = new SimpleButton2D(symbolType, { x: 80 + column * 75, y: 360 + row * 90 }, null as any);
    duplicateSymbol.anchor.set(0.5);
    duplicateSymbol.scale.set(0.75);
    this.addChild(duplicateSymbol);
    this.goalTransformAnimation(duplicateSymbol, symbolType, clusterLength);
  }

  public goalTransformAnimation(targetSymbol: SimpleButton2D, symbolType: string, clusterLength: number): void {
    let targetPosX: number = 505;
    if (symbolType == "solid1") targetPosX = 340;
    else if (symbolType == "solid2") targetPosX = 420;
    TweenLite.to(targetSymbol, 0.6, {
      bezier: [{ x: targetPosX, y: 100 }],
      ease: Linear.easeInOut,
      onComplete: () => {
        this.emit("goaltransformcompleted");
        targetSymbol.destroy();
        this.goalParticleAnimation(targetPosX, symbolType);
      },
    });
  }

  private goalParticleAnimation(posX: number, symbolType: string): void {
    window.cancelAnimationFrame(this._requestAnimationSparksFrameId);
    if (this._sparksParticleAnimation) this._sparksParticleAnimation.destroy();
    this._sparksParticleAnimation = new PIXI.particles.Emitter(this._sparksParticleContainer, [PIXI.Texture.from("sparks")], sparksConfig);
    this._sparksParticleContainer.tint = this.getTintColor(symbolType);
    this._sparksParticleAnimation.updateSpawnPos(posX, 100);
    let elapsed = Date.now();
    const update = () => {
      this._requestAnimationSparksFrameId = requestAnimationFrame(update);
      let now = Date.now();
      this._sparksParticleAnimation.update((now - elapsed) * 0.001);
      elapsed = now;
    };
    this._sparksParticleAnimation.emit = true;
    update();
  }

  public matchAnimation(column: number, row: number, symbolType: string, clusterLength: number, isGoalAnimation: boolean) {
    if (this._symbolRotateAnimation) {
      this._symbolRotateAnimation.kill();
      this._symbolRotateAnimation.seek(this._symbolRotateAnimation.duration, false);
    }
    if (this._symbolScaleAnimation) {
      this._symbolScaleAnimation.kill();
      this._symbolScaleAnimation.seek(this._symbolScaleAnimation.duration, false);
    }
    this.createAndPlayParticleAnimation(column, row, this._symbol[column][row].name);
    this._symbol[column][row].scale.set(0);
    this.emit("matchanimationstarted", [column, row]);
    setTimeout(() => {
      if (isGoalAnimation) this.createDuplicateSymbol(column, row, symbolType, clusterLength);
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

  public getTintColor(symbolType: string): number {
    switch (symbolType) {
      case "solid1":
        return 0xefd401;
      case "solid2":
        return 0xe30e0e;
      case "solid3":
        return 0x2b97e2;
      case "solid4":
        return 0x40bb0b;
      default:
        throw new Error("Unexpected symbol type");
    }
  }

  public createAndPlayParticleAnimation(column: number, row: number, symbolType: string): void {
    window.cancelAnimationFrame(this._requestAnimationExplodeFrameId);
    const i = this._explodeParticleAnimation.length;
    this._explodeParticleAnimation[i] = new PIXI.particles.Emitter(this._explodeParticleContainer, ["solidParticle1", "solidParticle2"], explodeConfig);
    this._explodeParticleContainer.tint = this.getTintColor(symbolType);
    this.addChild(this._explodeParticleContainer);
    this._explodeParticleAnimation[i].updateSpawnPos(75 + column * 75, 360 + row * 90);
    let elapsed = Date.now();
    const update = () => {
      this._requestAnimationExplodeFrameId = requestAnimationFrame(update);
      let now = Date.now();
      for (let i = 0; i < this._explodeParticleAnimation.length; i++) {
        this._explodeParticleAnimation[i].update((now - elapsed) * 0.001);
      }
      elapsed = now;
    };
    this._explodeParticleAnimation[i].emit = true;
    update();
  }

  public destroyParticleAnimation(): void {
    for (let i = 0; i < this._explodeParticleAnimation.length; i++) {
      this._explodeParticleAnimation[i].destroy();
    }
  }

  public restartSetGrid(level: number): void {
    for (let column = 0; column < 9; column++) {
      for (let row = 0; row < 9; row++) {
        this._symbol[column][row].setTexture(this.sequence[column][row]);
      }
    }
    this.setType();
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
