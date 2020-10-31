import { AssetPriority, LoadAsset, PixiAssetsLoader } from "pixi-assets-loader";
import SoundManager from "./SoundController";
import { AssetsList } from "../../game/Helper/GameSettings";
import * as WebFont from "webfontloader";
export class ResourceController extends PIXI.utils.EventEmitter {
  private _loader: PixiAssetsLoader;
  private _assetsCount: {
    [key: number]: {
      total: number;
      progress: number;
    };
  } = {};
  private _totalAssets: number;
  private _loadingProgress: number;
  private _soundManager: SoundManager = new SoundManager();
  private _isSoundLoaded: boolean;
  constructor() {
    super();
  }

  public init(): void {
    this.loadFont();
    this.isSoundLoaded = false;
  }

  private loadFont(): void {
    WebFont.load({
      custom: {
        families: ["Topaz-8-remake"],
        urls: ["assets/fonts/stylesheet.css"],
      },
      active: () => {
        this.emit("completeLoadFont");
      },
    });
  }

  public loadAssets(): void {
    AssetsList.forEach((asset) => {
      if (!this._assetsCount[asset.priority]) {
        this._assetsCount[asset.priority] = {
          total: 1,
          progress: 0,
        };
      } else {
        this._assetsCount[asset.priority].total++;
      }
    });

    this._loadingProgress = 0;
    this._totalAssets = AssetsList.length;
    this._loader = new PixiAssetsLoader();
    this._loader.on(
      PixiAssetsLoader.PRIORITY_GROUP_LOADED,

      this.onAssetsLoaded.bind(this)
    );
    this._loader.on(
      PixiAssetsLoader.PRIORITY_GROUP_PROGRESS,

      this.onAssetsProgress.bind(this)
    );
    this._loader.on(
      PixiAssetsLoader.ASSET_ERROR,

      this.onAssetsError.bind(this)
    );
    this._loader.addAssets(AssetsList).load();
  }
  private onAssetsProgress(args: { priority: number; progress: number }): void {
    const percentFactor = this._assetsCount[args.priority].total / this._totalAssets;
    this._loadingProgress += (args.progress - this._assetsCount[args.priority].progress) * percentFactor;
    this._assetsCount[args.priority].progress = args.progress;
    this.emit("progress", this._loadingProgress);
  }

  private onAssetsError(args: LoadAsset): void {
    this.emit("assetLoadfailed");
  }

  private onAssetsLoaded(args: { priority: number; assets: LoadAsset[] }): void {
    args.assets.forEach((loadAsset) => { 
      if (loadAsset.asset.type == "sound") {
        this._soundManager.addSound(loadAsset);
      }
    });
    this.createViewsByPriority(args.priority);
  }

  private createViewsByPriority(priority: number): void {
    switch (priority) {
      case AssetPriority.HIGHEST:
        this.emit("completeLoadHighAsset");
        break;
      case AssetPriority.NORMAL:
        this.emit("completeLoadNormalAsset");
        break;
      case AssetPriority.LOW:
        this.emit("completeLoadLowAsset");
        break;
    }
  }

  public get soundManager(): SoundManager {
    return this._soundManager;
  }

  public get isSoundLoaded(): boolean {
    return this._isSoundLoaded;
  }

  public get loader(): any {
    return this._loader;
  }

  public set isSoundLoaded(value: boolean) {
    this._isSoundLoaded = value;
  }

  public get loadingProgress(): number {
    return this._loadingProgress;
  }
}
