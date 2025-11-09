const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let last = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let current = display.innerHTML;
    let allNum = current.split(/[\-+x\/]/);
    let text = this.textContent;
    const regex = /^[+\-x\/]$/;
    // Clear All
    if (text.toUpperCase() === "AC") {
      display.innerHTML = 0;
      last = 0;
    }
    // Input Number
    else if (Number(text)) {
      if (current === "0") {
        display.innerHTML = text;
        last = text;
      } else if (allNum.slice(-1)[0] === "0") {
        display.innerHTML = current.slice(0, -1) + text;
        last = text;
      } else {
        display.innerHTML += text;
        last = text;
      }
    }
    // Input zero
    else if (text === "0") {
      if (!(allNum.slice(-1)[0] === "0" || allNum.slice(-1)[0] === "-0")) {
        display.innerHTML += text;
        last = text;
      }
    }
    // Input operation
    else if (regex.test(text) && last !== "status") {
      if (regex.test(last)) {
        if (text !== "-") {
          display.innerHTML = current.slice(0, -1) + text;
          last = text;
        } else if (last !== "-") {
          display.innerHTML += text;
          last = "status";
        }
      } else if (last !== ".") {
        display.innerHTML += text;
        last = text;
      }
    } 
    // Input status minus or plus
    else if (last === "status") {
      if (text === "-") {
        display.innerHTML = current.slice(0, -1) + text;
        last = "status";
      } else {
        display.innerHTML = current.slice(0, -2) + text;
        last = text;
      }
    }
    // Input decimal
    else if (text.startsWith(".")) {
      if (!allNum.slice(-1)[0].includes(".") && !regex.test(last)) {
        display.innerHTML += ".";
        last = text;
      }
    } else if (text === "=") {
      const answer = math.evaluate(display.innerHTML.replace("x", "*"));
      display.innerHTML = String(answer);
    }
  });
});
