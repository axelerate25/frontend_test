if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready);
} else {
    ready();
}

function ready() {                                                               //Extracting the button from class name. Iterate through array and remove                                                              
    var removeCartItemButton = document.getElementsByClassName('btn-danger')    //clicked element. Calls update on total sum
    for (var i = 0; i < removeCartItemButton.length; i++) {
        if (removeCartItemButton) {
            removeCartItemButton[i].addEventListener('click', removeCartItem);
        }
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var j = 0; j < quantityInputs.length; j++) {
        var input = quantityInputs[j];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for (var k = 0; k < addToCartButton.length; k++) {
        var button = addToCartButton[k];
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener
        ('click', purchaseClicked)
    
}

function purchaseClicked(event) {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.firstChild) {
        var a = cartItems.firstChild
        cartItems.removeChild(a);
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    console.log(title,price,image)
    addItemToCart(title,price,image)
    updateCartTotal();
}

function addItemToCart(title,price,image) {                                         //Adding a new Cart element, using HTML-code directly from <div> cart-row
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <div class = "cart-item cart-column">
            <img class = "cart-title-image" 
            src="${image}"height="100" width="100">
            <span class = "cart-item-title">${title}</span>
        </div>
        <span class = "cart-price cart-column">${price}</span>
        <div class = "cart-quantity cart-column">
            <input  class = "cart-quantity-input" type = "number" value = "1">
            <button class = "btn btn-danger" role="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].
        addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].
        addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


function updateCartTotal() {                                                    //Sum om items, each item is product of quantity and price. Display in Total
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];   //cart-items contain all items in cart, length=1. Thereby index [0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');        //Iterate thorugh remaining cart-rows
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {                                 //The [0] element is header
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total * 100)/100;
    var cartTotalPrice = document.getElementsByClassName('cart-total-price')[0].
        innerText = '$' + total;
}

