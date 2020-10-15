//set up the html element
let form  = null;
let loan_amount = null;
let loan_years = null;
let loan_rate = null;
let monthly_payment = null;


window.addEventListener('DOMContentLoaded', function() {
  //
  form   = document.getElementById("calc-form");
  if (form) {
    loan_amount   = document.getElementById("loan-amount");
    loan_years   = document.getElementById("loan-years");
    loan_rate    = document.getElementById("loan-rate");
    monthly_payment = document.getElementById("monthly-payment");

    //set up the initial values
    setupIntialValues();

    //add the submit event
    form.addEventListener("submit", function(e) {
      //prevent the page refresh
      e.preventDefault();

      //update the amount
      update();
    });
  }
});


//get the input values
function getCurrentUIValues() {
  return {
    amount: parseInt(loan_amount.value),
    years: parseInt(loan_years.value),
    rate: parseFloat(loan_rate.value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  loan_amount.value   = "10000";
  loan_years.value          = "5";
  loan_rate.value           = "5";
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let monthly   = calculateMonthlyPayment(getCurrentUIValues());

  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let p   = values.amount;
  let i   = values.rate / 12;
  let n   = values.years * 12;
  if (i == 0){
    //if no interest 
    return (p / n).toFixed(2);
  }
  
  return (p * (i/100) / (1 - ((1 + (i / 100)) ** (0 - n)))).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  monthly_payment.innerText = "$" + monthly;
}
