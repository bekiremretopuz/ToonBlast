import { Utils } from "src/scripts/core/Helper/Utils";
import { UserInterface } from "src/scripts/game/Components/UserInterface";
export class UserInterfaceController extends PIXI.Container {
  private _userInterface: UserInterface;
  private _moves: number;
  private _goal: { symbol: string; count: number }[] = [];
  private _currentLevel: number;
  constructor(private gameSettings: any, private readonly level: number) {
    super();
    this._currentLevel = level;
    this.awake();
  }

  private awake(): void {
    this._userInterface = new UserInterface();
    this._userInterface.on("actiontaken", this.onInterfaceHandler, this);
    this._goal = Utils.deepCopyFunction(
      this.gameSettings.Levels[this._currentLevel].goal
    );
    this.setGoals(this._goal);
    this.setMoves(this.gameSettings.Levels[this._currentLevel].moves);
    this.addChild(this._userInterface);
  }

  private onInterfaceHandler(action: string): void {
    this.emit("actiontaken", action);
  }

  private setMoves(value: number): void {
    this._userInterface.setMoves(value);
    this._moves = value;
  }

  private setGoals(value: { symbol: string; count: number }[]): void {
    this._userInterface.setGoal(value);
    this._goal = value;
  }

  public decreaseMoves(): void {
    this._moves--;
    this._userInterface.setMoves(this._moves);
    if (this._moves == 0 && this.isSuccesLevel() == false) {
      this.emit("actiontaken", "gameover");
    }
  }

  public updateGoals(symbol: string, count: number): void {
    for (let i = 0, iLen = this._goal.length; i < iLen; i++) {
      if (this._goal[i].symbol == symbol) {
        if (this._goal[i].count != 0)
          if (this._goal[i].count - count >= 0) {
            this._goal[i].count -= count;
          } else this._goal[i].count = 0;
      }
    }
    this._userInterface.setGoal(this._goal);
    if (this.isSuccesLevel() == true) {
      this.emit("actiontaken", "gamewin");
    }
  }

  private isSuccesLevel(): boolean {
    if (this._moves >= 0) {
      let count = 0;
      for (var i = 0; i < this._goal.length; i++) {
        if (this._goal[i].count == 0) count++;
      }
      if (this._goal.length == count) return true;
      else return false;
    } else return false;
  }

  public restartSetInterface(level: number): void {
    this._currentLevel = level;
    this._goal = Utils.deepCopyFunction(
      this.gameSettings.Levels[this._currentLevel].goal
    );
    this.setGoals(this._goal);
    this.setMoves(this.gameSettings.Levels[this._currentLevel].moves);
  }

  public get currentGoal(): { symbol: string; count: number }[] {
    return Utils.deepCopyFunction(
      this.gameSettings.Levels[this._currentLevel].goal
    );
  }
}
