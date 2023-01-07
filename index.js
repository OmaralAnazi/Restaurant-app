const menuArray = [
    {
        id: 0,
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        price: 14,
        image: "images/pizza.png"
    },
    {
        id: 1,
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        image: "images/hamburger.png"
    },
    {
        id: 2,
        name: "Pepsi",
        ingredients: ["carbonated water, sugar"],
        price: 2.5,
        image: "images/pepsi.png"
    },
]
const menuSection = document.getElementById('menu-section')
const orderingSection = document.getElementById('ordering-section')
const creditCardWindow = document.getElementById('credit-card-window')
const creditCardForm = document.getElementById('credit-card-form') 
let userMealsBasket = []

creditCardForm.addEventListener('submit', e => {
    e.preventDefault()

    hideCreditCardWindow()
    let username = new FormData(creditCardForm).get('username')
    userMealsBasket = []
    creditCardForm.reset()
    showConfirmOrderMessage(username)
})

function showConfirmOrderMessage(username) {
    disableMainBtns()
    orderingSection.innerHTML = `
    <div class="container successful-payment-state">
        <div class="sub-container">
            <p class="successful-message">Thanks, <span class="bold">${username}!</span> Your order is on its way!</p>
            <button id="confirm-receiving-btn">Confirm receiving order</button> 
        </div>
    </div>
    `
}

document.addEventListener('click', e => {
    switch(e.target.id) {
        case "increase-meal-0": 
            addMealToOrder(0)
            break
        case "increase-meal-1": 
            addMealToOrder(1) 
            break
        case "increase-meal-2": 
            addMealToOrder(2)
            break
        case "decrease-meal-0": 
            removeMealFromOrder(0)
            break
        case "decrease-meal-1": 
            removeMealFromOrder(1)
            break
        case "decrease-meal-2": 
            removeMealFromOrder(2)
            break
        case "complete-order-btn":
            showCreditCardWindow()
            break
        case "close-payment-btn":
            hideCreditCardWindow()
            break
        case "confirm-receiving-btn":
            confirmReceivingOrder()
            break
    }
})

function addMealToOrder(mealId) {
    const mealInBasket = getMealObjectFromArray(mealId, userMealsBasket)
    if(mealInBasket) {
        mealInBasket.count++
    }
    else {
        const mealInMenu = getMealObjectFromArray(mealId, menuArray)
        userMealsBasket.push({
            id: mealInMenu.id,
            name: mealInMenu.name,
            price: mealInMenu.price,
            count: 1
        })
    }
    renderOrder()
}

function removeMealFromOrder(mealId) {
    const mealInBasket = getMealObjectFromArray(mealId, userMealsBasket)
    mealInBasket.count--
    if (mealInBasket.count === 0) {
        const mealIndex = userMealsBasket.indexOf(mealInBasket);
        userMealsBasket.splice(mealIndex, 1);
    }
    renderOrder()
}

function getMealObjectFromArray(mealId, array) {
    for(let meal of array)
        if (meal.id === mealId)
            return meal
}

function hideCreditCardWindow() {
    creditCardWindow.classList.add('hidden')
    enableMainBtns()
}

function showCreditCardWindow() {
    creditCardWindow.classList.remove('hidden')
    disableMainBtns()
}

function disableMainBtns() {
    document.querySelectorAll(".main-btns").forEach(button => {
        button.disabled = true
        button.style.pointerEvents = "none"
    })
}

function enableMainBtns() {
    document.querySelectorAll(".main-btns").forEach(button => {
        button.disabled = false
        button.style.pointerEvents = "all"
    })
}

function confirmReceivingOrder() {
    enableMainBtns()
    renderOrder()
}

function getMenuHtml() {
    let menuHtml = ""
    menuArray.forEach( meal => {
        menuHtml += `
        <div class="container">
            <div class="flex-box">
                <image src="${meal.image}" alt="${meal.name} meal" class="meal-img">
                
                <div class="meal-details">
                    <h2 class="meal-name">${meal.name}</h2>
                    <p class="meal-ingredients">${getIngredientsAsText(meal.ingredients)}</p>
                    <h3 class="meal-price">$${meal.price}</h3>
                </div>
                    
                <button id="increase-meal-${meal.id}" class="main-btns increase-btn margin-left-auto">+</button>
            </div>
            <hr>
        </div>

        `
    })
    return menuHtml 
}

function getIngredientsAsText(ingredientsArray) {
    let ingredientsText = ''
    ingredientsArray.forEach(ingredient => ingredientsText += ingredient + ", ")
    return ingredientsText.substring(0, ingredientsText.length-2)
}

function getOrderHtml() {
    let orderHtml = ""
    if(! isBasketEmpty()) {
        const [orderDetailsHtml, totalPrice] = getOrderDetailsAndTotalPrice()
        orderHtml = `       
        <div class="container">
            <div class="order-elements">
                <h3 class="order-title">Your order</h3>

                ${orderDetailsHtml}

                <hr class="black-line">

                <div class="meal-order-info">
                    <p>Total price:</p>
                    <p class="margin-left-auto">$${totalPrice}</p>
                </div>

                <button id="complete-order-btn" class="main-btns complete-order">Complete order</button>

            </div>
        </div>`
    }
    else { // insert an empty space instead of the order info
        orderHtml = `
        <div class="container"> 
            <br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br>
        </div>`
    }
    return orderHtml
}

function isBasketEmpty() {
    return userMealsBasket.length === 0
}

function getOrderDetailsAndTotalPrice() {
    let orderDetailsHtml = "" 
    let totalPrice = 0
    userMealsBasket.forEach( meal => {
        orderDetailsHtml += `
        <div class="meal-order-info">
            <p>${meal.count}x ${meal.name}</p>
            <button id="decrease-meal-${meal.id}" class="main-btns remove-meal">remove</button>
            <p class="margin-left-auto">$${meal.price * meal.count}</p>
        </div>`
        totalPrice += meal.price * meal.count
    })
    return [orderDetailsHtml, totalPrice]
}

function renderMenu() {
    menuSection.innerHTML = getMenuHtml()
}

function renderOrder() {
    orderingSection.innerHTML = getOrderHtml()
}

renderMenu()
renderOrder()