import { UserInterface } from "app/Components/UserInterface";
export class UserInterfaceController extends PIXI.Container {
  private _userInterface: UserInterface;
  constructor() {
    super();
    this.awake();
  }

  private awake(): void {
    this._userInterface = new UserInterface();
    this._userInterface.on("actiontaken", this.onInterfaceHandler, this);
    this.addChild(this._userInterface);
  }

  private onInterfaceHandler(action: string, type: string): void {
    this.emit("actiontaken", action);
  }
}
