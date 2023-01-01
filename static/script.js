// Define constants for the different movements
const FORWARD_VALUE = 1;
const BACKWARDS_VALUE = 2;
const STOP_VALUE = 3;
const LEFT_VALUE = 4;
const RIGHT_VALUE = 5;
const SPEED_UP_VALUE = 6;
const SPEED_DOWN_VALUE = 7;
// Define a constant for the refresh rate (in milliseconds)
const REFRESH_RATE = 1000;

// Define a variable to store the timestamp of the last data sent
let lastDataSentTimestamp = 0;


// Create a variable to store the interval ID
let intervalId = null;

// Get the button elements
const forwardBtn = document.getElementById("forward");
const backwardsBtn = document.getElementById("backwards");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const stopBtn = document.getElementById("stop");
/**
 * Sends the specified data to the server if the specified amount of time has passed since the last data was sent.
 * @param {number} value The data to send to the server.
 * @param {number} refreshRate The minimum amount of time that must pass between data sends (in milliseconds).
 */

function sendData(value, refreshRate) {
  // Get the current timestamp
  const currentTimestamp = Date.now();

  // Check if the specified amount of time has passed since the last data was sent
  if (currentTimestamp - lastDataSentTimestamp > refreshRate) {
    // Update the last data sent timestamp
    lastDataSentTimestamp = currentTimestamp;

    // Send the data to the server
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `send?id=${value}`);
    xhttp.send();
  }
}

/**
 * Handles button presses and releases.
 * @param {HTMLElement} button The button element.
 * @param {string} state The state of the button ("pressed" or "released").
 * @param {number} value The value to send to the server when the button is pressed.
 * @param {number} refreshRate The minimum amount of time that must pass between data sends (in milliseconds).
 */
function handleButton(button, state, value, refreshRate) {
  if (state === "pressed") {
    console.log(`You pressed the ${button.id} button.`, value);
    button.classList.add("pressed");
    sendData(value, refreshRate);

  } else {
    button.classList.remove("pressed");
    // Stop sending data to the server
  }
}

// Attach event listeners to the window object to handle key and button events
window.addEventListener("keydown", event => {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  // Handle the different key and button events
  switch (event.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "backwards"
      handleButton(backwardsBtn, "pressed", BACKWARDS_VALUE, REFRESH_RATE);
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "forward"
      handleButton(forwardBtn, "pressed", FORWARD_VALUE, REFRESH_RATE);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "left"
      handleButton(leftBtn, "pressed", LEFT_VALUE, REFRESH_RATE);
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "right"
      handleButton(rightBtn, "pressed", RIGHT_VALUE, REFRESH_RATE);
      break;
    case "Space":
    case "Escape":
      // Handle "stop"
      handleButton(stopBtn, "pressed", STOP_VALUE, REFRESH_RATE);
  }
  }, true);

// Attach event listeners to the window object to handle key releases
window.addEventListener("keyup",   event => {
    // Handle the different key releases
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        // Handle "backwards"
        handleButton(backwardsBtn, "released", BACKWARDS_VALUE, REFRESH_RATE);
        break;
      case "KeyW":
      case "ArrowUp":
        // Handle "forward"
        handleButton(forwardBtn, "released", FORWARD_VALUE, REFRESH_RATE);
        break;
      case "KeyA":
      case "ArrowLeft":
        // Handle "left"
        handleButton(leftBtn, "released", LEFT_VALUE, REFRESH_RATE);
        break;
      case "KeyD":
      case "ArrowRight":
        // Handle "right"
        handleButton(rightBtn, "released", RIGHT_VALUE, REFRESH_RATE);
        break;
      case "Space":
      case "Escape":
        // Handle "stop"
       handleButton(stopBtn, "released", STOP_VALUE, REFRESH_RATE); // ...
    }
  }
);

// Attach event listeners to the button elements to handle button clicks
forwardBtn.addEventListener("mousedown", () => {
  handleButton(forwardBtn, "pressed", FORWARD_VALUE, REFRESH_RATE);
});
forwardBtn.addEventListener("mouseup", () => {
  handleButton(forwardBtn, "released", FORWARD_VALUE, REFRESH_RATE);
});
backwardsBtn.addEventListener("mousedown", () => {
  handleButton(backwardsBtn, "pressed", BACKWARDS_VALUE, REFRESH_RATE);
});
backwardsBtn.addEventListener("mouseup", () => {
  handleButton(backwardsBtn, "released", BACKWARDS_VALUE, REFRESH_RATE);
});
leftBtn.addEventListener("mousedown", () => {
  handleButton(leftBtn, "pressed", LEFT_VALUE, REFRESH_RATE);
});
leftBtn.addEventListener("mouseup", () => {
  handleButton(leftBtn, "released", LEFT_VALUE, REFRESH_RATE);
});
