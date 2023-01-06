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
const userMealsOrder = []
const menuSection = document.getElementById('menu-section')
const orderingSection = document.getElementById('ordering-section')

// --------------------------- event lisnters --------------------------
// THIS SECTION NEED TO REVIEW AND REDESIGN ... A LOT OF UNNEEDED CODE !!!

document.addEventListener('click', e => {
    // ID FORMAT: increase-meal-INDEX
    switch(e.target.id) {
        case "increase-meal-0": 
            addMealToOrder(0)
            render() // it should render order only.. not the menu and order
            break;
        case "increase-meal-1": 
            addMealToOrder(1) 
            render()
            break;
        case "increase-meal-2": 
        addMealToOrder(2)
        render()
        break
    }
})

function addMealToOrder(mealId) {
    let mealObject = getMealObject(mealId)
    if(isExistsInOrder(mealObject.id)) {
        increaseMealCount(mealObject.id)
    }
    else {
        userMealsOrder.push({
            id: mealId,
            name: mealObject.name,
            price: mealObject.price,
            count: 1
        })
    }
}

function getMealObject(mealId) {
    for(let meal of menuArray)
        if (meal.id === mealId)
            return meal
}

function isExistsInOrder(mealId) {
    for(let meal of userMealsOrder)
        if (meal.id === mealId)
            return true
    return false
}

function increaseMealCount(mealId) {
    for(let meal of userMealsOrder)
        if (meal.id === mealId) {
            meal.count++
            break
        }
}

// ---------------------------------------------------------------------

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
                    
                <button id="increase-meal-${meal.id}" class="increase-btn margin-left-auto">+</button>
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
    if(isThereOrder()) {
        orderHtml = `       
        <div class="container">
            <div class="order-elements">
                <h3 class="order-title">Your order</h3>

                ${getOrderDetails()}

                <hr class="black-line">

                <div class="meal-order-info">
                    <p>Total price:</p>
                    <p class="margin-left-auto">$${getOrderTotalPrice()}</p>
                </div>

                <button class="complete-order">Complete order</button>

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

function isThereOrder() {
    return userMealsOrder.length != 0
}

function getOrderDetails() {
    let orderDetailsHtml = "" 
    userMealsOrder.forEach( meal => {
        orderDetailsHtml += `
        <div class="meal-order-info">
            <p>${meal.count}x ${meal.name}</p>
            <button class="remove-meal">remove</button>
            <p class="margin-left-auto">$${meal.price * meal.count}</p>
        </div>`
    })
    return orderDetailsHtml
}

function getOrderTotalPrice() {
    let totalPrice = 0
    userMealsOrder.forEach( meal => totalPrice += meal.price * meal.count)
    return totalPrice
}

function render() {
    menuSection.innerHTML = getMenuHtml()
    orderingSection.innerHTML = getOrderHtml()
}

render()

