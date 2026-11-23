// 1. App State
let activeTipPercent = 15;

// 2. DOM Elements
const billInput = document.getElementById("bill-total");
const customTipInput = document.getElementById("custom-tip");
const friendCountInput = document.getElementById("friend-count");
const tipButtons = document.querySelectorAll(".tip-btn");
const decrementBtn = document.getElementById("decrement-btn");
const incrementBtn = document.getElementById("increment-btn");

const emojiFeedback = document.getElementById("emoji-feedback");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalWithTipDisplay = document.getElementById("total-with-tip");
const perPersonDisplay = document.getElementById("per-person-amount");

// 3. Calculation & Validation Logic
function calculateSplit() {
  const billTotal = parseFloat(billInput.value);
  const friends = parseInt(friendCountInput.value);

  // Validation Check: Ensure input entries are real numbers
  if (isNaN(billTotal) || billTotal <= 0 || isNaN(friends) || friends <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalWithTipDisplay.textContent = "$0.00";
    perPersonDisplay.textContent = "$0.00";
    emojiFeedback.textContent = "💰 Enter a bill amount!";
    return;
  }

  // Determine which tip value to scale with
  let tipPercent = activeTipPercent;
  if (customTipInput.value !== "") {
    const customTip = parseFloat(customTipInput.value);
    if (!isNaN(customTip) && customTip >= 0) {
      tipPercent = customTip;
    }
  }

  // Math Formulas
  const totalTip = billTotal * (tipPercent / 100);
  const aggregateTotal = billTotal + totalTip;
  const sharePerPerson = aggregateTotal / friends;

  // Render UI text updates
  tipAmountDisplay.textContent = `$${totalTip.toFixed(2)}`;
  totalWithTipDisplay.textContent = `$${aggregateTotal.toFixed(2)}`;
  perPersonDisplay.textContent = `$${sharePerPerson.toFixed(2)}`;

  // Dynamic emoji feedback depending on size of group
  if (friends === 1) {
    emojiFeedback.textContent = "🙋‍♂️ Eating solo!";
  } else if (friends <= 3) {
    emojiFeedback.textContent = "👥 Small gathering!";
  } else {
    emojiFeedback.textContent = "🎉 Party time!";
  }
}

// 4. Change Event Listeners
billInput.addEventListener("input", calculateSplit);
customTipInput.addEventListener("input", () => {
  if (customTipInput.value !== "") {
    tipButtons.forEach(btn => btn.classList.remove("active"));
  }
  calculateSplit();
});
friendCountInput.addEventListener("input", calculateSplit);

// Preset Tip Percent Toggle Buttons
tipButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    customTipInput.value = ""; // Clear custom text
    
    activeTipPercent = parseFloat(e.target.getAttribute("data-tip"));
    calculateSplit();
  });
});

// Counter Adjusters
decrementBtn.addEventListener("click", () => {
  let val = parseInt(friendCountInput.value);
  if (val > 1) {
    friendCountInput.value = val - 1;
    calculateSplit();
  }
});

incrementBtn.addEventListener("click", () => {
  let val = parseInt(friendCountInput.value);
  if (isNaN(val)) val = 0;
  friendCountInput.value = val + 1;
  calculateSplit();
});
