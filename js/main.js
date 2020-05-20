const SAVE_UNITS_NAME="fizika_units";
const SAVE_FORMULAS_NAME="fizika_formulas";
function el(id) {
    return document.getElementById(id);
}

var units = [];
var formulas = [];
var dataList = [];

function emptyUnitsSelect() {
    let sel = el("dataType");
    while (sel.options.length>0) {
        sel.removeChild(sel.options[0]);
    }
}

function unitStrFor(unitName) {
    let unit = units.find(function(unit) { return unit.name==unitName;});
    return unitToHtml(unit.unit);
}

function addUnitsToSelect() {
    emptyUnitsSelect();
    let sel = el("dataType");
    units.forEach( function(unit) {
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode(unit.name));
        opt.value=unit.name;
        sel.appendChild(opt);
    });
    if (sel.options.length>0) {
        el("unitP").innerHTML = unitStrFor(sel.options[sel.selectedIndex].value);
    }
}

function init() {
    let u1 = new Unit("F", "erő", "N");
    let u2 = new Unit("a", "gyorsulás", "m/s2");

    u2.print();
    u1.print();
    units=loadData(SAVE_UNITS_NAME);
    if (units==null) {
        units=[];
        units.push(u1);
        units.push(u2);
    } else {
        units.forEach( unit => Object.setPrototypeOf(unit, Unit.prototype));
    }
    formulas=loadData(SAVE_FORMULAS_NAME);
    if (formulas==null) {
        formulas = [];
    }
    addUnitsToSelect();
    refreshList();
    refreshDataList();
}

function dataTypeSelected() {
    let sel = el("dataType");
    el("unitP").innerHTML = unitStrFor(sel.options[sel.selectedIndex].value);
}

function addUnit() {
    let u = new Unit(el("unitInput").value, el("descriptionInput").value, el("descriptionUnit").value);
    units.push(u);
    addUnitsToSelect();
    refreshList();
}

function addFormula() {
    let f = el("formulaInput").value;
    let expr = new ExprTree();
    let exprStr = f.indexOf("=")
    formulas.push(f);
    refreshList();
}

function saveAll() {
    saveData(SAVE_UNITS_NAME, units);
    saveData(SAVE_FORMULAS_NAME, formulas);
}

function refreshDataList() {
    let lDiv = el("dataList");
    lDiv.innerHTML="Adatok:<br/>";
    dataList.forEach( data =>
        lDiv.innerHTML += data.dataType + " = " + data.value + "<br/>"
    );
}

function addData() {
    let dt = el("dataType");
    let dataType = dt.options[dt.selectedIndex].value;
    let data = parseFloat(el("dataInput").value);
    let newData = {"dataType": dataType, "value" : data};
    dataList.push(newData);
    refreshDataList();
}

function refreshList() {
    let listDiv=el("unitList");
    listDiv.innerHTML="Fogalmak:<br>";
    units.forEach( function(unit) {
        unit.print();
        listDiv.innerHTML = (listDiv.innerHTML + unit.toStr() + "<br>");
    });
    listDiv.innerHTML+="<br>Képletek:<br>";
    formulas.forEach( formula => listDiv.innerHTML+=(formula+"<br>"));
}