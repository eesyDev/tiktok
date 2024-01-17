import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/utils/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { comment: { _key }, id } = req.body;
  const deleteComment = []
  if (req.method === 'DELETE') {
    try {
      const data = await client
        .patch(id)
        .unset(['comments[0]'])
        .commit();

      res.status(200).json(data);
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      console.error('Error details:', error.response?.data);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}