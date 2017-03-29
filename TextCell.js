// TextCell Class

class TextCell {
    constructor(text) {
        this.text = text.split("\n");
    }
    
    minWidth() {
        return this.text.reduce(function(width, line) {
            return Math.max(width, line.length);
        }, 0);
    }
    
    minHeight = function() {
        return this.text.length;
    }
    
    draw = function(width, height) {
        var result = [0,height].range((i)=>i).map(
            (i) => {
            var line = this.text[i] || "";
            return line + " ".repeat(width - line.length)
            }
        );
        return result;
    }
}

module.exports = {
  TextCell: TextCell,
}
