const forward_value = 1
const backwards_value = 2   
const stop_value = 3
const left_value = 4
const right_value = 5 
const speed_up_value = 6
const speed_down_value = 7 
var refresh = 'refresh'
const forward_btn = document.getElementById("forward")

const backwards_btn = document.getElementById("backwards")

const left_btn = document.getElementById("left")

const right_btn = document.getElementById("right")

const stop_btn = document.getElementById("stop")
let interval

function send_data(value){
  interval = setInterval(function (){
  // const xhttp = new XMLHttpRequest();
  // xhttp.open("GET", `send?id=${value}`)
  // xhttp.send()
  fetch(`send?id=${value}`)
  }, 1000);
};



window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }
   switch(event.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "back"
      backwards()
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "forward"
      forward()
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      left()
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      right()
      break;
    case "Space":
    case "Escape":
      stop()
      break;
  }
}, true);
// window.addEventListener("keydown", checkKeyPressed, false);

// function checkKeyPressed(evt) {
//     if (evt.keyCode == "38" || evt.keyCode == "87") {
//       forward() 
//     } else if (evt.keyCode == "40" || evt.keyCode == "83") {
//         backwards()
//   } else if (evt.keyCode == "37" || evt.keyCode == "65") {
//       left()
//   } else if (evt.keyCode == "39" || evt.keyCode == "68") {
//       right()
//   } else if (evt.keyCode == "27" || evt.keyCode == "32") {
//       stop()
//   } 
//   
// }

window.addEventListener("keyup", checkKeyRealesed, false)
// changes styling for button when its pressed down
function checkKeyRealesed(evt) {
    if (evt.keyCode == "38" || evt.keyCode == "87") {
      forward('')
  } else if (evt.keyCode == "40" || evt.keyCode == "83"){
      backwards('')
  } else if (evt.keyCode == "37" || evt.keyCode == "65") {
      left('')
  } else if (evt.keyCode == "39" || evt.keyCode == "68") {
      right('')
  } else if (evt.keyCode == "27" || evt.keyCode == "32") {
     stop('')
  }
  clearInterval(interval)
}

function forward(state="pressed") {
  if (state === "pressed") { 
  console.log("You pressed 'Forward'.", forward_value)
  btn(forward_btn, "pressed")
  send_data(forward_value)
  } else {
    btn(forward_btn)
  }
}

function backwards(state="pressed") {
  if (state === "pressed") { 
   console.log("You pressed 'Backwards'.",backwards_value)
  btn(backwards_btn, "pressed")
  send_data(backwards_value)
} else {
    btn(backwards_btn)
  } 
}

function stop(state="pressed") {
  if (state === "pressed") { 
  console.log("You pressed 'Stop'", stop_value)
  send_data(stop_value)
  btn(stop_btn, "pressed")
  }else {
  btn(stop_btn)
  }
}

function left(state="pressed") {
  if (state === "pressed") { 
  console.log("You pressed 'left'", left_value)
  send_data(left_value)
  btn(left_btn, "pressed")
  } else { 
    btn(left_btn)
  }
}
function right(state="pressed") {
  if (state === "pressed") { 
  console.log("You pressed 'right'", right_value)
  send_data(right_value)
  btn(right_btn, "pressed")
} else  {
  btn(right_btn)
  }
}

function btn(id, state="") {
  if (state === "pressed") {
    id.className = "btn active"
  } else {
    id.className = "btn "
  }
}
