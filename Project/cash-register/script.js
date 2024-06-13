const customerCash = document.getElementById("cash");
const numberBtns = document.querySelectorAll(".number button");
const cancelBtn = document.getElementById("cancel");
const clearBtn = document.getElementById("clear");
const purchaseBtn = document.getElementById("purchase-btn");
const tableBody = document.getElementById("tableBody");
const cashIn = document.getElementById("cash-in");
const total = document.getElementById("total");
const displayChange = document.getElementById("change");
const displayChangeDue = document.getElementById("change-due");

let price = 1.87;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const formatResults = (status, change) => {
  const cash = parseFloat(customerCash.value);
  const customerChange = cash - price;
  cashIn.textContent = `$${cash.toFixed(2)}`;
  total.textContent = `$${price.toFixed(2)}`;
  displayChange.textContent = `$${customerChange.toFixed(2)}`;
  displayChangeDue.innerHTML = `<p>Status: <span>${status}</span></p>`;
  change.map(
    (money) =>
      (displayChangeDue.innerHTML += `<p>${money[0]}: <span>$${money[1].toFixed(
        2
      )}</span></p>`)
  );
  return;
};

const checkCashRegister = () => {
  const inputValue = parseFloat(customerCash.value);

  if (inputValue < price) {
    const screen = document.querySelector(".screen-ui-container");
    const alertElement = document.createElement("div");
    alertElement.className = "alert";
    alertElement.innerText =
      "⚠️Customer does not have enough money to purchase the item";

    screen.appendChild(alertElement);

    setTimeout(() => {
      alertElement.remove();
    }, 3000);

    return;
  }

  if (inputValue === price) {
    cashIn.textContent = `$${inputValue}`;
    total.textContent = `$${price}`;
    displayChange.textContent = `$${inputValue - price}`;
    displayChangeDue.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    inputValue = "";
    return;
  }

  let changeDue = Number(inputValue) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  let totalCID = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  if (totalCID < changeDue) {
    return (displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  if (totalCID === changeDue) {
    result.status = "CLOSED";
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }

      if (count > 0) {
        result.change.push([reversedCid[i][0], count * denominations[i]]);
      }
    }
  }
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!customerCash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach((changeArr) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  // Clear existing rows
  tableBody.innerHTML = "";

  cid.forEach((item) => {
    item[0] = currencyNameMap[item[0]] || item[0];
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    cell1.textContent = item[0];
    cell2.textContent = `$${item[1]}`;
    row.appendChild(cell1);
    row.appendChild(cell2);
    tableBody.appendChild(row);
  });
};

//Add number to input using button
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "." && customerCash.value.includes(".")) {
      return;
    }
    customerCash.value += btn.textContent;
  });
});

//Prevent to add another point to input
customerCash.addEventListener("keydown", (event) => {
  if (event.key === "." && customerCash.value.includes(".")) {
    event.preventDefault();
  }
});

//Delete all input
cancelBtn.addEventListener("click", () => {
  customerCash.value = "";
});

//Delete input one by one
clearBtn.addEventListener("click", () => {
  const value = customerCash.value;
  const newValue = value.slice(0, -1);
  customerCash.value = newValue;
});

purchaseBtn.addEventListener("click", checkResults);

updateUI();
