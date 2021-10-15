$(document).ready(function(){
	window.localStorage.clear();
loadItems();
	function loadItems(){
		var appendItems="";
		var items =  [
						{
						  "id" : "1",
						  "name": "Burger",
						  "price": "60"
						},
						{
						  "id" : "2",
						  "name": "Hotdog Sandwich",
						  "price": "80"
						},
						{
						  "id" : "3",
						  "name": "Fries",
						  "price": "40"
						},
						{
						  "id" : "4",
						  "name": "Soft drinks",
						  "price": "20"
						},
						{
						  "id" : "5",
						  "name": "Water",
						  "price": "10"
						}
					  ]
					
		
		for(var i=0; i < items.length ; i++){
			var obj = items[i];
			appendItems += "<tr>";
			appendItems += '<td>' + obj.name +'</td><td>' + obj.price +'</td>';
			appendItems += '<td><button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#exampleModal" data-id="'+ obj.id +'" data-name="'+ obj.name +'" data-price="'+ "₱"+obj.price+'">Add to Cart</button></td></tr>';
		}
		
		window.localStorage.setItem('myItem', items);
		var a = window.localStorage.getItem('myItem');
		$("#itemsBody").html(appendItems);
	}
	
	$('#exampleModal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget); 
	  var name = button.data('name'); 
	  var price = button.data('price'); 
	
	  var modal = $(this)
	  modal.find('.modal-body #item-name').text(name);
	  modal.find('.modal-body #item-price').text(price);
	  modal.find('.modal-body #item-quantity').val(0);
	   modal.find('.modal-body #item-total').val(0);
	})
	
	$("#item-quantity").bind('keyup mouseup', function () {
		var qty = $('#exampleModal').find('.modal-body #item-quantity').val();
		var price = $('#exampleModal').find('.modal-body #item-price').text().replace('₱','');
		var total = parseInt(qty) * parseInt(price);
		$('#exampleModal').find('.modal-body #item-total').text(total);
	});
	
	$('#add').on('click', function () {
	  var stringCartItems ="";
	  var listofItems =  [];
	  var arrayAddCart = {};
	  var cart = window.localStorage.getItem('cartItems');
	  var objCartArray = JSON.parse(cart); 
	  var IsExist = false;
	  var qty,price;
	  
	  
	  arrayAddCart.name = $('#exampleModal').find('.modal-body #item-name').text();
	  arrayAddCart.price =  $('#exampleModal').find('.modal-body #item-price').text();
	  arrayAddCart.quantity = $('#exampleModal').find('.modal-body #item-quantity').val();
	  arrayAddCart.total =  $('#exampleModal').find('.modal-body #item-total').text();
		
	   
	  if(arrayAddCart.quantity != '0' && arrayAddCart.quantity != ''){ 
		  if(objCartArray !=  null){
			if(objCartArray.length >0){   
				//CHECKING IF THERE IS EXISTING ITEM
			   for(var i=0; i < objCartArray.length ; i++){
				  if(objCartArray[i].name == arrayAddCart.name){
					IsExist = true;
					qty = parseInt(arrayAddCart.quantity) + parseInt(objCartArray[i].quantity);
				  }
			   }
			   
			   //ADDING ITEM IN ARRAY
			   if(IsExist){
				  var total = parseInt(qty) * parseInt(arrayAddCart.price.replace('₱',''));
				  arrayAddCart.quantity= qty;
				  arrayAddCart.total = total;
				  listofItems.push(arrayAddCart);
				  for(var i=0; i < objCartArray.length ; i++){
					  if(objCartArray[i].name != arrayAddCart.name){
						listofItems.push(objCartArray[i]);
					  }					
				  }
			   }
			   else{
				  for(var i=0; i < objCartArray.length ; i++){
						listofItems.push(objCartArray[i]);  
				  }
				  listofItems.push(arrayAddCart);
			   }
			} 
		  }
		  else{
			  listofItems.push(arrayAddCart);
		  }
		  
		  
		  stringCartItems = JSON.stringify(listofItems);
		  window.localStorage.setItem('cartItems', stringCartItems);
		  
		  $('#exampleModal').modal('hide');
	  }
	  else{
		  alert('Please input quantity.');
	  }
	});
	
	$('#cartModal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget); 
	  var cart = window.localStorage.getItem('cartItems');
	  var objCartArray = JSON.parse(cart); 
	  var appendItems="";
	  var total = 0;
	  
	  if(objCartArray !=  null){
		   $('#payNow').prop('disabled',false);
		  for(var i=0; i < objCartArray.length ; i++){
				var obj = objCartArray[i];
				appendItems += "<tr>";
				appendItems += '<td>' + obj.name +'</td><td>' + obj.quantity +'</td><td>' + obj.total +'</td></tr>';
				total += parseInt(obj.total);
		  }
		  appendItems += '<td></td><td><b>TOTAL</b></td><td><b>' + total +'</b></td></tr>';
		  $("#cartBody").html(appendItems);
	  }
	  else{
		  alert('Please select items to proceed in payment.');
		   $('#payNow').prop('disabled',true);
	  }
      
	})
	
	$('#ok').on('click', function () {
	  window.localStorage.clear();
	  location.reload();
	})
	
	
});