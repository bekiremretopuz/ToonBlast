import { AnimationsController } from "src/scripts/game/Controller/AnimationsController";
import { UserInterfaceController } from "src/scripts/game/Controller/UserInterfaceController";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { GridController } from "src/scripts/game/Controller/GridController";
import { Scene } from "src/scripts/core/Controller/StageController";
import { BoyAnimations } from "app/Components/Animations";
export class BaseGame extends Scene {
  private _game: EmreBase.EntryPoint;
  private _animationController: AnimationsController;
  private _uiController: UserInterfaceController;
  private _gridController: GridController;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public awake(): void {
    //Interface control initiliaze
    this._uiController = new UserInterfaceController();
    this.addChild(this._uiController);
    //Animation control initiliaze
    this._animationController = new AnimationsController();
    this.addChild(this._animationController);
    //Grid initiliaze
    this._gridController = new GridController();
    this.addChild(this._gridController);
    //Theme music play.
    this._game.sound.play("theme", 1, true);
    //Listen to event.
    this.eventListener();
  }

  private eventListener(): void {
    this._uiController.on("actiontaken", this.onControlEventHandler, this);
    this._gridController.on("animationstatus", this.onGridEventHandler, this);
  }

  //UserInterfaceControl Event Handler.
  private onControlEventHandler(action: string, value: string): void {
    switch (action) {
      case "bla":
        this._game.sound.play("collect", 1, false);
        break;
      case "bla":
        this._game.sound.play("collect", 1, false);
        break;
    }
  }

  private onGridEventHandler(action: string): void {
    switch (action) {
      case "match":
        this._animationController.setCharacterAnimation(BoyAnimations.Jump);
        this._game.sound.play("explode", 1, true);
        break;
    }
  }

  public killScene(): void {
    //Destroy scene.
  }
}
