import { Text } from "pixi.js";
import { SimpleSprite2D } from "src/scripts/core/Parts/SimpleSprite2D";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
import { DefaultTextStyle } from "app/Helper/GameSettings";
export class UserInterface extends PIXI.Container {
  private _backgroundImage: SimpleSprite2D;
  private _moveText: Text;
  private _goalCount: Text[] = [];
  private _goalImage: SimpleSprite2D[] = [];
  constructor() {
    super();
    this.awake();
  }

  private awake(): void {
    //Background Image.
    this._backgroundImage = new SimpleSprite2D("background", { x: 0, y: 0 });
    this._backgroundImage.name = "BackgroundImage";
    this.addChild(this._backgroundImage);
    //Move Text
    this._moveText = new PIXI.Text("27", DefaultTextStyle);
    this._moveText.position.set(620, 80);
    this.addChild(this._moveText);
    for (let i = 0; i < 3; i++) {
      //Goal Image
      this._goalImage[i] = new SimpleSprite2D("solid1_normal", {
        x: 307 + i * 85,
        y: 60,
      });
      this._goalImage[i].scale.set(0.6);
      this.addChild(this._goalImage[i]);
      //Goal Text
      this._goalCount[i] = new PIXI.Text("", DefaultTextStyle);
      this._goalCount[i].position.set(68 + i * 5, 105);
      this._goalCount[i].scale.set(0.9);
      this._goalImage[i].addChild(this._goalCount[i]);
    }
  }

  public setGoal(value: { symbol: string; count: number }[]): void {
    //this.clearGoalProp();
    for (let i = 0; i < value.length; i++) {
      this._goalImage[i].texture = PIXI.Texture.from(
        value[i].symbol + "_normal"
      );
      this._goalCount[i].text = value[i].count.toString();
    }
  }

  public setMoves(value: number): void {
    this._moveText.text = value.toString();
  }

  private clearGoalProp(): void {
    for (let i = 0; i < this._goalImage.length; i++) {
      this._goalImage[i].texture = PIXI.Texture.WHITE;
    }
    for (let i = 0; i < this._goalCount.length; i++) {
      this._goalCount[i].text = "";
    }
  }
  //Button OnClick
  private onButtonUp(name: string): void {
    switch (name) {
      case "start":
        this.emit("actiontaken", "Start");
        break;
    }
  }
}
