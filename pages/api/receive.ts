import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  return response.status(200).json({ "status": "success" })
}
