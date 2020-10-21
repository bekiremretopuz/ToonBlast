import {Text } from "pixi.js";
import { SimpleSprite2D } from "app/Display/SimpleSprite2D";
import { SimpleButton2D } from "app/Display/SimpleButton2D";
import {DefaultTextStyle} from "../Helper/GameSettings"
export class UserInterface extends PIXI.Container { 
  private _backgroundImage: SimpleSprite2D;
  private _moveText: Text;
  private _goalDesc: Text[]=[];
  private _goalImage: SimpleSprite2D[]=[];
  private _btn: SimpleButton2D;
  constructor() {
    super();
    this.awake();
  }

  private awake(): void {
    //Background Image.
    this._backgroundImage = new SimpleSprite2D("background", { x: 0, y: 0 });
    this._backgroundImage.name = "BackgroundImage";
    this.addChild(this._backgroundImage);
    //Hud Control 
    // this._btn = new SimpleButton2D("solid1", { x: 90, y: 650 }, this.onButtonUp.bind(this), "UI1");
    // this._btn.anchor.set(0.5, 0.5);
    // this.addChild(this._btn);
    //Move Text
    this._moveText = new PIXI.Text("27", DefaultTextStyle);
    this._moveText.position.set(620, 80);
    this.addChild(this._moveText);
    for(let i=0;i<3;i++){
      //Goal Image
      this._goalImage[i] = new SimpleSprite2D("solid1_normal", { x: 307+ (i*85), y: 60 }); 
      this._goalImage[i].scale.set(.6)
      this.addChild(this._goalImage[i]);
      //Goal Text
      this._goalDesc[i] = new PIXI.Text("", DefaultTextStyle)
      this._goalDesc[i].position.set(65+ (i*5),100);
      this._goalDesc[i].scale.set(.9);
      this._goalImage[i].addChild(this._goalDesc[i]);
    }
    this.setGoal(["solid1_normal","solid2_normal","solid3_normal"], [5, 10, 16])
  }

  public setGoal(solid:string[], count:number[]): void{
    this.clearGoalProp();
    for(let i=0;i<solid.length;i++){
      this._goalImage[i].texture = PIXI.Texture.from(solid[i])
      this._goalDesc[i].text = count[i].toString()
    }
  }

  private clearGoalProp(): void{
    for(let i=0;i<this._goalImage.length;i++){
      this._goalImage[i].texture = (PIXI.Texture.WHITE)
    }
    for(let i=0;i<this._goalDesc.length;i++){
      this._goalDesc[i].text = ""
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
