export abstract class Scene extends PIXI.Container {
  public abstract awake(...args: any[]): void;
  public abstract killScene(...args: any[]): void;
}
export class StageManager extends PIXI.utils.EventEmitter {
  private _rootContainer: PIXI.Container = new PIXI.Container();
  private _scenes: any = {};
  private _currentStage: Scene;
  private _gameMask: PIXI.Graphics;
  constructor() {
    super();
    this._gameMask = new PIXI.Graphics()
      .beginFill(0x000000, 0)
      .drawRect(0, 0, 750, 1334)
      .endFill();
    this._gameMask.name = "GameMask";
    this._rootContainer = new PIXI.Container();
    this._rootContainer.name = "RootContainer";
    this._rootContainer.addChild(this._gameMask);
    this._rootContainer.mask = this._gameMask;
  }

  public createScene(id: string, TScene: Scene): Scene | any {
    if (this._scenes[id]) return undefined;
    var scene = TScene;
    this._scenes[id] = scene;
    this._rootContainer.addChild(this._scenes[id]);
    return scene;
  }

  public goToScene(id: string, reset: boolean): boolean {
    //Using reset = true
    if (this._scenes[id]) {
      if (this._currentStage) {
        if (reset) {
          this._currentStage.removeChildren();
        } else {
          this._currentStage.visible = false;
          this._scenes[id].visible = true;
        }
        this._currentStage.killScene();
      }
      this._currentStage = this._scenes[id];
      this._currentStage.awake();
      return true;
    }
    return false;
  }
  //GETTER AND SETTER
  public get scenes(): any {
    return this._scenes;
  }

  public get root(): PIXI.Container {
    return this._rootContainer;
  }
}
