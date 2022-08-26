let products = {
    price : [5000,2500,1000,500,4500,15000],
    duration : [0,500,1000],
    extras : [500],

    durForeign : [0,500,1000],
    durLocal : [0,250,500]
}
var num_Of_Tickets = 0;


function calculateCost(){
    var extra_price = products["extras"];
    var ticket_price = products["price"];
    var duration_foreigner = products["durForeign"];
    var duration_local = products ["durLocal"];

    var tCost = 0;

    
    var duration = document.getElementById("duration").value;
    var numOfTckts = document.getElementById("numOfTickets").value;
    var typeOfTicket = document.getElementById("ticketChoice").value;
    
    var foodTokens = document.getElementById("numOfTokens").value;

if(numOfTckts){
    if(typeOfTicket == ""){
        alert("Select the Ticket Type");
        document.getElementById("ticketChoice").focus();
        return;
    }

}

    if(numOfTckts == ""){
        numOfTckts = 0;
    }
    else{
        numOfTckts=parseInt(numOfTckts);

    }
    //validation
    if(numOfTckts<0){
        alert("Enter a Possitive Number")
    }


    if(foodTokens == ""){
        foodTokens = 0;
    }
    else{
        foodTokens=parseInt(foodTokens);

    }
    //validation
    if(foodTokens<0){
        alert("Enter a Possitive number for Food Tokens")
    }
    
    totalPrice = 0;
    typeOfTicket = parseInt(typeOfTicket);


    if (typeOfTicket == 0){
        totalPrice = (numOfTckts*(ticket_price[0] + duration_foreigner[duration]));

    }
    else if(typeOfTicket==1){
        totalPrice = (numOfTckts*(ticket_price[1] + duration_foreigner[duration]));
        
    }
    else if(typeOfTicket==2){
        totalPrice = (numOfTckts*(ticket_price[2] + duration_local [duration]));

    }
    else if(typeOfTicket==3){
        totalPrice = (numOfTckts*(ticket_price[3] + duration_local [duration]));

    }
    else if(typeOfTicket==4){
        totalPrice = (numOfTckts*ticket_price[4]);
        
    }
    else if(typeOfTicket==5){
        totalPrice = (numOfTckts*ticket_price[5]);
    }

 //DONE WITH P1
   
    totalFoodTokens = foodTokens* extra_price[0];

    tCost = parseFloat(totalPrice + totalFoodTokens);
    document.getElementById("spCost").innerHTML = tCost.toFixed(2);


    num_Of_Tickets = numOfTckts;

   // extras();
   //extras2();
   
}


function extras(){
    var divExtras = document.getElementById("divExtras");
    divExtras.style.display = optional.checked? "block" : "none";

}

//ENTERED SHOW/HIDE
document.getElementById("extra_items").style.display = "none"; 
  
  function showHide() {
    var x = document.getElementById("extra_items");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  




function addToOrder(){

    var cost = parseFloat(document.getElementById("spCost").innerHTML);
    if(cost == 0){
        alert("Please select Ticket Category, Duration and Number of Passes");
        return;
    }
        
    document.getElementById("divAddOrder").style = "display : block";

    var grand_total = parseFloat(document.getElementById("GrandTot").innerHTML);

    var ctrl_ticketType = document.getElementById("ticketChoice");
    var ticket_pricetxt = ctrl_ticketType.options[ctrl_ticketType.selectedIndex].text;
   
    var ctrl_duration_price = document.getElementById("duration");
    var duration_price_name = ctrl_duration_price.options[ctrl_duration_price.selectedIndex].text;


    /*Adding Rows to the table body*/

    var tbody = document.getElementById("tbody_update");
    var trow = tbody.insertRow(-1);

    td1 = trow.insertCell(0);
    td1.innerHTML = ticket_pricetxt;

    td2 = trow.insertCell(1);
    td2.innerHTML = document.getElementById("numOfTickets").value;

    td3 = trow.insertCell(2);
    td3.innerHTML = duration_price_name;

    td4 = trow.insertCell(3);
    td4.innerHTML = document.getElementById("numOfTokens").value;

    var total = parseFloat(document.getElementById("spCost").innerHTML);
    grand_total = grand_total + total;

    td5 = trow.insertCell(4);
    td5.innerHTML = total.toFixed(2);

    td6 = trow.insertCell(5);
    td6.innerHTML = "<a href='javascript:void(0)' style='color:maroon;font-weight:bold' onclick='removeRecord(this.parentElement);'>X</a>";

    document.getElementById("GrandTot").innerHTML = grand_total.toFixed(2);
    
  
    calcLoyaltyPoints();
    resetPurchaseForm();
    extras();
   
}

function removeRecord(item){
    var result = confirm("Do you want to remove this record?");
    
    if(result == true){
        var table = document.getElementById("tbl_order");
        var grand_total = parseFloat(document.getElementById("GrandTot").innerHTML);
        
        var total = parseFloat(item.parentElement.cells[4].innerHTML);
       
        grand_total = grand_total - total;
        
        document.getElementById("GrandTot").innerHTML = grand_total.toFixed(2);
        table.deleteRow(item.parentElement.rowIndex);
    }
   
}

function placeOrder(){

    var Table = document.getElementById("tbody_update");
    var grandTotal = document.getElementById("GrandTot");
    Table.innerHTML = "";
  
    grandTotal.innerHTML = "0.00";

    alert("Thank You for Purchasing");
  }


function resetPurchaseForm(){
    document.getElementById("purchaseForm").reset();
    document.getElementById("spCost").innerHTML = "0.00";
}





// Local storage functions to save and refill form when user clicks the add to favourite button


const formId = "purchaseForm"; 
const formDetector = `${formId}`; 
const saveButton = document.querySelector("#addFavourite"); 
const retrieveButton = document.querySelector("#retriveFavourite"); 
const alertBox = document.querySelector(".alert"); 
let form = document.querySelector(`#${formId}`); 
let formElements = form.elements; 


 const getFormData = () => {
  let data = { [formDetector]: {} }; // create an empty object 
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  const message = "Your order has been saved as a favourite. Thank you!!!";
  displayAlert(message);
};

//SHOW MESSAGE
const displayAlert = message => {
  alertBox.innerText = message; 
  alertBox.style.display = "block"; 
  setTimeout(function() {
    alertBox.style.display = "none"; 
  }, 2000);
};


//REFILL FAV ORDER
 const formatoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); //
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
    document.getElementById("extra_items").style.display = "block"; 
  }
};


retrieveButton.onclick = function(){
    formatoRefill(); 
    calculateCost();

}



   
   
   //Calculate Loyalty points and save it in the local storage
   
   var totalTicket = 0;
   var g_loyaltyPoints = 0;
   var loyaltyPoints = 0;
   
   
   
   function calcLoyaltyPoints(){
   
     totalTicket = totalTicket + num_Of_Tickets;
   
     if(totalTicket > 3){
   
         loyaltyPoints = 20 * totalTicket;
   
         g_loyaltyPoints = g_loyaltyPoints + loyaltyPoints;
   
         localStorage.setItem("loyalty",g_loyaltyPoints);
   
     }
   
   }
   
   
   function showLoyaltyPoints(){
   
     g_loyaltyPoints = JSON.parse(localStorage.getItem(`loyalty`));
   
     if(g_loyaltyPoints>0){
   
         alert("Congratulations! You have earned "+  g_loyaltyPoints + " loyalty points so far");
   
     }
   
     else{
   
         alert("Sorry! You don't have any loyalty points so far");
   
     }
   }
   