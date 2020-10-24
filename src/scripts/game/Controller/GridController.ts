import { Grid } from "src/scripts/game/Components/Grid";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { GameProperty, INITIAL_SEQ } from "src/scripts/core/GameSettings";
type clusterType = {
  column: number;
  row: number;
  length: number;
  horizontal: boolean;
};
export class GridController extends PIXI.Container {
  private _grid: Grid;
  private _clusters: clusterType[] = [];
  private _currentSequence: string[][] = [];
  constructor() {
    super();
    this.awake();
  }

  private awake(): void {
    this._currentSequence = INITIAL_SEQ;
    this._grid = new Grid(INITIAL_SEQ);
    this.addChild(this._grid);
    this._grid.on("animationstatus", this.onGridHandler, this);
    this._grid.createGrid(GameProperty.colums, GameProperty.row);
    this.updateCurrentSequence();
  }

  private onGridHandler(index: number[], button: SimpleButton2D): void {
    console.log("ongrid");
    this.getMatches();
    // if (this._clusters.length > 0) {
    //   const matchIndex = this._clusters.filter((e) => {
    //     if (e.column == index[1] && e.row == index[0]) return e;
    //   });

    //   if (matchIndex[0] && matchIndex[0].length > 0) {
    //     for (let i = 0; i < matchIndex[0].length; i++) {
    //       if (matchIndex[0].horizontal) {
    //         this._grid.matchAnimation(index[0], index[1] + i);
    //       } else {
    //         this._grid.matchAnimation(index[0] + i, index[1]);
    //       }
    //     }
    //this.updateCurrentSequence();
    //} else {
    //  this._grid.rotateAnimation(button);
    //}
    // }
  }

  private updateCurrentSequence(): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this._currentSequence[i][j] = this._grid.symbol[j][i].type;
      }
    }
  }

  private getMatches() {}
}
