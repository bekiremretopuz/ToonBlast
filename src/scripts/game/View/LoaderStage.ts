import { Power0, TweenLite, TweenMax } from "gsap";
import { Scene } from "src/scripts/core/Controller/StageController";
import { DefaultTextStyle } from "app/Helper/GameSettings";
import { EmreBase } from "src/scripts/game/EntryPoint";
import { BaseGame } from "./BaseGame";
import { SimpleSprite2D } from "src/scripts/core/Parts/SimpleSprite2D";
export class LoaderStage extends Scene {
  //If a class is taken extends from the Scene, that class has to contain two abstract functions.(awake, killScene)
  private _backgroundImageDefault: PIXI.Graphics;
  private _gameName: PIXI.Text;
  private _loadingSprite: PIXI.Sprite;
  private _loadingProgressText: PIXI.Text;
  private _game: EmreBase.EntryPoint;
  private _startGameText: PIXI.Text;
  private _companyLogo: SimpleSprite2D;
  constructor() {
    super();
    this._game = EmreBase.EntryPoint.instance;
  }

  public awake(): void {
    //Green Background Image.
    this._backgroundImageDefault = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(0, 0, 750, 1334).endFill();
    this._backgroundImageDefault.name = "BackgroundImageDef";
    this.addChild(this._backgroundImageDefault);
    //Game name
    this._gameName = new PIXI.Text("TOON BLAST", DefaultTextStyle);
    this._gameName.anchor.set(0.5, 0.5);
    this._gameName.scale.set(1.5, 1.5);
    this._gameName.position.set(375, 340);
    this.addChild(this._gameName);
    //Company logo
    this._companyLogo = new SimpleSprite2D("company_logo", { x: 0, y: 0 });
    this._companyLogo.scale.set(0.5, 0.5);
    this._companyLogo.position.set(175, 40);
    this.addChild(this._companyLogo);
    //Circle loading Sprite
    this._loadingSprite = new SimpleSprite2D("loading", { x: 375, y: 640 });
    this._loadingSprite.anchor.set(0.5, 0.5);
    this._loadingSprite.scale.set(0.5, 0.5);
    this._loadingSprite.name = "LoadingSprite";
    this.addChild(this._loadingSprite);
    //Find the status of the asset installation
    this._loadingProgressText = new PIXI.Text("", DefaultTextStyle);
    this._loadingProgressText.anchor.set(0.5, 0.5);
    this._loadingProgressText.scale.set(0.75, 0.75);
    this._loadingProgressText.position.set(385, 655);
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
    TweenLite.delayedCall(0.5, () => {
      TweenMax.killTweensOf(this._loadingSprite);
      this._loadingSprite.visible = false;
      this._loadingProgressText.visible = false;
    });
    const text = "TAP ANYWHERE TO START";
    this._startGameText = new PIXI.Text(text, DefaultTextStyle);
    this._startGameText.anchor.set(0.5, 0.5);
    this._startGameText.scale.set(0.9, 0.9);
    this._startGameText.position.set(375, 1150);
    const alphaAnim = TweenMax.to(this._startGameText, 0.75, {
      alpha: 0,
      yoyo: true,
      repeat: -1,
    });
    this.addChild(this._startGameText);
    this._backgroundImageDefault.buttonMode = true;
    this._backgroundImageDefault.interactive = true;
    this._backgroundImageDefault.once("pointerdown", () => {
      fetch("assets/config/settings.json")
        .then((res) => res.json())
        .then((out) => {
          TweenMax.killTweensOf(this._startGameText);
          alphaAnim.kill();
          this._startGameText.visible = false;
          this._game.stageManager.createScene("BaseGame", new BaseGame(out));
          this._game.stageManager.goToScene("BaseGame", true);
        });
    });
  }

  public progressUpdate(value: number): void {
    this._loadingProgressText.text = value.toFixed(0);
  }

  public killScene(): void {}
}
