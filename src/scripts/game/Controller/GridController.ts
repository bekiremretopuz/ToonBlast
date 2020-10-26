import { Grid } from "src/scripts/game/Components/Grid";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { FindMatch } from "app/Helper/FindMatch";
import { TweenLite } from "gsap";
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
    this.updateCurrentSequence();
  }

  private shiftingOfGrid(array: any[], from: number, to: number): void {
    // if (to >= array.length) {
    //   let arrLength = to - array.length + 1;
    //   while (arrLength--) {
    //     array.push(undefined);
    //   }
    // }
    // array.splice(to, 0, array.splice(from, 1)[0]);

    let cutOut = array.splice(from, 1)[0]; // cut the element at index 'from'
    array.splice(to, 0, cutOut); // insert it at index 'to'
  }

  private getRandomSymbolName(): string {
    const possibleSymbol = ["solid1", "solid2", "solid3", "solid4"];
    return possibleSymbol[Math.floor(Math.random() * possibleSymbol.length)];
  }

  private updateCurrentSequence(): void {
    this._newSymbolStack = [];
    this._cluster = [];
    this._allClusters = [];
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
    this._allClusters = new FindMatch().getResult(this._grid.symbol);
    const matchesType = this._allClusters[index[1]][index[0]];
    this._cluster = this.isItemInArray(this._allClusters, matchesType);
    if (this._cluster.length >= 2) {
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
    this.interactive = false;
    const randSymbol = this.getRandomSymbolName();
    if (randSymbol == "solid1") {
      this._grid.symbol[value[0]][this._rowLength].type = 1;
    }
    if (randSymbol == "solid2") {
      this._grid.symbol[value[0]][this._rowLength].type = 2;
    }
    if (randSymbol == "solid3") {
      this._grid.symbol[value[0]][this._rowLength].type = 3;
    }
    if (randSymbol == "solid4") {
      this._grid.symbol[value[0]][this._rowLength].type = 4;
    }
    if (this._old[0] == value[0]) {
      this._rowLength++;
    } else {
      this._rowLength = 0;
    }
    this._old = value;
    this.shiftingOfGrid(this._grid.symbol[value[0]], value[1], 0);
    this._grid.symbol[value[0]][0].name = randSymbol;
    this._grid.symbol[value[0]][0].setTexture(randSymbol);
    this._grid.symbol[value[0]][0].scale.set(0.75);
    const posX = 80 + value[0] * 75;
    const posY = 250;
    this._grid.symbol[value[0]][0].position.set(posX, posY);
    this._newSymbolStack.push([value[0], value[1]]);
  }
  
  private matchCompleted(): void {
    for (let i = 0; i < this._newSymbolStack.length; i++) {
      if (this._newSymbolStack[i + 1]) {
        this._grid.fallAnimation(this._newSymbolStack[i + 1], () => {
          this.interactive = false;
          this.updateCurrentSequence();
          // this._grid.once(
          //   "matchanimationcompleted",
          //   this.matchCompleted,
          //   this
          // );
        });
      }
    }
  }
}
