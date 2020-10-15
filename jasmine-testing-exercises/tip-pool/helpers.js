// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement("td");
  newTd.innerText = value;

  tr.append(newTd);
}

//expects a table row element, appends a newly created td element with delete button
function appendDeleteBtn(tr) {
  let newTd = document.createElement("td");
  newTd.innerText = "X";
  tr.append(newTd);

  //click event
  newTd.addEventListener("click" , function(event){
    const td = event.target;
    //tr is using serverId as id
    const tr = td.parentElement;

    if (tr.id.includes("server")){
      //delete a server
      deleteServer(tr.id);
    } else if (tr.id.includes("payment")){
      //delete a payment
      deletePayment(tr);
    }
  });
}

//expect a serverId, delete this server from Allservers and update the table
function deleteServer(serverId){
  //remove from the allServers
  delete allServers[serverId];

  //updateServerTable() to update the up to date earning;
  updateServerTable();
}


//expect a tr element, delete the payment and update all other informations
function deletePayment(tr){
  //remove from AllPayments
  delete allPayments[tr.id];

  tr.remove();

  //update the server table
  updateServerTable();

  //update the summary table
  updateSummary();
}
