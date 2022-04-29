import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    apiURL: string | undefined;
};

export default function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ apiURL: process.env.BACKEND_URL });
}
