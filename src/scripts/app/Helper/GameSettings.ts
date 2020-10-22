export const DefaultTextStyle = {
  fontFamily: "Topaz-8-remake",
  fontSize: 42,
  fill: "#1f140a",
  align: "center",
  stroke: "#cecece",
  strokeThickness: 3,
};

export const PLAYACTION = "play";
export const INIT = "init";
export const ERROR = "error";

  export const INITIAL_SEQ = [
    [
      "solid1",
      "solid1",
      "solid3",
      "solid1",
      "solid4",
      "solid3",
      "solid2",
      "solid1",
      "solid4",
    ],
    [
      "solid2",
      "solid3",
      "solid2",
      "solid4",
      "solid2",
      "solid1",
      "solid4",
      "solid2",
      "solid2",
    ],
    [
      "solid3",
      "solid2",
      "solid1",
      "solid3",
      "solid3",
      "solid2",
      "solid1",
      "solid4",
      "solid3",
    ],
    [
      "solid1",
      "solid4",
      "solid4",
      "solid2",
      "solid4",
      "solid4",
      "solid2",
      "solid1",
      "solid4",
    ],
    [
      "solid4",
      "solid1",
      "solid1",
      "solid4",
      "solid3",
      "solid1",
      "solid2",
      "solid2",
      "solid1",
    ],
    [
      "solid3",
      "solid3",
      "solid2",
      "solid2",
      "solid1",
      "solid3",
      "solid3",
      "solid3",
      "solid2",
    ],
    [
      "solid2",
      "solid2",
      "solid3",
      "solid1",
      "solid2",
      "solid3",
      "solid4",
      "solid3",
      "solid2",
    ],
    [
      "solid4",
      "solid1",
      "solid3",
      "solid4",
      "solid1",
      "solid4",
      "solid1",
      "solid1",
      "solid3",
    ],
    [
      "solid1",
      "solid4",
      "solid4",
      "solid3",
      "solid2",
      "solid1",
      "solid2",
      "solid2",
      "solid4",
    ],
  ];
export const configs = {
  reel: {
    animationDuration: 3,
    startTween: {
      duration: 0.3,
      intensity: 25,
    },
    finishedTween: {
      duration: 0.25,
      intensity: 25,
    },
  },
};

export class GameSettings {
  public static playAccessible: boolean = false;

  public static resolvePlayAccessinble(value: boolean): void {
    GameSettings.playAccessible = value;
  }
}
