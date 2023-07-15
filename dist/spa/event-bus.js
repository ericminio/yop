class EventBus {
    constructor() {
        this.listeners = {};
        this.patterns = [];
        this.id = 0;
    }
    isEmpty() {
        return Object.keys(this.listeners).length == 0;
    }
    notify(key, value) {
        let listeners = this.listeners[key];
        if (listeners !== undefined) {
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i].listener;
                if (typeof listener == 'object') {
                    listener.update(value, key);
                }
                if (typeof listener == 'function') {
                    listener(value, key);
                }
            }
        }
        for (let i = 0; i < this.patterns.length; i++) {
            const candidate = this.patterns[i];
            if (candidate.pattern.test(key)) {
                const listener = candidate.listener;
                if (typeof listener == 'object') {
                    listener.update(value, key);
                }
                if (typeof listener == 'function') {
                    listener(value, key);
                }
            }
        }
    }
    register(listener, key) {
        return this.save(listener, key, this.listeners);
    }
    unregister(id) {
        this.remove(id, this.listeners);
        const found = this.patterns.find((p) => p.id === id);
        if (found) {
            this.patterns.splice(this.patterns.indexOf(found), 1);
        }
    }
    unregisterAll(ids) {
        for (var i = 0; i < ids.length; i++) {
            let id = ids[i];
            this.unregister(id);
        }
    }

    save(listener, key, map) {
        this.id = this.id + 1;
        if (typeof key === 'string') {
            if (map[key] === undefined) {
                map[key] = [];
            }
            map[key].push({ id: this.id, listener: listener });
        } else {
            this.patterns.push({ id: this.id, pattern: key, listener });
        }
        return this.id;
    }
    remove(id, map) {
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            for (let j = 0; j < map[key].length; j++) {
                let entry = map[key][j];
                if (entry.id == id) {
                    map[key].splice(j, 1);
                }
            }
            if (map[key] == 0) {
                delete map[key];
            }
        }
    }
}
var eventBus = new EventBus();
