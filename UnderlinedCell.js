"use strict"

class UnderlinedCell {
    constructor(inner) {    //inner: celda dentro de celda
        this.inner = inner;
    }
    
    minWidth() {
        return this.inner.minWidth();
    }
    
    minHeight() {
        return this.inner.minHeight() + 1;
    }
    
    draw(width, height) {
        return this.inner.draw(width, height - 1)
        .concat(["-".repeat(width)]);
    }
}

module.exports = {
  UnderlinedCell: UnderlinedCell
};