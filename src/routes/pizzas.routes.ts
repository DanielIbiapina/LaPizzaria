import {Router} from "express";
import { postPizza } from "../controllers/pizzas.controller.js";
import { validateSchema } from "../middlewares/schemas.validation.js";
import { pizzasSchema } from "../schemas/pizzas.schema.js";

const router = Router();

router.post("/pizzas", validateSchema(pizzasSchema), postPizza)


export default router;