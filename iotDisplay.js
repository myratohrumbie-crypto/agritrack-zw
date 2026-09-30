import EventBus from "./eventbus.js";

// Thresholds used to classify sensor readings.
const sensorThresholds = {
    "soil-moisture": {
        warning: 40,
        critical: 25
    },

    "temperature": {
        warning: 32,
        critical: 36
    },

    "humidity": {
        warning: 40,
        critical: 30
    },

    "light": {
        warning: 300,
        critical: 150
    }
};


// Determine the status of each sensor reading.
const getStatus = (sensor, value) => {

    const thresholds = sensorThresholds[sensor];

    if (sensor === "soil-moisture") {
        if (value <= thresholds.critical) {
            return "Critical";
        }

        if (value <= thresholds.warning) {
            return "Warning";
        }
    }

    if (sensor === "temperature") {
        if (value >= thresholds.critical) {
            return "Critical";
        }

        if (value >= thresholds.warning) {
            return "Warning";
        }
    }

    if (sensor === "humidity") {
        if (value <= thresholds.critical) {
            return "Critical";
        }

        if (value <= thresholds.warning) {
            return "Warning";
        }
    }

    if (sensor === "light") {
        if (value <= thresholds.critical) {
            return "Critical";
        }

        if (value <= thresholds.warning) {
            return "Warning";
        }
    }

    return "Normal";
};


// Display the sensor reading on the correct card.
const updateSensorCard = (sensor, value) => {

    const readingElement = document.getElementById(
        `${sensor}-reading`
    );

    const statusElement = document.getElementById(
        `${sensor}-status`
    );

    if (!readingElement || !statusElement) {
        return;
    }

    const status = getStatus(sensor, value);

    readingElement.textContent = value;
    statusElement.textContent = status;

    if (status === "Warning" || status === "Critical") {
        addAlert(sensor, value, status);
    }
};


// Add an alert to the visible alert log.
const addAlert = (sensor, value, status) => {

    const alertLog = document.getElementById("iot-alert-log");

    if (!alertLog) {
        return;
    }

    // Remove the starting "No sensor alerts yet." message.
    const firstMessage = alertLog.querySelector("p");

    if (
        firstMessage &&
        firstMessage.textContent === "No sensor alerts yet."
    ) {
        firstMessage.remove();
    }

    const alertMessage = document.createElement("p");

    alertMessage.textContent =
        `${sensor}: ${value} - ${status} alert`;

    alertLog.prepend(alertMessage);
};


// Listen for sensor readings from the EventBus.
EventBus.subscribe("sensor-reading", (data) => {

    updateSensorCard(data.sensor, data.value);

});