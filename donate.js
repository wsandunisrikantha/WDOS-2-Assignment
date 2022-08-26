














//--------------------------------DONATE PAGE--------------------------------------------------------//

//1. Input validations 

function inputValidation(){
    var name = document.getElementById("name").value;
    var yearInput = document.getElementById("yearInput").value;
    var cardNumber = document.getElementById("cardNum").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var monthInput = document.getElementById("monthInput").value;
    var pinNumber = document.getElementById("cvv").value;
    var cardholderName = document.getElementById("cardHolder").value;
    var fixedDonations = document.getElementById("fixedDonations").value;

    var name_pattern = /^\b(?!.*\.{2})[a-zA-Z.]+(?:\s[a-zA-Z.]+)\b$/;
    var addr_pattern = /^[A-Za-z\d\.\-\/\#\,\s]+$/;
    var email_pattern = /^[A-Za-z\d\.\_]+\@[A-Za-z\d\.\-]+\.[A-Za-z]{2,5}$/;
    var card_pattern = /^[0-9]{16,16}$/;
    var pin_pattern = /^[0-9]{3,3}$/;
    var holder_pattern = /^\b(?!.*\.{2})[a-zA-Z.]+(?:\s[a-zA-Z.]+)\b$/;


    

  if(!name.match(name_pattern)){
     
     alert("Please enter a valid name");
     document.getElementById("name").focus();
    return false;
  }


  if(!email.match(email_pattern)){
      alert("Please enter a valid email");
      document.getElementById("email").focus();
      return false;
  }

  if(!address.match(addr_pattern)){
      alert("Please enter a valid address");
      document.getElementById("address").focus();
      return false;
  }

  if(fixedDonations == ""){
    alert("Please select the donation amout");
    return;
  }

  if(!cardNumber.match(card_pattern)){
      alert("Please enter a valid cardnumber");
      document.getElementById("cardNum").focus();
      return false;
  }

  if(!cardholderName.match(holder_pattern)){
      
    alert("Please enter a valid cardholder name");
    document.getElementById("cardHolder").focus();
    return false;
  }


  if(!pinNumber.match(pin_pattern)){
    alert("Please enter a valid pin number(cvv)");
    document.getElementById("cvv").focus();
    return false;
  }


  if(monthInput == ""){
    alert("Please select expiration month of your credit/debit card");
    document.getElementById("monthInput").focus();
    return;
  }

  if(yearInput == ""){
    alert("Please select the expiration year of your credit/debit card");
    document.getElementById("yearInput").focus(); 
    return;
  }

  alert("Thank you so much for your contribution! The receipt will be sent to your email address.")

  clearDonation();
  
}

// clear form after click the Donate button //-------------CHECK IF ALL CLEARS--------------------//
function clearDonation(){
  const inputs = document.querySelectorAll('#name, #email, #address, #fixedDonations, #donationComment, #cardNum, #cardHolder, #monthInput, #yearInput, #cvv');

  inputs.forEach(input => {
    input.value = '';
  });
};


// fixed donation amounts 
//can be selected BUT BOX DISSAPEARS WHEN JavaScript IS LINKED (WHY????)

class CustomSelect {
  constructor(originalSelect) {
    this.originalSelect = originalSelect;
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("select");

    this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
      const itemElement = document.createElement("div");

      itemElement.classList.add("select__item");
      itemElement.textContent = optionElement.textContent;
      this.customSelect.appendChild(itemElement);

      if (optionElement.selected) {
        this._select(itemElement);
      }

      itemElement.addEventListener("click", () => {
        if (
          this.originalSelect.multiple &&
          itemElement.classList.contains("select__item--selected")
        ) {
          this._deselect(itemElement);
        } else {
          this._select(itemElement);
        }
      });
    });

    this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
    this.originalSelect.style.display = "none";
  }

  _select(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    if (!this.originalSelect) {
      this.customSelect.querySelectorAll(".select__item").forEach((el) => {
        el.classList.remove("select__item--selected");
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("select__item--selected");
  }

  _deselect(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    this.originalSelect.querySelectorAll("option")[index].selected = false;
    itemElement.classList.remove("select__item--selected");
  }
}

document.querySelectorAll(".custom-select").forEach((selectElement) => {
  new CustomSelect(selectElement);
});















