import { serialize } from "@/utils/helpers";

export default async function handler (req, res) {
  const serializeQuery = serialize(req.query);

  const baseURL = process.env.BE_API;
  const apiKey = process.env.API_KEY;

  const url = `${baseURL}?${serializeQuery}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from OMDb API" });
  }
};
