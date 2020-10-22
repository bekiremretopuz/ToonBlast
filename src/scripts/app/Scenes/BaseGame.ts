import { Scene } from "app/Helper/StageManager";
import { AnimationsController } from "app/Controller/AnimationsController";
import { UserInterfaceController } from "app/Controller/UserInterfaceController";
import { EmreBase } from "app/EntryPoint";
import { GridController } from "app/Controller/GridController";
import { Grid } from "app/Components/Grid";
export class BaseGame extends Scene {
  private _game: EmreBase.EntryPoint;
  private _animationController: AnimationsController;
  private _userInterfaceController: UserInterfaceController;
  private _gridController: GridController;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance; 
  } 

  public awake(): void {
    //Interface control initiliaze
    this._userInterfaceController = new UserInterfaceController();
    this.addChild(this._userInterfaceController);
    //Animation control initiliaze
    this._animationController = new AnimationsController();
    this.addChild(this._animationController);
    //Grid initiliaze
    this._gridController = new GridController();
    this.addChild(this._gridController);;
    //Theme music play.
    this._game.sound.play("theme", 1, true);
    //Listen to event.
    this.eventListener();
  }

  private eventListener(): void {
    this._userInterfaceController.on(
      "actiontaken",
      this.onControlEventHandler,
      this
    );
  }

  //UserInterfaceControl Event Handler.
  private onControlEventHandler(action: string, value: string): void {
    switch (action) {
      case "UI1":
        this._game.sound.play("click", 1, false);
        break;
      case "UI2":
        this._game.sound.play("click", 1, false);
        break;
    }
  }

  public killScene(): void {
    //Destroy scene.
  }
}
