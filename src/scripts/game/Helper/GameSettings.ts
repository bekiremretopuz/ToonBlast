import { Asset, AssetPriority } from "vendor/dacaher/pixi-assets-loader";

export const DefaultTextStyle = {
  fontFamily: "Topaz-8-remake",
  fontSize: 42,
  fill: "#1f140a",
  align: "center",
  stroke: "#cecece",
  strokeThickness: 3,
};

export const AssetsList = [
  {
    id: "loading",
    url: "assets/gfx/ui/loading.png",
    priority: AssetPriority.HIGHEST,
    type: "texture",
  },
  {
    id: "restart_normal",
    url: "assets/gfx/ui/reset.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "restart_over",
    url: "assets/gfx/ui/reset.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "restart_down",
    url: "assets/gfx/ui/reset.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "restart_disabled",
    url: "assets/gfx/ui/reset.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "spine",
    url: "assets/gfx/animation/spineboy.json",
    priority: AssetPriority.NORMAL,
    type: "animation",
  },
  {
    id: "background",
    url: "assets/gfx/background.jpg",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid1_normal",
    url: "assets/gfx/ui/solidColor1.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid1_down",
    url: "assets/gfx/ui/solidColor1.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid1_over",
    url: "assets/gfx/ui/solidColor1.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },

  {
    id: "solid1_disabled",
    url: "assets/gfx/ui/solidColor1.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid2_normal",
    url: "assets/gfx/ui/solidColor2.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid2_down",
    url: "assets/gfx/ui/solidColor2.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid2_over",
    url: "assets/gfx/ui/solidColor2.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid2_disabled",
    url: "assets/gfx/ui/solidColor2.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid3_normal",
    url: "assets/gfx/ui/solidColor3.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid3_down",
    url: "assets/gfx/ui/solidColor3.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid3_over",
    url: "assets/gfx/ui/solidColor3.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid3_disabled",
    url: "assets/gfx/ui/solidColor3.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid4_normal",
    url: "assets/gfx/ui/solidColor4.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid4_down",
    url: "assets/gfx/ui/solidColor4.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid4_over",
    url: "assets/gfx/ui/solidColor4.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solid4_disabled",
    url: "assets/gfx/ui/solidColor4.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solidParticle1",
    url: "assets/gfx/animation/solidColorParticle1.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "solidParticle2",
    url: "assets/gfx/animation/solidColorParticle2.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "collect",
    url: "assets/sfx/cube_collect.wav",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
  {
    id: "explode",
    url: "assets/sfx/cube_explode.wav",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
  {
    id: "theme",
    url: "assets/sfx/theme.wav",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
];

export const particleConfig = {
  alpha: {
    start: 1,
    end: 0.1,
  },
  scale: {
    start: 0.25,
    end: 0.1,
    minimumScaleMultiplier: 1,
  },
  color: {
    start: "#ffffff",
    end: "#fffffff",
  },
  speed: {
    start: 50,
    end: 500,
    minimumSpeedMultiplier: 1,
  },
  acceleration: {
    x: 0,
    y: 190,
  },
  maxSpeed: 0,
  startRotation: {
    min: 230,
    max: 310,
  },
  noRotation: false,
  rotationSpeed: {
    min: 0,
    max: 0,
  },
  lifetime: {
    min: 1.5,
    max: 1.5,
  },
  blendMode: "normal",
  frequency: 0.01,
  emitterLifetime: 1,
  maxParticles: 5,
  pos: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  spawnType: "point",
};
