import {Router} from "express";
import { getClientOrders, postClient } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/schemas.validation.js";
import { clientsSchema } from "../schemas/clients.schema.js";


const router = Router();

router.post("/clients", validateSchema(clientsSchema), postClient)
router.get("/clients/:id/orders", getClientOrders)


export default router;