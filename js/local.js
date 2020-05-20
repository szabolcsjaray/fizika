function saveData(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
}

function loadData(name) {
    let itemStr = window.localStorage.getItem(name);
    if (itemStr==null) {
        return null;
    } else {
        return JSON.parse(window.localStorage.getItem(name));
    }
}