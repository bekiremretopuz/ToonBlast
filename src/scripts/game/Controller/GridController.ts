import { Grid } from "src/scripts/game/Components/Grid";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { FindMatch } from "app/Helper/FindMatch";
export class GridController extends PIXI.Container {
  private _grid: Grid;
  private _allClusters: number[][] = [];
  private _cluster: number[][] = [];
  private _currentSequence: string[][] = [];
  private _newSymbolStack: number[][] = [];
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
    this._grid.on("actiontaken", this.onActionTaken, this);
    this._grid.on("matchanimationstarted", this.createNewSymbol, this);
    this._grid.once("matchanimationcompleted", this.matchCompleted, this);
    this._grid.createGrid(
      this.gameSettings.Levels[this.level].column,
      this.gameSettings.Levels[this.level].row
    );
    this.clearSequenceProperties();
  }

  private getRandomSymbolName(): string {
    const possibleSymbol = ["solid1", "solid2", "solid3", "solid4"];
    return possibleSymbol[Math.floor(Math.random() * possibleSymbol.length)];
  }

  private clearSequenceProperties(): void {
    this._newSymbolStack = [];
    this._cluster = [];
    this._allClusters = [];
  }

  public restartSetGrid(level: number): void {
    this.clearSequenceProperties();
    this._grid.restartSetGrid(level);
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

  private onActionTaken(index: number[], button: SimpleButton2D): void {
    this._grid.destroyParticleAnimation();
    this._allClusters = new FindMatch().getResult(this._grid._symbol);
    const matchesType = this._allClusters[index[1]][index[0]];
    this._cluster = this.isItemInArray(this._allClusters, matchesType);
    const symbolType = this._grid._symbol[index[0]][index[1]].name;
    if (this._cluster.length >= 2) {
      this.emit("animationstatus", "match", symbolType);
      this._grid.setInteractivity(false);
      for (let i = 0; i < this._cluster.length; i++) {
        this._grid.matchAnimation(this._cluster[i][1], this._cluster[i][0]);
      }
    } else {
      this._grid.rotateAnimation(button);
    }
  }

  private _old: any = 0;
  private _rowLength: number = 0;
  private createNewSymbol(value: any): void {
    if (this._old[0] == value[0]) {
      this._rowLength++;
    } else {
      this._rowLength = 0;
    }
    this._old = value;
    const randSymbol = this.getRandomSymbolName();
    const a = this._grid._symbol[value[0]].splice(
      0,
      0,
      this._grid._symbol[value[0]].splice(value[1], 1)[0]
    );
    this._grid._symbol[value[0]][0].setTexture(randSymbol);
    this._grid._symbol[value[0]][0].position.set(
      80 + value[0] * 75,
      360 - 90 * (this._rowLength + 1)
    );
    this._grid._symbol[value[0]][0].scale.set(0.75);
    this._newSymbolStack.push([value[0], value[1]]);
  }

  private matchCompleted(): void {
    const self = this;
    for (let i = 0; i < this._newSymbolStack.length; i++) {
      if (this._newSymbolStack[i]) {
        this._grid.fallAnimation(
          this._newSymbolStack[i],
          (completeIndex: number[]) => {
            this._grid.setCallback(completeIndex[0], completeIndex[1]);
            if (
              self._newSymbolStack[self._newSymbolStack.length - 1][0] ==
                completeIndex[0] &&
              self._newSymbolStack[self._newSymbolStack.length - 1][1] ==
                completeIndex[1]
            ) {
              self.clearSequenceProperties();
              self._grid.setType();
              self._grid.setInteractivity(true);
              self._grid.once(
                "matchanimationcompleted",
                self.matchCompleted,
                self
              );
            }
          }
        );
      }
    }
  }
}
