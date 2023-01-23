import joi from "joi"

export const pizzasSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().greater(0).required(),
    image: joi.string().required(),
    description: joi.string()
})