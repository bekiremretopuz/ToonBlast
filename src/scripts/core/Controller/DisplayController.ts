import {
  Dom,
  PixiAppWrapper as Wrapper,
  pixiAppWrapperEvent as WrapperEvent,
  PixiAppWrapperOptions as WrapperOpts,
} from "pixi-app-wrapper"; 
import * as PIXI from "pixi.js";
export class DisplayController extends PIXI.utils.EventEmitter {
  private _app: Wrapper;
  private _rootContainer: PIXI.Container;
  constructor(rootContainer: PIXI.Container) {
    super();
    this._rootContainer = rootContainer;
  }

  public create() {
    const canvas = Dom.getElementOrCreateNew<HTMLCanvasElement>("app-canvas", "canvas", document.getElementById("app-root"));
    const appOptions: WrapperOpts = {
      width: 750,
      height: 1334,
      scale: "keep-aspect-ratio",
      align: "top-center",
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      roundPixels: true,
      transparent: false,
      backgroundColor: 0x000000,
      view: canvas,
      showFPS: false,
      showMediaInfo: false,
      changeOrientation: false,
    };
    this._app = new Wrapper(appOptions);
    this._app.on(WrapperEvent.RESIZE_END, this.onResizeEnd.bind(this));
    this._rootContainer.name = "RootContainer";
    this._app.stage.addChild(this._rootContainer);
  }

  private onResizeEnd(args: any): void {
    this.emit("resize", args.stage.size.width, args.stage.size.height);
    if (args.stage.orientation.changed) {
      this.emit("orientationchange", args.stage.orientation.landscape);
    }
  }
}
