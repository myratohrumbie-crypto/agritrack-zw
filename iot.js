import EventBus from "./eventbus.js";
// In a real farm, the simulated readings would come from physical sensors.
// A connection such as MQTT over WebSockets could send the sensor data
// to the application instead of using setInterval. The display code
// would still work because it receives the readings through the EventBus.

const generateReading = (sensor) => {
    switch (sensor) {
        case "soil-moisture":
            return Math.floor(Math.random() * 61) + 30;

        case "temperature":
            return Math.floor(Math.random() * 16) + 20;

        case "humidity":
            return Math.floor(Math.random() * 41) + 40;

        case "light":
            return Math.floor(Math.random() * 801) + 200;

        default:
            return 0;
    }
};

const generateSensorReadings = () => {

    const sensors = [
        "soil-moisture",
        "temperature",
        "humidity",
        "light"
    ];

    sensors.forEach((sensor) => {

        const reading = generateReading(sensor);

        EventBus.publish("sensor-reading", {
            sensor: sensor,
            value: reading
        });
    });
};

// Generate new sensor readings every 3 seconds
setInterval(generateSensorReadings, 3000);

// Generate the first readings immediately
generateSensorReadings();