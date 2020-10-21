import { Scene } from "app/Helper/StageManager";
import { AnimationsController } from "app/Controller/AnimationsController";
import { UserInterfaceController } from "app/Controller/UserInterfaceController";
import { EmreBase } from "app/EntryPoint";
import { Grid } from "app/Components/Grid";
export class BaseGame extends Scene {
  private _game: EmreBase.EntryPoint;
  private _animationController: AnimationsController;
  private _userInterfaceController: UserInterfaceController;
  private _grid: Grid;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
    this._game.displayManager.on("resize", this.onResize, this);
    this._game.displayManager.on(
      "orientationchange",
      this.onOrientationChanged,
      this
    );
  }

  private onResize(width: number, height: number): void {
    console.log("resize", width, height);
  }

  private onOrientationChanged(orientation: any) {
    console.log("orientation", orientation);
  }

  public awake(): void {
    //Interface control initiliaze
    this._userInterfaceController = new UserInterfaceController();
    this.addChild(this._userInterfaceController);
    //Animation control initiliaze
    this._animationController = new AnimationsController();
    this.addChild(this._animationController);
    //Grid initiliaze
    const seq = [
      [
        "solid1",
        "solid1",
        "solid3",
        "solid1",
        "solid4",
        "solid3",
        "solid2",
        "solid1",
        "solid4",
      ],
      [
        "solid2",
        "solid3",
        "solid2",
        "solid4",
        "solid2",
        "solid1",
        "solid4",
        "solid2",
        "solid2",
      ],
      [
        "solid3",
        "solid2",
        "solid1",
        "solid3",
        "solid3",
        "solid2",
        "solid1",
        "solid4",
        "solid3",
      ],
      [
        "solid1",
        "solid4",
        "solid4",
        "solid2",
        "solid4",
        "solid4",
        "solid2",
        "solid1",
        "solid4",
      ],
      [
        "solid4",
        "solid1",
        "solid1",
        "solid4",
        "solid3",
        "solid1",
        "solid2",
        "solid2",
        "solid1",
      ],
      [
        "solid3",
        "solid3",
        "solid2",
        "solid2",
        "solid1",
        "solid3",
        "solid3",
        "solid3",
        "solid2",
      ],
      [
        "solid2",
        "solid2",
        "solid3",
        "solid1",
        "solid2",
        "solid3",
        "solid4",
        "solid3",
        "solid2",
      ],
      [
        "solid4",
        "solid1",
        "solid3",
        "solid4",
        "solid1",
        "solid4",
        "solid1",
        "solid1",
        "solid3",
      ],
      [
        "solid1",
        "solid4",
        "solid4",
        "solid3",
        "solid2",
        "solid1",
        "solid2",
        "solid2",
        "solid4",
      ],
    ];
    this._grid = new Grid(seq);
    this.addChild(this._grid);
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
