import { DisplayController } from "../core/Controller/DisplayController";
import { StorageController } from "../core/Controller/StorageController";
import { StageController } from "../core/Controller/StageController";
import { LoaderStage } from "./View/LoaderStage";
import SoundController from "../core/Controller/SoundController";
export module EmreBase {
  export class EntryPoint {
    private static _instance: EntryPoint;
    private _displayManager: DisplayController;
    private _stageManager: StageController;
    private _localStorage: StorageController;
    private _loader: LoaderStage;
    constructor() {
      EntryPoint._instance = this;
      this._stageManager = new StageController();
      this._displayManager = new DisplayController(this._stageManager.root);
      this._localStorage = new StorageController();
      this._loader = new LoaderStage();
      this._displayManager.create();
      this._stageManager.createScene("LoaderStage", this._loader);
      this._stageManager.goToScene("LoaderStage", true);
    }

    public get localStorage(): StorageController {
      return this._localStorage;
    }

    public get sound(): SoundController {
      return this._loader.assetsLoader.soundManager;
    }

    public get resource(): any {
      return this._loader.assetsLoader.loader;
    }

    public get stageManager(): StageController {
      return this._stageManager;
    }

    public get displayManager(): DisplayController {
      return this._displayManager;
    }

    public static get instance(): EntryPoint {
      return EntryPoint._instance;
    }
  }
}
