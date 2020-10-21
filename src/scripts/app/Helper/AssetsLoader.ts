import { Asset, AssetPriority, LoadAsset, PixiAssetsLoader, SoundAsset } from "pixi-assets-loader";
import SoundManager from "./SoundManager";
import { EmreBase } from "app/EntryPoint";
export class AssetsLoader extends PIXI.utils.EventEmitter {
    private _loader: PixiAssetsLoader;
    private _assetsCount: { [key: number]: { total: number, progress: number } } = {};
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
        this.isSoundLoaded = false;
        this._soundManager.on("sound", this.onSoundManager, this);
        this.loadAssets();
    }

    private onSoundManager(value: string): void {
        switch (value) {
            case "createAllSound":
                this.isSoundLoaded = true;
                this.onAllAssetsLoaded();
                break;
        }
    }

    private loadAssets(): void {
        const assets = [
            { id: "spine", url: "assets/gfx/animation/spineboy.json", priority: AssetPriority.HIGHEST, type: "animation" },
           // { id: "Topaz-8-remake", url: "assets/fonts/stylesheet.css", priority: AssetPriority.HIGHEST, type: "fonts" },
            { id: "background", url: "assets/gfx/background.jpg", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid1_normal", url: "assets/gfx/ui/solidColor1.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid1_down", url: "assets/gfx/ui/solidColor1.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid1_over", url: "assets/gfx/ui/solidColor1.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid1_disabled", url: "assets/gfx/ui/solidColor1.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid2_normal", url: "assets/gfx/ui/solidColor2.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid2_down", url: "assets/gfx/ui/solidColor2.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid2_over", url: "assets/gfx/ui/solidColor2.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid2_disabled", url: "assets/gfx/ui/solidColor2.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid3_normal", url: "assets/gfx/ui/solidColor3.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid3_down", url: "assets/gfx/ui/solidColor3.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid3_over", url: "assets/gfx/ui/solidColor3.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid3_disabled", url: "assets/gfx/ui/solidColor3.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid4_normal", url: "assets/gfx/ui/solidColor4.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid4_down", url: "assets/gfx/ui/solidColor4.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid4_over", url: "assets/gfx/ui/solidColor4.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solid4_disabled", url: "assets/gfx/ui/solidColor4.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solidParticle1", url: "assets/gfx/animation/solidColorParticle1.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "solidParticle2", url: "assets/gfx/animation/solidColorParticle2.png", priority: AssetPriority.HIGHEST, type: "texture" },
            { id: "collect", url: "assets/sfx/cube_collect.wav", priority: AssetPriority.LOWEST, autoplay: false, loop: false, mute: false, rate: 1, type: "sound" } as Asset,
            { id: "explode", url: "assets/sfx/cube_explode.wav", priority: AssetPriority.LOWEST, autoplay: false, loop: false, mute: false, rate: 1, type: "sound" } as Asset,
        ];

        assets.forEach(asset => {
            if (!this._assetsCount[asset.priority]) {
                this._assetsCount[asset.priority] = { total: 1, progress: 0 };
            } else {
                this._assetsCount[asset.priority].total++;
            }
            if (asset.type == "sound")
                this._soundCount++;
        });

        this._loadingProgress = 0;
        this._totalAssets = assets.length;

        this._loader = new PixiAssetsLoader();
        this._loader.on(PixiAssetsLoader.PRIORITY_GROUP_LOADED, this.onAssetsLoaded.bind(this));
        this._loader.on(PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, this.onAssetsProgress.bind(this));
        this._loader.on(PixiAssetsLoader.ASSET_ERROR, this.onAssetsError.bind(this));
        this._loader.on(PixiAssetsLoader.ALL_ASSETS_LOADED, this.onAllAssetsLoaded.bind(this));
        this._loader.addAssets(assets).load();
    }
    private onAssetsProgress(args: { priority: number, progress: number }): void {
        const percentFactor = this._assetsCount[args.priority].total / this._totalAssets;
        this._loadingProgress += (args.progress - this._assetsCount[args.priority].progress) * percentFactor;
        this._assetsCount[args.priority].progress = args.progress;
    }

    private onAssetsError(args: LoadAsset): void {
        this.emit("assetLoadfailed");
    }

    private onAllAssetsLoaded(): void {
        if (this._doubleCheck == false) {
            if (this.isSoundLoaded) {
                this._doubleCheck = true;
                    WebFont.load({
                        custom: {
                            families: ['Topaz-8-remake'],
                            urls: ['assets/fonts/stylesheet.css']
                        },
                        active: (familyName: any, fwd: any) => { 
                            this.emit("completeLoadAsset");
                       }
                    });
            }
        }
    }

    private onAssetsLoaded(args: { priority: number, assets: LoadAsset[] }): void {
        args.assets.forEach(loadAsset => {
            if (loadAsset.asset.type == "sound") {
                this._soundManager.addSound(loadAsset, this._soundCount);
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
        return this._loader
    }

    public set isSoundLoaded(value: boolean) {
        this._isSoundLoaded = value;
    }

    public get loadingProgress(): number {
        return this._loadingProgress;
    }
}
