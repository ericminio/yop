class YopLocalStorage {
    constructor(window) {
        this.map = window.localStorage;
    }
    clear() {
        this.map.clear();
    }
    save(id, value) {
        this.map.setItem(id, value);
    }
    get(id) {
        return this.map.getItem(id);
    }
    delete(id) {
        this.map.removeItem(id);
    }
    saveObject(id, value) {
        this.save(id, JSON.stringify(value));
    }
    getObject(id) {
        return JSON.parse(this.get(id));
    }
}
var yopLocalStorage = new YopLocalStorage(window);

class YopDomainStorage {
    constructor() {
        this.map = {};
    }
    clear() {
        this.map = {};
    }
    save(id, value) {
        this.map[id] = value;
    }
    get(id) {
        return this.map[id];
    }
    delete(id) {
        delete this.map[id];
    }
    saveObject(id, value) {
        this.save(id, value);
    }
    getObject(id) {
        return this.get(id);
    }
}
var yopDomainStorage = new YopDomainStorage();
