import {Router} from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/orders.controller.js";
import { validateSchema } from "../middlewares/schemas.validation.js";
import { ordersSchema } from "../schemas/orders.schema.js";


const router = Router();

router.post("/order",validateSchema(ordersSchema), postOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrdersById);


export default router;