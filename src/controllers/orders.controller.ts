import { Request, Response } from "express";
import { QueryResult } from "pg";
import prisma from "../database/db";

type OrderType = {
  client: {
    id: number;
    name: string;
    address: string;
    phone: string;
  };
  pizza: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  orderId: number;
  createdAt: string;
  quantity: number;
  totalPrice: number;
};
export async function postOrder(req: Request, res: Response) {
  const {
    clientId,
    pizzaId,
    quantity,
    totalPrice,
  }: {
    clientId: number;
    pizzaId: number;
    quantity: number;
    totalPrice: number;
  } = req.body;

  const clientIdExiste = prisma.clients.findFirst({
    where: {
      id: clientId,
    },
  });

  if (!clientIdExiste) {
    res.status(404).send("Esse cliente não existe!");
    return;
  }

  const pizzaIdExiste = prisma.pizzas.findFirst({
    where: {
      id: pizzaId,
    },
  });

  if (!pizzaIdExiste) {
    res.status(404).send("Esse cliente não existe!");
    return;
  }

  /*await connectionDB.query(
    'INSERT INTO orders ("clientId", "pizzaId", "quantity", "totalPrice") VALUES ($1, $2, $3, $4);',
    [clientId, pizzaId, quantity, totalPrice]
  );*/
  await prisma.orders.create({
    data: {
      clientId,
      pizzaId,
      quantity,
      totalPrice,
    },
  });
  res.sendStatus(201);
}

export async function getOrders(req: Request, res: Response) {
  const { date } = req.query;

  try {
    const ordersArray: OrderType[] = [];
    let objeto: OrderType;
    let orders: QueryResult;
    const dataClients = await prisma.clients.findMany();
    const dataPizzas = await prisma.pizzas.findMany();
    const dataOrders = await prisma.orders.findMany();
    if (date) {
      /*orders = await connectionDB.query(
        `SELECT clients.*, pizzas.*, clients.id AS "clientId", clients.name AS "clientName", pizzas.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN pizzas ON orders."pizzaId" = pizzas.id WHERE orders."createdAt"::date = $1;`,
        [date]
      );
      */
    } else {
      /*orders = await connectionDB.query(
        'SELECT clients.*, pizzas.*, clients.id AS "clientId", clients.name AS "clientName", pizzas.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN pizzas ON orders."pizzaId" = pizzas.id;'
      );*/
    }
    for (let count = 0; count < orders.rowCount; count++) {
      objeto = {
        client: {
          id: orders.rows[count].clientId,
          name: orders.rows[count].clientName,
          address: orders.rows[count].address,
          phone: orders.rows[count].phone,
        },
        pizza: {
          id: orders.rows[count].id,
          name: orders.rows[count].name,
          price: orders.rows[count].price,
          description: orders.rows[count].description,
          image: orders.rows[count].image,
        },
        orderId: orders.rows[count].orderId,
        createdAt: orders.rows[count].createdAt,
        quantity: orders.rows[count].quantity,
        totalPrice: orders.rows[count].totalPrice,
      };
      ordersArray.push(objeto);
    }
    if (ordersArray.length == 0) {
      res.send(ordersArray).status(404);
      return;
    }
    res.send(ordersArray);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getOrdersById(req: Request, res: Response) {
  const { id } = req.params;

  /*const orderIdExiste: QueryResult = await connectionDB.query(
    "SELECT id FROM orders WHERE id=$1;",
    [id]
  );*/
  const orderIdExiste = await prisma.orders.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!orderIdExiste) {
    res.status(404).send("Esse pedido não existe!");
    return;
  }

  try {
    const ordersArray: OrderType[] = [];
    let objeto: OrderType;
    let orders;
    /*const orders: QueryResult = await connectionDB.query(
      'SELECT clients.*, pizzas.*, clients.id AS "clientId", clients.name AS "clientName", pizzas.*, orders.id AS "orderId", orders."createdAt", orders.quantity, orders."totalPrice" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN pizzas ON orders."pizzaId" = pizzas.id WHERE orders.id = $1;',
      [id]
    );*/
    for (let count = 0; count < orders.rowCount; count++) {
      objeto = {
        client: {
          id: orders.rows[count].clientId,
          name: orders.rows[count].clientName,
          address: orders.rows[count].address,
          phone: orders.rows[count].phone,
        },
        pizza: {
          id: orders.rows[count].id,
          name: orders.rows[count].name,
          price: orders.rows[count].price,
          description: orders.rows[count].description,
          image: orders.rows[count].image,
        },
        orderId: orders.rows[count].orderId,
        createdAt: orders.rows[count].createdAt,
        quantity: orders.rows[count].quantity,
        totalPrice: orders.rows[count].totalPrice,
      };
      ordersArray.push(objeto);
    }
    res.send(ordersArray[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
