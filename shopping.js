function purchaseScreen(mainID) {
    //extract mainID and assign it to variable "mainElement"
    var mainElement = mainID;
    //variable initialized as false (boolean)
    var initialized = false;

    //call the method to load existing contacts
    loadOrders();
    //returns all the validation and function is complete
    return {
        //initialize the function to start submitting or deleting data
        init: function () {
            //if initialized is true, return
            if (initialized) {
                return;
            }
            //stops the default action of an element from happening once the submit button is clicked
            $(mainElement).find('form').submit(
            function (evt) {
                evt.preventDefault();
            }.bind(this)
        );
            //click event to handle the deleteAll button click
            $(mainElement).find("a.emptyCart").click(
                function (evt) {
                    //clear the localStorage
                    localStorage.clear();
                    //remove all data from the table
                    $(mainElement).find('table tbody').remove();

                    //clear the totals textboxes by setting them to 0
                    var sub = 0;
                    var ship = 0;
                    var tax = 0;
                    var total = 0;
                    $("#subtotal").val(sub.toFixed(2));
                    //output the result for "ship" to the shipping texbox
                    $("#shipping").val(ship.toFixed(2));
                    //output the result for "tax" to the tax texbox
                    $("#tax").val(tax.toFixed(2));
                    //output the result for "total" to the total texbox
                    $("#total").val(total.toFixed(2));

                    //refresh the page after table is deleted
                    //https://www.w3schools.com/jsref/met_loc_reload.asp
                    //I included this for testing purposes to see if the data
                    //stored in localStorage was removed
                    location.reload();
                }.bind(this)
             );
            //click event to handle the delete (single row) button click
            $(mainElement).find("a.delete").click(
                function (evt) {
                    //calss the deleteOrder() function to delete a single order
                    deleteOrder(evt);
                    //call the totals method to update the data in the totals textboxes
                    totals();
                    //refresh the page after a row is deleted
                    //https://www.w3schools.com/jsref/met_loc_reload.asp
                    //I included this for testing purposes to see if the specific
                    //record stored in localStorage was removed
                    location.reload();
                }.bind(this)
            );
            //click event to handle the submit button click
            $(mainElement).find('form input[type="submit"]').click(
                 function (evt) {
                     //check validity of the entered data before storing it
                     if ($(evt.target).parents('form')[0].checkValidity()) {
                         //if everything is valid call the saveOrder funtion to save order
                         saveOrder();
                         //calls the function to display all the totals:
                         //subtotal, tax, shipping and total
                         totals();
                         //refresh the page after a new record is saved
                         //https://www.w3schools.com/jsref/met_loc_reload.asp
                         //I included this for testing purposes to see if the data
                         //entered was stored in the localStorage
                         location.reload();
                     }

                 }.bind(this)
                 );
            //for each input that has "required", add a * beside the label
            $(':input[required]').siblings('label').append($('<span>').text('*').addClass('requiredMarker'));

            //var itemDate = document.getElementById('invoiceDate')
            //itemDate.oninvalid = function (e) {
            //    e.target.setCustomValidity("");
            //    if (e.target.validity.valid == false) {
            //        if (e.target.value.length == 0) {
            //            e.target.setCustomValidity("Invoice date is required.");
            //        } else {
            //            e.target.setCustomValidity("Please enter a valid date.");
            //        }
            //    }
            //};
            //initialize variable that stores the entered itemID
            var itemID = document.getElementById('itemID')
            //initialize oninvalid event handler if data is invalid
            itemID.oninvalid = function (e) {
                //blank the default message 
                e.target.setCustomValidity("");
                //if the data is false continue on
                if (e.target.validity.valid == false) {
                    //if the input length = 0, display the message
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Item ID is required.");
                        //if the input length does not equal 8, display the message
                    } else if (e.target.value.length != 8) {
                        e.target.setCustomValidity("Item ID is required and must contain 8 digits.");
                    }
                }
            };
            //initialize variable that stores the entered itemName
            var itemName = document.getElementById('itemName')
            //initialize oninvalid event handler if data is invalid
            itemName.oninvalid = function (e) {
                //blank the default message
                e.target.setCustomValidity("");
                //if the data is false continue on
                if (e.target.validity.valid == false) {
                    //if the input length = 0, display the message
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Item name is required.");
                        //if the input length is less than 5, display the message
                    } else if (e.target.value.length < 5) {
                        e.target.setCustomValidity("Item name must be at least 2 characters.");
                        //if the input length is great than 25, display the message
                    } else if (e.target.value.length > 25) {
                        e.target.setCustomValidity("Item name must be less than 25 characters.");
                    }
                }
            };
            //initialize variable that stores the entered itemDesc
            var itemDesc = document.getElementById('itemDesc')
            //initialize oninvalid event handler if data is invalid
            itemDesc.oninvalid = function (e) {
                //blank the default message
                e.target.setCustomValidity("");
                //if data is false continue on
                if (e.target.validity.valid == false) {
                    //if the input length = 0, display the message
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Item description is required.");
                        //if the input length is greater than 300 characters, display the message
                    } else if (e.target.value.length > 300) {
                        e.target.setCustomValidity("Item name must be less than 300 characters.");
                    }
                }
            };
            //initialize variable that stores the entered itemQty
            var itemQty = document.getElementById('itemQty')
            //initialize oninvalid event handler if data is invalid
            itemQty.oninvalid = function (e) {
                //blank the default message
                e.target.setCustomValidity("");
                //if data is false continue on
                if (e.target.validity.valid == false) {
                    //if the input length = 0, display the message
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Item quantity is required.");
                        //if input is anything other than a positive integer, display the message
                    } else {
                        e.target.setCustomValidity("Item quantity must be atleast 1 and can't have any decimals.");
                    }
                }
            };
            //initialize variable that stores the entered itemPrice
            var itemPrice = document.getElementById('itemUPrice')
            //initialize oninvalid event handler if data is invalid
            itemPrice.oninvalid = function (e) {
                //blank the default message
                e.target.setCustomValidity("");
                //if data is false continue on
                if (e.target.validity.valid == false) {
                    //if the input length = 0, display the message
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Item price is required.");
                        //if input is anything other than a positive float with 2 decimal places, display the message
                    } else {
                        e.target.setCustomValidity("Item price must be atleast 0.01 and contain exactly 2 decimal places.");
                    }
                }
            };
            //function that highlights the row that the mouse hovers over
            $(mainElement).find('tbody').on("mouseenter mouseleave", "tr", function (evt) {
                //if the mouse enters the selected row, 
                if (evt.type === "mouseenter") {
                    //text color becomes white
                    $(evt.target).closest('tr').css('color', 'white');
                    //background becomes blue
                    $(evt.target).closest('tr').css('background', '#3056A0');
                    //once the mouse leaves that row, the attributes go back to normal
                } else {
                    $(evt.target).closest('tr').removeAttr('style');
                }

            });
            //boolean variable initialized becomes true after validation
            initialized = true;

        }

    };

    //this function retrieves all contacts and stores into an array
    function store(order) {
        //get contacts currently in the local storage and store in a variable
        var orderStored = localStorage.getItem('orders');
        //create the contacts array
        var orders = [];
        //populate the contacts array
        if (orderStored) {
            orders = JSON.parse(orderStored);
        }
        //push a new contact onto the end of the contacts array
        orders.push(order);
        //stores all contacts in local storage
        localStorage.setItem('orders', JSON.stringify(orders));

    }
    //this function saves the entered contact data and appends it to the table below the form
    function saveOrder() {
        //initialize a variable that creates an object of the entered data from the form by the serializeForm() function call
        var order = serializeForm();
        //use the system clock $.now() as an Order ID (or Item ID as it says in the assignment)
        order.id = $.now();
        //build the html and row string variables containing the new table row
        var row = $('<tr>');
        var html = '<td>' + order.invoiceDate + '</td>' +
                   '<td>' + order.itemID + '</td>' +
                   '<td>' + order.itemName + '</td>' +
                   '<td>' + order.itemDesc + '</td>' +
                   '<td>' + order.itemQty + '</td>' +
                   '<td>' + order.itemUPrice + '</td>' +
                   '<td>' + order.itemCost + '</td>' +
                   //creates a new button to delete only that record
                   '<td><a class="delete" href="#">Remove</a></td>';
        //assign the Order ID to the row.data().orderID
        row.data().orderID = order.id;
        //append the html data to the row data (after <tr>)
        row.append(html);
        //store the saved data in the local storage
        store(order);
        //append the data to the stored contact table
        $(mainElement).find('table tbody').append(row);
        $(mainElement).find('form :input[name]').val('');

    }
    function totals() {
        //store all the orders into orderStored variable
        orderStored = localStorage.getItem('orders');
        //if there are any stored orders, populate the orders array
        if (orderStored) {
            orders = JSON.parse(orderStored);
            $.each(orders, function (index, order) {
            });
        }
        //if orders array length is greater than 0, continue on
        if (orders.length > 0) {
            //initialize variables
            var sub = 0;
            var ship = 0;
            var tax = 0;
            var total = 0;
            //for loop to extract the itemCost from the orders array for each order
            for (var i = 0; i < orders.length; i++) {
                //store the itemCosts for each order in variable "sub"
                sub += parseFloat(orders[i].itemCost);

            }
            //variable "ship" = "sub" * 0.065 (6.5%)
            ship = sub * 0.065;
            //variable "tax" = (sub + ship) and then mulitply by 0.011 (11%)
            tax = (sub + ship) * 0.011;
            //total = sub + ship + tax (total amount)
            total = sub + ship + tax;
            //output the result for "sub" to the subtotal texbox
            $("#subtotal").val(sub.toFixed(2));
            //output the result for "ship" to the shipping texbox
            $("#shipping").val(ship.toFixed(2));
            //output the result for "tax" to the tax texbox
            $("#tax").val(tax.toFixed(2));
            //output the result for "total" to the total texbox
            $("#total").val(total.toFixed(2));

        }
        else {
            var sub = 0;
            var ship = 0;
            var tax = 0;
            var total = 0;

            $("#subtotal").val(sub.toFixed(2));
            //output the result for "ship" to the shipping texbox
            $("#shipping").val(ship.toFixed(2));
            //output the result for "tax" to the tax texbox
            $("#tax").val(tax.toFixed(2));
            //output the result for "total" to the total texbox
            $("#total").val(total.toFixed(2));
        }
    }

    //this function loads any existing contacts
    function loadOrders() {
        //store the contacts from the local storage into a variable
        var orderStored = localStorage.getItem('orders');
        //if theres any contacts stored, fill the table with that data
        if (orderStored) {
            orders = JSON.parse(orderStored);
            $.each(orders, function (index, order) {
                //build the html and row string variables containing the new table row
                var row = $('<tr>');
                var html = '<td>' + order.invoiceDate + '</td>' +
                           '<td>' + order.itemID + '</td>' +
                           '<td>' + order.itemName + '</td>' +
                           '<td>' + order.itemDesc + '</td>' +
                           '<td>' + order.itemQty + '</td>' +
                           '<td>' + order.itemUPrice + '</td>' +
                           '<td>' + order.itemCost + '</td>' +
                           //creates a new button to delete only that record
                           '<td><a class="delete" href="#">Remove</a></td>';

                row.data().orderID = order.id;
                row.append(html);
                //append the data in row withing the body of the table
                $(mainElement).find('table tbody').append(row);
            });
            totals();
        }

    }
    //this function deletes a single contact from a row
    function deleteOrder(evt) {
        //creates an object of the selected contact to delete
        var orderID = $(evt.target).parents('tr').data().orderID;
        //retrieve all contacts from the local storage
        var orders = JSON.parse(localStorage.getItem('orders'));
        //filter out the the selected contact to delete
        var newOrders = orders.filter(function (o) {
            return o.id != orderID;
        });
        //save the remaining contacts in the local storage
        localStorage.setItem('orders', JSON.stringify(newOrders));
        //remove the table row of that selected contact data
        $(evt.target).parents('tr').remove();
    }
    //this function produces an object containing the entered input form values and returns the result
    function serializeForm() {
        var inputFields = $(mainElement).find('form :input');
        var result = {};
        $.each(inputFields, function (index, value) {
            if ($(value).attr('name')) {
                result[$(value).attr('name')] = $(value).val();
            }
        });
        return result;
    }

}




