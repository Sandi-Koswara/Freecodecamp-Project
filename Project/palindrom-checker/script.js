const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

checkButton.addEventListener("click", () => {
  const input = textInput.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedInput = input.split("").reverse().join("");

  if (input === "") {
    alert("Please input a value");
  } else if (input.length === 1 || input === reversedInput) {
    result.innerHTML = `<strong>${textInput.value}</strong> is a palindrome`;
    result.classList.remove("hidden");
  } else {
    result.innerHTML = `<strong>${textInput.value}</strong> is not a palindrome`;
    result.classList.remove("hidden");
  }
});
