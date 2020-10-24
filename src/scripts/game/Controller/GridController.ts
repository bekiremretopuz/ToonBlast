import { Grid } from "src/scripts/game/Components/Grid";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { GameProperty, InitialSequence } from "src/scripts/core/GameSettings";
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
    this._currentSequence = InitialSequence;
    this._grid = new Grid(InitialSequence);
    this.addChild(this._grid);
    this._grid.on("animationstatus", this.onGridHandler, this);
    this._grid.createGrid(GameProperty.colums, GameProperty.row);
    this.updateCurrentSequence();
  }

  private onGridHandler(index: number[], button: SimpleButton2D): void {
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

  private getMatches() {
    this._clusters = [];
    for (let j = 0; j < 9; j++) {
      let matchlength = 1;
      for (let i = 0; i < 9; i++) {
        let checkcluster = false;
        if (i == 9 - 1) {
          checkcluster = true;
        } else {
          if (
            this._currentSequence[i][j] == this._currentSequence[i + 1][j] &&
            this._currentSequence[i][j] != ""
          ) {
            matchlength += 1;
          } else {
            checkcluster = true;
          }
        }
        if (checkcluster) {
          if (matchlength >= 2) {
            this._clusters.push({
              column: i + 1 - matchlength,
              row: j,
              length: matchlength,
              horizontal: true,
            });
          }
          matchlength = 1;
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      let matchlength = 1;
      for (let j = 0; j < 9; j++) {
        let checkcluster = false;
        if (j == 9 - 1) {
          checkcluster = true;
        } else {
          if (
            this._currentSequence[i][j] == this._currentSequence[i][j + 1] &&
            this._currentSequence[i][j] != ""
          ) {
            matchlength += 1;
          } else {
            checkcluster = true;
          }
        }
        if (checkcluster) {
          if (matchlength >= 2) {
            this._clusters.push({
              column: i,
              row: j + 1 - matchlength,
              length: matchlength,
              horizontal: false,
            });
          }
          matchlength = 1;
        }
      }
    }
    console.log("sonuc", this._clusters);
  }
}
