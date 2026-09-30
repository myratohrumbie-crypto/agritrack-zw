// AgriTrack ZW - Local Storage Module

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return null;
    }

    return JSON.parse(data);
}

function removeData(key) {
    localStorage.removeItem(key);
}

export { setData, getData, removeData };