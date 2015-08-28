$(document).ready(function(){
  function Customer(firstname, lastname, id){
    this.name = firstname + ' ' + lastname;
    this.id = id
  }
  $customers = $('.customers');
  var customers = [];
  var custNames = [];
  var custShip = [];
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
  function requestShip(){
    return $.ajax({
      url: '/shipping'
    }).done(function(data){
      custShip = data;
    }).fail(function(){
    })
  };
  function requestBilling(){
    return $.ajax({
      url: '/billing'
    }).done(function(data){
      data.forEach(function(place, placeI){
        custNames.forEach(function(person, personI){
          if(person.id == place.customerId){
            custNames[personI].billAdd = (place.address1 + ' ' + place.city + ' ' + place.state + ' ' + place.zip);
          }
        })
      })
    }).fail(function(){});
  };
  function appendToDOM(customer){
    console.log(customer);
    $newCustDiv = $('<div>');
    $newCustList = $('<ul>');
    $newNameli = $('<li>');
    $shipAddli = $('<li>');
    $billAddli = $('<li>');
    $newNameli.text(customer.firstName + ' ' + customer.lastName);
    $billAddli.text('Billing address: ' + customer.billAdd);
    $shipAddli.text('Shipping address: ' + customer.shipAdd || customer.billAdd);
    $newCustList.append($newNameli).append($billAddli).append($shipAddli);
    $newCustDiv.append($newCustList);
    $customers.append($newCustDiv);
  }

  $.when(requestCust(), requestShip()).done(function(){
    custNames.forEach(function(person, personI){
      customers = new Customer(person.firstName, person.lastName, person.id);
      custShip.forEach(function(place, placeI){
        if(person.id == place.customerId){
          custNames[personI].shipAdd = (place.address1 + ' ' + place.city + ' ' + place.state + ' ' + place.zip);
        }
      })
    });
    $.when(requestBilling()).done(function(){
        console.log(custNames)
        for(var i = 0, x = custNames.length; i < x ; i++){
          appendToDOM(custNames[i]);
      }
    });
  });
});
