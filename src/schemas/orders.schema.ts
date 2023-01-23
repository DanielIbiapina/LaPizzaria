import joi from "joi"

export const ordersSchema = joi.object({
    clientId: joi.number(),
    pizzaId: joi.number(),
    quantity: joi.number().greater(0).less(5),
    totalPrice:joi.number()
})