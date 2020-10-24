import { UserInterface } from "src/scripts/game/Components/UserInterface";
export class UserInterfaceController extends PIXI.Container {
  private _userInterface: UserInterface;
  private _moves: number;
  private _goal: { symbol: string; count: number }[] = [];
  constructor(private gameSettings: any) {
    super();
    this.awake();
  }

  private awake(): void {
    this._userInterface = new UserInterface();
    this._userInterface.on("actiontaken", this.onInterfaceHandler, this);
    this.setGoals(this.gameSettings.Levels[0].goal);
    this.setMoves(this.gameSettings.Levels[0].moves);
    this.addChild(this._userInterface);
  }

  private onInterfaceHandler(action: string): void {
    this.emit("actiontaken", action);
  }

  public setMoves(value: number): void {
    this._userInterface.setMoves(value);
    this._moves = value;
  }

  public decreaseMoves(): void {
    this._moves--;
    this._userInterface.setMoves(this._moves);
  }

  public setGoals(value: { symbol: string; count: number }[]): void {
    this._userInterface.setGoal(value);
    this._goal = value;
  }

  public updateGoals(symbol: string, count: number): void {
    for (let i = 0, iLen = this._goal.length; i < iLen; i++) {
      if (this._goal[i].symbol == symbol) {
        this._goal[i].count = count;
      }
    }
    this._userInterface.setGoal(this._goal);
  }
}
