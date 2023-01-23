import { connectionDB } from "../database/db.js";
import { Request, Response } from "express";
import { QueryResult } from "pg";

export async function postPizza(req: Request, res: Response) {
  const {
    name,
    price,
    image,
    description,
  }: { name: string; price: number; image: string; description: string } =
    req.body;

  const nameExiste: QueryResult = await connectionDB.query(
    "SELECT name FROM pizzas WHERE name=$1;",
    [name]
  );

  if (nameExiste.rowCount > 0) {
    res.status(409).send("Essa pizza já existe!");
    return;
  }

  await connectionDB.query(
    "INSERT INTO pizzas (name, price, image, description) VALUES ($1, $2, $3, $4);",
    [name, price, image, description]
  );
  res.sendStatus(201);
}
