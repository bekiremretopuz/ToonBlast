import { Power0, TweenMax } from "gsap";
import { Scene } from "src/scripts/core/Controller/StageController";
import { DefaultTextStyle } from "src/scripts/core/GameSettings";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { BaseGame } from "./BaseGame";

export class LoaderStage extends Scene {
  //If a class is taken extends from the Scene, that class has to contain two functions.(awake, killScene)
  private _backgroundImageDefault: PIXI.Graphics;
  private _gameName: PIXI.Text;
  private _loadingSprite: PIXI.Sprite;
  private _loadingProgressText: PIXI.Text;
  private _game: EmreBase.EntryPoint;
  private _startGameText: PIXI.Text;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public awake(): void {
    //Green Background Image.
    this._backgroundImageDefault = new PIXI.Graphics()
      .beginFill(0x01c6b2, 1)
      .drawRect(0, 0, 740, 1334)
      .endFill();
    this._backgroundImageDefault.name = "BackgroundImageDef";
    this.addChild(this._backgroundImageDefault);
    //Game name
    this._gameName = new PIXI.Text("TOON BLAST", DefaultTextStyle);
    this._gameName.anchor.set(0.5, 0.5);
    this._gameName.scale.set(1.5, 1.5);
    this._gameName.position.set(390, 200);
    this.addChild(this._gameName);
    //Circle loading Sprite
    this._loadingSprite = new PIXI.Sprite(PIXI.Texture.from("loading"));
    this._loadingSprite.anchor.set(0.5, 0.5);
    this._loadingSprite.position.set(390, 640);
    this._loadingSprite.anchor.set(0.5, 0.5);
    this._loadingSprite.name = "LoadingSprite";
    this.addChild(this._loadingSprite);
    //Find the status of the asset installation
    this._loadingProgressText = new PIXI.Text("", {});
    this._loadingProgressText.anchor.set(0.5, 0.5);
    this._loadingProgressText.position.set(390, 640);
    this._loadingProgressText.visible = true;
    this.addChild(this._loadingProgressText);
    this.loadingAnimation();
  }

  private loadingAnimation(): void {
    TweenMax.to(this._loadingSprite, 90, {
      rotation: 360,
      yoyo: true,
      ease: Power0.easeNone,
      repeat: -1,
      onUpdate: () => {},
    });
  }

  public clickAndStartGame(): void {
    this._startGameText = new PIXI.Text(
      "TAP ANYWHERE TO START",
      DefaultTextStyle
    );
    this._startGameText.anchor.set(0.5, 0.5);
    this._startGameText.scale.set(0.9, 0.9);
    this._startGameText.position.set(390, 1150);
    this.addChild(this._startGameText);
    this._backgroundImageDefault.buttonMode = true;
    this._backgroundImageDefault.interactive = true;
    this._backgroundImageDefault.once("pointerdown", () => {
      this._game.stageManager.createScene("BaseGame", new BaseGame());
      this._game.stageManager.goToScene("BaseGame", true);
    });
  }

  public progressUpdate(value: number): void {
    this._loadingProgressText.text =
      "Loader Stage\n    Loading\n       " + value.toFixed(0);
  }

  public killScene(): void {}
}
