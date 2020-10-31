import { Bounce, Sine, TweenLite } from "gsap";
import { SimpleButton2D } from "src/scripts/core/Parts/SimpleButton2D";
export class GameResultPopup extends PIXI.Container {
  private _resultContainer: PIXI.Container;
  private _resultText: PIXI.Text;
  private _restartButton: SimpleButton2D;
  constructor() {
    super();
    this.interactive = true;
    this.awake();
  }

  private awake(): void {
    this._resultContainer = new PIXI.Container();
    this._resultContainer.visible = false;
    this.addChild(this._resultContainer);
    const resultPopup = new PIXI.Graphics().beginFill(0xcecece, 0.9).drawRect(375, 683, 650, 500).endFill();
    resultPopup.pivot.set(resultPopup.width / 2, resultPopup.height / 2);
    this._resultContainer.addChild(resultPopup);
    this._resultText = new PIXI.Text("", {
      fontFamily: "Topaz-8-remake",
      fontSize: 50,
      fill: "#1f140a",
      align: "center",
      stroke: "#cecece",
      strokeThickness: 3,
    });
    this._resultText.position.set(550, 745);
    resultPopup.addChild(this._resultText);
    this._restartButton = new SimpleButton2D("restart", { x: 605, y: 860 }, () => {
      this.emit("actiontaken", "restartGame");
    });
    this._restartButton.scale.set(0.4);
    this._restartButton.setDisabled();
    resultPopup.addChild(this._restartButton);
  }

  public showResult(isWin: boolean): void {
    this._resultContainer.position.y = -960;
    this._resultContainer.visible = true;
    switch (isWin) {
      case true:
        this._resultText.text = "You Win";
        break;
      case false:
        this._resultText.text = "You Lose";
        break;
    }
    TweenLite.to(this._resultContainer.position, 1.5, {
      y: 0,
      delay: 0.75,
      ease: Bounce.easeOut,
      onComplete: () => {
        this._restartButton.setEnabled();
      },
    });
  }

  public hideResult(): void {
    TweenLite.to(this._resultContainer.position, 0.75, {
      y: -960,
      ease: Sine.easeOut,
      onComplete: () => {
        this.interactive = false;
        this._restartButton.setDisabled();
      },
    });
  }
}
