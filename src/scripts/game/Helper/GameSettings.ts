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
    url: "assets/gfx/ui/background.jpg",
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
    id: "sparks",
    url: "assets/gfx/animation/sparks.png",
    priority: AssetPriority.NORMAL,
    type: "texture",
  },
  {
    id: "collect",
    url:  "assets/sfx/mp3/cube_collect.mp3",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
  {
    id: "explode",
    url:  "assets/sfx/mp3/cube_explode.mp3",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
  {
    id: "theme",
    url: "assets/sfx/mp3/theme.mp3",
    priority: AssetPriority.NORMAL,
    autoplay: false,
    loop: false,
    mute: false,
    rate: 1,
    type: "sound",
  } as Asset,
];

export const explodeConfig = {
  alpha: {
    start: 1,
    end: 1,
  },
  scale: {
    start: 0.3,
    end: 0,
    minimumScaleMultiplier: 0,
  },
  color: {
    start: "#ffffff",
    end: "#ffffff",
  },
  speed: {
    start: 200,
    end: 30,
    minimumSpeedMultiplier: 1,
  },
  acceleration: {
    x: 0,
    y: 640,
  },
  maxSpeed: 0,
  startRotation: {
    min: 250,
    max: 290,
  },
  noRotation: false,
  rotationSpeed: {
    min: 360,
    max: 360,
  },
  lifetime: {
    min: 1.25,
    max: 1.25,
  },
  blendMode: "normal",
  frequency: 0.025,
  emitterLifetime: 0.5,
  maxParticles: 5,
  pos: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  spawnType: "rectangle",
};

export const sparksConfig = {
  alpha: {
    start: 1,
    end: 1,
  },
  scale: {
    start: 0.35,
    end: 0.2,
    minimumScaleMultiplier: 1,
  },
  color: {
    start: "#ffffff",
    end: "#ffffff",
  },
  speed: {
    start: 150,
    end: 150,
    minimumSpeedMultiplier: 1,
  },
  acceleration: {
    x: 0,
    y: 0,
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 360,
  },
  noRotation: false,
  rotationSpeed: {
    min: 90,
    max: 180,
  },
  lifetime: {
    min: 1,
    max: 1,
  },
  blendMode: "normal",
  frequency: 0.05,
  emitterLifetime: 1,
  maxParticles: 10,
  pos: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  spawnType: "burst",
  particlesPerWave: 1,
  particleSpacing: 0,
  angleStart: 0,
};
