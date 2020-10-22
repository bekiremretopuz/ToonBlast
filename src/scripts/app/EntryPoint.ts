import { LoaderStage } from "./Scenes/LoaderStage";
import { LocalStorage } from "./Helper/LocalStorage";
import { StageManager } from "./Helper/StageManager";
import SoundManager from "./Helper/SoundManager";
import { DisplayManager } from "./Helper/DisplayManager";
export module EmreBase {
  export class EntryPoint {
    private static _instance: EntryPoint;
    private _displayManager: DisplayManager;
    private _stageManager: StageManager;
    private _localStorage: LocalStorage;
    private _loader: LoaderStage;
    constructor() {
      EntryPoint._instance = this;
      this._stageManager = new StageManager();
      this._displayManager = new DisplayManager(this._stageManager.root);
      this._localStorage = new LocalStorage();
      this._loader = new LoaderStage();
      this._displayManager.create();
      this._stageManager.createScene("LoaderStage", this._loader);
      this._stageManager.goToScene("LoaderStage", true);
    }

    public get localStorage(): LocalStorage {
      return this._localStorage;
    }

    public get sound(): SoundManager {
      return this._loader.assetsLoader.soundManager;
    }

    public get resource(): any {
      return this._loader.assetsLoader.loader;
    }

    public get stageManager(): StageManager {
      return this._stageManager;
    }

    public get displayManager(): DisplayManager {
      return this._displayManager;
    }

    public static get instance(): EntryPoint {
      return EntryPoint._instance;
    }
  }
}
