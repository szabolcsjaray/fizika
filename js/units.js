function Unit(name, description, unit) {
    this.name = name;
    this.description = description;
    this.unit = unit;


}
function unitToHtml(unit) {
    let htmlStr = "";
    for(let i=0;i<unit.length;i++) {
        if (unit[i]>='0' && unit[i]<='9') {
            htmlStr +="<sup>"+unit[i]+"</sup>";
        } else {
            htmlStr += unit[i];
        }
    }
    return htmlStr;
};

Unit.prototype.toStr = function() {
    return this.name+" : " + this.description + " (" + unitToHtml(this.unit)+")";
};

Unit.prototype.print = function() {
    console.log(this.toStr());
};