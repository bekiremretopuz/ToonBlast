import {
  Asset,
  AssetPriority,
  LoadAsset,
  PixiAssetsLoader,
  SoundAsset,
} from "pixi-assets-loader";
import SoundManager from "./SoundController";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { assets } from "../GameSettings";
export class ResourceController extends PIXI.utils.EventEmitter {
  private _loader: PixiAssetsLoader;
  private _assetsCount: {
    [key: number]: { total: number; progress: number };
  } = {};
  private _totalAssets: number;
  private _loadingProgress: number;
  private _soundManager: SoundManager = new SoundManager();
  private _isSoundLoaded: boolean;
  private _soundCount: number = 0;
  private _doubleCheck: boolean = false;
  private _game: EmreBase.EntryPoint;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public init(): void {
    this.loadFont();
    this.isSoundLoaded = false;
    this._soundManager.on("sound", this.onSoundManager, this);
  }

  private loadFont(): void {
    WebFont.load({
      custom: {
        families: ["Topaz-8-remake"],
        urls: ["assets/fonts/stylesheet.css"],
      },
      active: (familyName: any, fwd: any) => {
        this.emit("completeLoadFont");
      },
    });
  }

  private onSoundManager(value: string): void {
    switch (value) {
      case "createAllSound":
        console.log("createAllsound");
        
        //    this.emit("completeLoadAsset");
        break;
    }
  }

  public loadAssets(): void {
    assets.forEach((asset) => {
      if (!this._assetsCount[asset.priority]) {
        this._assetsCount[asset.priority] = { total: 1, progress: 0 };
      } else {
        this._assetsCount[asset.priority].total++;
      }
      if (asset.type == "sound") this._soundCount++;
    });

    this._loadingProgress = 0;
    this._totalAssets = assets.length;
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
    this._loader.addAssets(assets).load();
  }
  private onAssetsProgress(args: { priority: number; progress: number }): void {
    const percentFactor =
      this._assetsCount[args.priority].total / this._totalAssets;
    this._loadingProgress +=
      (args.progress - this._assetsCount[args.priority].progress) *
      percentFactor;
    this._assetsCount[args.priority].progress = args.progress;
    this.emit("progress", this._loadingProgress);
  }

  private onAssetsError(args: LoadAsset): void {
    this.emit("assetLoadfailed");
  } 

  private onAssetsLoaded(args: {
    priority: number;
    assets: LoadAsset[];
  }): void {
    args.assets.forEach((loadAsset) => {
      if (loadAsset.asset.type == "sound") {
        this._soundManager.addSound(loadAsset);
      }
    });
    this.createViewsByPriority(args.priority);
  }

  private createViewsByPriority(priority: number): void {
    console.log("prio", priority);
    
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
