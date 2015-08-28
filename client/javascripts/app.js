$(document).ready(function(){

  $customers = $('.customers');
  var custNames = [];
  var custBilling = [];
  //request the customer data from the server
  function requestCust() {
    return $.ajax({
      url: '/customers'
    }).done(function(data){
      custNames = data;
    }).fail(function(){
      console.log('Fail');
    }).always(function(){
    })
  };
  //request the billing data from the server
  function requestBilling(){
    return $.ajax({
      url: '/billing'
    }).done(function(data){
      custBilling = data;
    }).fail(function(){
    })
  };
  //if there is a separate shipping address it will query the server, otherwise append to the DOM
  function requestShipping(cust, custI){
    if(cust.sepShip == "true"){
       return $.ajax({
        url: ('/shipping/' + cust.id)
      }).done(function(data){
        custNames[custI].shipAdd = (data.address1 + ' ' + data.address2 + ' ' + data.city + ' ' + data.state + ' ' + data.zip);
        appendToDOM(custNames[custI]);
        })
      } else {
        return appendToDOM(custNames[custI]);
      }
    };
  //this will append a customer object to the DOM
  function appendToDOM(customer){
    console.log(customer);
    $newCustDiv = $('<div>');
    $newCustList = $('<ul>');
    $newNameli = $('<li>');
    $shipAddli = $('<li>');
    $billAddli = $('<li>');
    if(!customer.shipAdd){
      customer.shipAdd = customer.billAdd;
    }
    $newNameli.text(customer.firstName + ' ' + customer.lastName);
    $billAddli.text('Billing address: ' + customer.billAdd);
    $shipAddli.text('Shipping address: ' + customer.shipAdd);
    $newCustList.append($newNameli).append($billAddli).append($shipAddli);
    $newCustDiv.append($newCustList);
    $customers.append($newCustDiv);
  }
  //when requestCust and requestBilling are done it will add address to the customer object and add whether there is a separate shipping address or not.
  $.when(requestCust(), requestBilling()).done(function(){
    custNames.forEach(function(person, personI){
      custBilling.forEach(function(place, placeI){
        if(person.id == place.customerId){
          custNames[personI].billAdd = (place.address1 + ' ' + place.city + ' ' + place.state + ' ' + place.zip);
          custNames[personI].sepShip = place.shipAdd;
        }
      })
    });
    //loop through array of customers and append to DOM from there.
    for(var i = 0, x = custNames.length; i < x ; i++){
      requestShipping(custNames[i], i)
    }
  });
});
