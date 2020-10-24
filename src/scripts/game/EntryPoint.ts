import { DisplayController } from "../core/Controller/DisplayController";
import { StorageController } from "../core/Controller/StorageController";
import { StageController } from "../core/Controller/StageController";
import { LoaderStage } from "./View/LoaderStage";
import SoundController from "../core/Controller/SoundController";
import { ResourceController } from "../core/Controller/ResourceController";
export module EmreBase {
  export class EntryPoint {
    private static _instance: EntryPoint;
    private _displayManager: DisplayController;
    private _stageManager: StageController;
    private _localStorage: StorageController;
    private _resourceController: ResourceController;
    private _loader: LoaderStage;
    constructor() {
      EntryPoint._instance = this;
      this._stageManager = new StageController();
      this._displayManager = new DisplayController(this._stageManager.root);
      this._displayManager.create();
      this._localStorage = new StorageController();
      this._resourceController = new ResourceController();
      this._resourceController.once("completeLoadFont", () => {
        this._resourceController.loadAssets();
        this._resourceController.once("completeLoadHighAsset", () => {
          this._loader = new LoaderStage();
          this._stageManager.createScene("LoaderStage", this._loader);
          this._stageManager.goToScene("LoaderStage", true);
          this._resourceController.on("progress", (value: number) => {
            this._loader.progressUpdate(value);
          });
          this._resourceController.once("completeLoadNormalAsset", () => {
            this._loader.clickAndStartGame();
          });
        
        });
      });
      this._resourceController.init();
    }

    public get localStorage(): StorageController {
      return this._localStorage;
    }

    public get sound(): SoundController {
      return this._resourceController.soundManager;
    }

    public get resource(): any {
      return this._resourceController.loader;
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
