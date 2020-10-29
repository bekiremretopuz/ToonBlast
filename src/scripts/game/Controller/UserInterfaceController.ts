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
    const goals = [...this.gameSettings.Levels[this.level].goal];
    this.setGoals(goals);
    this.setMoves(this.gameSettings.Levels[this.level].moves);
    this.addChild(this._userInterface);
  }

  private onInterfaceHandler(action: string): void {
    this.emit("actiontaken", action);
  }

  public restartSetInterface(level: number): void {
    this._currentLevel = level;
    const goals = [...this.gameSettings.Levels[this._currentLevel].goal];
    this.setGoals(goals);
    this.setMoves(this.gameSettings.Levels[this.level].moves);
  }

  public setMoves(value: number): void {
    this._userInterface.setMoves(value);
    this._moves = value;
  }

  public decreaseMoves(): void {
    this._moves --;
    this._userInterface.setMoves(this._moves);
    if (this._moves == 0 && this.isSuccesLevel() == false) {
      this.emit("actiontaken", "gameover");
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

  public setGoals(value: { symbol: string; count: number }[]): void {
    this._userInterface.setGoal(value);
    this._goal = value;
  }

  public updateGoals(symbol: string ,count: number): void {
    for (let i = 0, iLen = this._goal.length; i < iLen; i++) {
      if (this._goal[i].symbol == symbol) {
        if (this._goal[i].count != 0) this._goal[i].count-=count;
      }
    }
    this._userInterface.setGoal(this._goal);
    if (this.isSuccesLevel() == true) {
      this.emit("actiontaken", "gamewin");
    }
  }
}
