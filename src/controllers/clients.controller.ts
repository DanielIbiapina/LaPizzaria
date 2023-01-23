import { connectionDB } from "../database/db.js";
import { Request, Response } from "express";
import { QueryResult } from "pg";

export async function postClient(req: Request, res: Response) {
  const {
    name,
    address,
    phone,
  }: { name: string; address: string; phone: string } = req.body;
  await connectionDB.query(
    "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);",
    [name, address, phone]
  );
  res.sendStatus(201);
}
export async function getClientOrders(req: Request, res: Response) {
  const { id } = req.params;

  const clientIdExiste: QueryResult = await connectionDB.query(
    "SELECT id FROM clients WHERE id=$1;",
    [id]
  );

  if (clientIdExiste.rowCount === 0) {
    res.status(404).send("Esse cliente não existe!");
    return;
  }

  const clientOrders: QueryResult = await connectionDB.query(
    'SELECT orders.id AS "orderId", orders.quantity, orders."createdAt", orders."totalPrice", pizzas.name AS "pizzaName" FROM orders JOIN clients ON orders."clientId" = clients.id JOIN pizzas ON orders."pizzaId" = pizzas.id WHERE orders."clientId"  = $1;',
    [id]
  );

  res.send(clientOrders.rows);
}
