import { Grid } from "src/scripts/game/Components/Grid";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { FindMatch } from "app/Helper/FindMatch";
export class GridController extends PIXI.Container {
  private _grid: Grid;
  private _clusters: number[][] = [];
  private _currentSequence: string[][] = [];
  constructor(
    private readonly gameSettings: any,
    private readonly level: number
  ) {
    super();
    this.awake();
  }

  private awake(): void {
    this._currentSequence = this.gameSettings.Levels[
      this.level
    ].initialSeqeunce;
    this._grid = new Grid(this._currentSequence);
    this.addChild(this._grid);
    this._grid.on("animationstatus", this.onGridHandler, this);
    this._grid.createGrid(
      this.gameSettings.Levels[this.level].column,
      this.gameSettings.Levels[this.level].row
    );
    this.updateCurrentSequence();
  }

  private updateCurrentSequence(): void {
    for (let i = 0; i < 9; i++) {
      this._currentSequence[i] = [];
      for (let j = 0; j < 9; j++) {
        this._currentSequence[i][j] = this._grid.symbol[j][i].type;
      }
    }
  }

  private isItemInArray(arr: number[][], val: number) {
    const locations: any = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == val) {
          locations.push([i, j]);
        }
      }
    }
    return locations;
  }

  private onGridHandler(index: number[], button: SimpleButton2D): void {
    this._clusters = [];
    this._clusters = new FindMatch().getResult(this._grid.symbol);
    const explodeType = this._clusters[index[1]][index[0]];
    let allSymbols = this.isItemInArray(this._clusters, explodeType);
    if (allSymbols.length >= 2) {
      for (let i = 0; i < allSymbols.length; i++) {
        this._grid.matchAnimation(allSymbols[i][1], allSymbols[i][0]);
      }
      //this.updateCurrentSequence();
    } else {
      this._grid.rotateAnimation(button);
    }
  }
}
