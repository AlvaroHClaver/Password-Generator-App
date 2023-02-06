// Slider progress color change

const slider = document.getElementById("myRange");
let charLength;
const slideMove = () => {
  const length = document.getElementById("passwd-length");
  const elapsed = (slider.value * 100) / 5;
  let color = `linear-gradient(90deg,var(--secondary-color) ${elapsed}%, var(--background-color) ${elapsed}%)`; //Uses linear gradiente to change de color of the slider.
  slider.style.background = color;
  const sliderValue = slider.value;
  // Adjusts the slider value to the most commom password size requirements.
  switch (sliderValue) {
    case "0":
      charLength = "4";
      break;
    case "1":
      charLength = "6";
      break;
    case "2":
      charLength = "8";
      break;
    case "3":
      charLength = "10";
      break;
    case "4":
      charLength = "12";
      break;
    case "5":
      charLength = "14";
      break;
  }

  length.innerText = charLength; //Changes the number of characters on screen
};
slider.addEventListener("mousemove", slideMove);
slider.addEventListener("change", slideMove); //Different event for touch screen.
slideMove();

// Password options control
let markedOptions = []; //Recieves the value of every selected item.

const getSelectedOptions = () => {
  //Obtains the value of every marked option and add it to an array.
  const checkbox = document.querySelectorAll("input[type='checkbox']:checked"); //selects all the selected itens and return node list.
  checkbox.forEach(function (item) {
    markedOptions.push(item.value);
  });
};

//Generate password
const upperLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const symbols = ["@", "#", "$", "%", "&", "*", "?", "=", "+", "!", "_"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let possibleDigits = [""]; //Recieves the possible digits based on user selected options.

const generatePossibleDigits = () => {
  //Concatenates the digits inside a new array.
  if (markedOptions.includes("upper")) {
    possibleDigits = possibleDigits.concat(upperLetters);
  }

  if (markedOptions.includes("lower")) {
    possibleDigits = possibleDigits.concat(lowLetters);
  }

  if (markedOptions.includes("numbers")) {
    possibleDigits = possibleDigits.concat(numbers);
  }

  if (markedOptions.includes("symbols")) {
    possibleDigits = possibleDigits.concat(symbols);
  }
};

// Generates and returns password considering the possible digits and password length.
const generatePassword = () => {
  let password = "";

  for (let i = 0; i < charLength - markedOptions.length; i++) {
    const randomNumber = Math.floor(Math.random() * possibleDigits.length);
    password += possibleDigits[randomNumber];
  }
  if (markedOptions.includes("upper")) {
    password += upperLetters[Math.floor(Math.random() * upperLetters.length)];
  }
  if (markedOptions.includes("lower")) {
    password += lowLetters[Math.floor(Math.random() * lowLetters.length)];
  }
  if (markedOptions.includes("numbers")) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  if (markedOptions.includes("symbols")) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return password;
};

// Updates the screen with the generated password.
const updatePassword = (passwd) => {
  const passwdField = document.getElementById("passwd-input");
  passwdField.value = passwd;
};

const generateBtn = document.querySelector(".generate-btn");

// Calls functions when generate is pressed.

generateBtn.addEventListener("click", function (ev) {
  getSelectedOptions();
  generatePossibleDigits();
  const pass = generatePassword();

  if (markedOptions.length === 0) {
    alert("Select at least 1 password option.");
  } else {
    updatePassword(pass);
  }
  possibleDigits = [];
  markedOptions = [];
  const copyTxt = document.querySelector(".copy-txt");
  copyTxt.style.color = "var(--card-background)";
});

// Password strength.
let strength = "medium";
const checkboxInput = document.querySelectorAll("input[type='checkbox']");

// Changes the color and text of the strenth indicator considering how many checkboxes are selected.

const setPasswdStrenth = () => {
  const checkbox = document.querySelectorAll("input[type='checkbox']:checked");
  const strengthBars = document.querySelectorAll(".no-intensity");
  const intesityTxt = document.getElementById("strength-intensity");
  //Removes the previous color of the bars.
  strengthBars.forEach((bar) => {
    bar.classList.remove(strength);
  });
  //Strong
  if (checkbox.length === 4) {
    strengthBars.forEach((bar) => {
      bar.classList.add("strong");
      strength = "strong";
    });
  }
  // Medium
  if (checkbox.length === 3) {
    strengthBars[0].classList.add("medium");
    strengthBars[1].classList.add("medium");
    strengthBars[2].classList.add("medium");
    strength = "medium";
  }
  // Weak
  if (checkbox.length === 2) {
    strengthBars[0].classList.add("weak");
    strengthBars[1].classList.add("weak");
    strength = "weak";
  }
  // To weak
  if (checkbox.length === 1) {
    strengthBars[0].classList.add("too-weak");
    strength = "too-weak";
  }
  intesityTxt.innerText = strength.toLocaleUpperCase();
};
checkboxInput.forEach((input) => {
  input.addEventListener("click", setPasswdStrenth);
});

// Copy to clipboard.

const copyBtn = document.getElementById("copy-icon");

copyBtn.addEventListener("click", function (ev) {
  const passwd = document.getElementById("passwd-input");
  const copyTxt = document.querySelector(".copy-txt");
  navigator.clipboard.writeText(passwd.value);
  copyTxt.style.color = "var(--secondary-color)";
});
