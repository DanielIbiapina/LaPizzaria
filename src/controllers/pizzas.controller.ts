import prisma from "../database/db.js";
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

  /*const nameExiste: QueryResult = await connectionDB.query(
    "SELECT name FROM pizzas WHERE name=$1;",
    [name]
  );*/
  const nameExiste = await prisma.pizzas.findFirst({
    where: {
      name,
    },
  });

  if (nameExiste) {
    res.status(409).send("Essa pizza já existe!");
    return;
  }

  /*await connectionDB.query(
    "INSERT INTO pizzas (name, price, image, description) VALUES ($1, $2, $3, $4);",
    [name, price, image, description]
  );*/
  await prisma.pizzas.create({
    data: {
      name,
      price,
      image,
      description,
    },
  });
  res.sendStatus(201);
}
