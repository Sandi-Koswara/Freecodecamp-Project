const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const output = document.getElementById("results-div");

const isValid = (input) => {
  if (input.trim() === "") {
    const screen = document.querySelector(".screen");

    const alertElement = document.createElement("div");
    alertElement.className = "alert";
    alertElement.innerText = "⚠️Please provide a phone number";

    screen.appendChild(alertElement);

    setTimeout(() => {
      alertElement.remove();
    }, 3000);

    return;
  }

  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})-?\s?\d{3}-?\s?\d{4}$/;

  const outputChild = document.createElement("p");
  outputChild.className = "results-text";
  phoneRegex.test(input)
    ? (outputChild.style.background = "#337357")
    : (outputChild.style.background = "#EE4266");
  outputChild.appendChild(
    document.createTextNode(
      `${phoneRegex.test(input) ? "Valid" : "Invalid"} US number: ${input}`
    )
  );
  output.appendChild(outputChild);
};

checkButton.addEventListener("click", () => {
  isValid(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    isValid(userInput.value);
    userInput.value = "";
  }
});

clearButton.addEventListener("click", () => {
  output.textContent = "";
});
