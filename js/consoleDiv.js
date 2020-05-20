function ConsoleDiv(divId) {
    this.div=document.getElementById(divId);
}
ConsoleDiv.prototype.write = function(str) {
    this.div.innerHTML = this.div.innerHTML + "<br/>" + str.replace(/\s/g, "\xa0");
    this.div.scrollTop = this.div.scrollHeight;
}
