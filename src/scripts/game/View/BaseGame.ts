import { AnimationsController } from "src/scripts/game/Controller/AnimationsController";
import { UserInterfaceController } from "src/scripts/game/Controller/UserInterfaceController";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { GridController } from "src/scripts/game/Controller/GridController";
import { Scene } from "src/scripts/core/Controller/StageController";
import { BoyAnimations } from "app/Components/Animations";
import { GameResultPopup } from "app/Components/GameResultPopup";
import { Data } from "app/Model/Data";
export class BaseGame extends Scene {
  private _game: EmreBase.EntryPoint;
  private _dataController: Data;
  private _animationController: AnimationsController;
  private _uiController: UserInterfaceController;
  private _gridController: GridController;
  private _gameResult: GameResultPopup;
  constructor(private readonly gameSettings: any) {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public awake(): void {
    //Data controller initiliaze
    this._dataController = new Data(this._game);
    //Interface control initiliaze
    this._uiController = new UserInterfaceController(this.gameSettings, this._dataController.getLevel);
    this.addChild(this._uiController);
    //Animation control initiliaze
    this._animationController = new AnimationsController();
    this.addChild(this._animationController);
    //Grid initiliaze
    this._gridController = new GridController(this.gameSettings, this._dataController.getLevel);
    this.addChild(this._gridController);
    //Game result initiliaze
    this._gameResult = new GameResultPopup();
    this.addChild(this._gameResult);
    //Theme music play.
    this._game.sound.play("theme", 0.5, true);
    this._gridController.setCurrentGoal(this._uiController.currentGoal);
    //Listen to event.
    this.eventListener();
  }

  private eventListener(): void {
    this._gridController.on("animationstatus", this.onGridEventHandler, this);
    this._uiController.on("actiontaken", this.onControlEventHandler, this);
    this._gameResult.on("actiontaken", this.onGameResultEventHandler, this);
  }

  //UserInterfaceControl Event Handler.
  private onControlEventHandler(action: string, value: string): void {
    switch (action) {
      case "gameover":
        this._gridController.setInteractivity(false);
        this._gameResult.showResult(false);
        break;
      case "gamewin":
        this._gridController.setInteractivity(false);
        this._gameResult.showResult(true);
        break;
    }
  }

  private onGameResultEventHandler(action: string, value: string): void {
    switch (action) {
      case "restartGame":
        //next level => static 0
        //read the next level and go to the next level
        //you should add next level details here  assets/settings.json
        const nextLevel = 0;
        this._gameResult.hideResult();
        this._gridController.restartSetGrid(nextLevel);
        this._uiController.restartSetInterface(nextLevel);
        this._gridController.setInteractivity(true);
        break;
    }
  }

  private onGridEventHandler(action: string, symbolType: string, clusterLength: number): void {
    switch (action) {
      case "match":
        this._uiController.decreaseMoves();
        this._animationController.setCharacterAnimation(BoyAnimations.Jump, false);
        this._game.sound.play("explode", 1, false);
        break;
      case "goaltransformcompleted":
        this._game.sound.play("collect", 1, false);
        break;
      case "updategoal":
        this._uiController.updateGoals(symbolType, clusterLength);
        break;
    }
  }

  public killScene(): void {
    //Destroy scene.
  }
}
