# LaPizzaria

post /pizzas:
{

    "name": "Marguerita",

    "price": 13.00,

    "image":"https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2020/08/pizza-margherita.jpg?fit=1200%2C675&ssl=1",

    "description": "Pizza sem recheio"

}

post /clients: {

    "name": "Daniel",

    "address": "Rua tal",

    "phone": "8599999999"

}

post /order: {

    "clientId": 1,

    "pizzaId": 1,

    "quantity": 2,

    "totalPrice": 26.00

}

get /orders

get /orders?date=YYYY-MM-DD

get /orders/:id
