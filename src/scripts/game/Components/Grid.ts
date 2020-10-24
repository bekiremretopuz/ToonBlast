import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { TweenLite, TweenMax } from "gsap";
export class Grid extends PIXI.Container {
  private _gridContainer: PIXI.Container;
  private _symbol: any[][] = [];
  private _rotateAnimation: TweenMax;
  private _scaleAnimation: TweenMax;
  private _gridMask: PIXI.Graphics;
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
        this._symbol[i][j].type = this.sequence[j][i];
        this._symbol[i][j].anchor.set(0.5, 0.5);
        this._symbol[i][j].scale.set(0.75, 0.75);
        this._gridContainer.addChild(this._symbol[i][j]);
      }
    }
  }

  private onButtonClick(index: number[], button: SimpleButton2D): void {
    this.emit("animationstatus", index, button);
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
    this._symbol[column][row].scale.set(0.1, 0.1); //match animation olucak
    this.createSymbol(column, row, "solid1"); // random yada belli bir oranda gelicek
    for (let i = 0; i < row; i++) {
      const posY = this._symbol[column][i].position.y;
      TweenLite.to(this._symbol[column][i].position, 1, {
        y: posY + 90,
      });
    }
    this._symbol[column][row].emit("matchcompleted");
  }

  private createSymbol(column: number, row: number, symbolName: string): void {
    this._symbol.sort((x: any, y: any) => {
      console.log(x, y);
      return -1;
      //return x == first ? -1 : y == first ? 1 : 0;
    });
    this._symbol[column][row].type = symbolName;
    const name = symbolName + "_normal";
    this._symbol[column][row].texture = PIXI.Texture.from(name);
    this._symbol[column][row].scale.set(0.75, 0.75);
    this._symbol[column][row].position.set(80 + column * 75, 250);
    this.fallNewSymbol(column, row);
  }

  private fallNewSymbol(column: number, row: number): void {
    TweenLite.to(this._symbol[column][row].position, 1, {
      y: 360,
    });
  }

  public get symbol(): any[][] {
    return this._symbol;
  }
}
