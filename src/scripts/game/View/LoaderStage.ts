import { ResourceController } from "src/scripts/core/Controller/ResourceController";
import { Scene } from "src/scripts/core/Controller/StageController";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { BaseGame } from "./BaseGame";

export class LoaderStage extends Scene {
  //If a class is taken extends from the Scene, that class has to contain two functions.(awake, killScene)
  private _backgroundImageDefault: PIXI.Graphics;
  private _assetLoader: ResourceController; // Asset loader utils.
  private _loadingSprite: PIXI.Sprite;
  private _loadingProgressText: PIXI.Text;
  private _game: EmreBase.EntryPoint;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public awake(): void {
    //Green Background Image.
    this._backgroundImageDefault = new PIXI.Graphics()
      .beginFill(0x35a30e, 1)
      .drawRect(0, 0, 1280, 720)
      .endFill();
    this._backgroundImageDefault.name = "BackgroundImageDef";
    this.addChild(this._backgroundImageDefault);
    //Circle loading Sprite
    this._loadingSprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this._loadingSprite.position.set(640, 384);
    this._loadingSprite.anchor.set(0.5, 0.5);
    this._loadingSprite.name = "LoadingSprite";
    this.addChild(this._loadingSprite);
    //Find the status of the asset installation
    this._loadingProgressText = new PIXI.Text("Loader Stage\nLoading..", {});
    this._loadingProgressText.anchor.set(0.5, 0.5);
    this._loadingProgressText.position.set(640, 378);
    this._loadingProgressText.visible = true;
    this.addChild(this._loadingProgressText);
    this._assetLoader = new ResourceController();
    this._assetLoader.on("completeLoadHighAsset", this.loadingAnimation, this);
    this._assetLoader.on("completeLoadAsset", this.completeLoadAsset, this);
    //Init localStorage set default.
    this._game.localStorage.setItem("default", false);
  }

  private completeLoadAsset(): void {
    //When the assets have finished loading, the game scene opens.
    this._game.stageManager.createScene("BaseGame", new BaseGame());
    this._game.stageManager.goToScene("BaseGame", true);
  }

  private loadingAnimation(): void {
    //The animation starts after the installation of the high important assets for the opening of the game is finished.
    // this._loadingSprite.texture = PIXI.Texture.from("loading");
    // const loadingAnimation: TweenMax = TweenMax.to(this._loadingSprite, 90, {
    //     rotation: 360, yoyo: true, ease: Power0.easeNone, repeat: -1,
    //     onUpdate:()=>{
    //         this._loadingProgressText.text ="Loader Stage\nLoading..\n      " + this._assetLoader.loadingProgress.toFixed(0);
    //     }
    // });
  }

  public get assetsLoader(): ResourceController {
    return this._assetLoader;
  }

  public killScene(): void {}
}
