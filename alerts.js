import EventBus from "./eventbus.js";
// EventBus allows different parts of the application to communicate.


// Listen for the alert dismissal event.
EventBus.subscribe("alertDismissed", (alertTitle) => {
    console.log("Alert dismissed:", alertTitle);
});


// Add a click event to the dismiss buttons.
const dismissButtons = document.querySelectorAll(".dismiss-alert");

dismissButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const alert = button.closest("article");

        if (alert) {

            const alertTitle = alert.querySelector("h3").textContent;

            alert.remove();

            EventBus.publish("alertDismissed", alertTitle);
        }

    });

});