const EventBus = (() => {

    const events = {};

    const subscribe = (eventName, callback) => {

        if (!events[eventName]) {
            events[eventName] = [];
        }

        events[eventName].push(callback);
    };

    const publish = (eventName, data) => {

        if (events[eventName]) {
            events[eventName].forEach(callback => callback(data));
        }
    };

    return {
        subscribe,
        publish
    };

})();

export default EventBus;