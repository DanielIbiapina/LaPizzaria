import { Router } from "express";
import { postClient } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/schemas.validation.js";
import { clientsSchema } from "../schemas/clients.schema.js";

const router = Router();

router.post("/clients", validateSchema(clientsSchema), postClient);

export default router;
