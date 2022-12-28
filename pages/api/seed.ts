// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDate } from "../../database";
import { Entry } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "Can not have access to this endpoint." });
  }
  await db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedDate.entries);
  await db.disconnect();

  res.status(200).json({ message: "Task is Done" });
}
