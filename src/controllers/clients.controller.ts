import { Request, Response } from "express";
import { QueryResult } from "pg";
import prisma from "../database/db";

export async function postClient(req: Request, res: Response) {
  const {
    name,
    address,
    phone,
  }: { name: string; address: string; phone: string } = req.body;
  /*await connectionDB.query(
    "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);",
    [name, address, phone]
  );*/
  prisma.clients.create({
    data: {
      name,
      address,
      phone,
    },
  });
  res.sendStatus(201);
}
