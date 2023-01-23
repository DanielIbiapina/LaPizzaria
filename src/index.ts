import express from 'express';
import cors from 'cors';
import pizzasRoutes from "./routes/pizzas.routes.js"
import clientsRoutes from "./routes/clients.routes.js"
import ordersRoutes from "./routes/orders.routes.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use(clientsRoutes);
app.use(ordersRoutes);
app.use(pizzasRoutes)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
