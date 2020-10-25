export class FindMatch {
  private _cloneSymbolTypeArray: number[][] = [];
  private _symbolLabelArray: number[][] = [];
  private directionX = [1, 0, -1, 0];
  private directionY = [0, 1, 0, -1];
  private depthFirstSearch(
    i: number,
    j: number,
    currentLabel: number,
    group: any
  ) {
    if (i < 0 || i == 9) return;
    if (j < 0 || j == 9) return;
    if (
      this._symbolLabelArray[i][j] ||
      group != this._cloneSymbolTypeArray[i][j]
    )
      return;
    this._symbolLabelArray[i][j] = currentLabel;
    for (var direction = 0; direction < 4; ++direction) {
      this.depthFirstSearch(
        i + this.directionX[direction],
        j + this.directionY[direction],
        currentLabel,
        group
      );
    }
  }

  public getResult(result: any[][]) {
    const initSetValue = (seq: any[][]) => {
      for (var i = 0; i < 9; i++) {
        this._cloneSymbolTypeArray[i] = [];
        this._symbolLabelArray[i] = [];
        for (var j = 0; j < 9; j++) {
          this._cloneSymbolTypeArray[i][j] = seq[i][j].type;
          this._symbolLabelArray[i][j] = 0;
        }
      }
    };
    initSetValue(result);
    let component = 0;
    for (var i = 0; i < 9; ++i) {
      for (var j = 0; j < 9; ++j) {
        if (!this._symbolLabelArray[i][j] && this._cloneSymbolTypeArray[i][j])
          this.depthFirstSearch(
            i,
            j,
            ++component,
            this._cloneSymbolTypeArray[i][j]
          );
      }
    }
    return this._symbolLabelArray;
  }
}
