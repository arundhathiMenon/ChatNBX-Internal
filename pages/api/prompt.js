import { prisma } from "../../prisma/db";
import axios from "axios";

export default async function prompt(req, res) {
    const apiUrl = 'https://proxy.tune.app/chat/completions';
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
      const response = await axios.post(apiUrl, req.body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":  "nbx_ZkmWvYaTfOVp52hYpqc8r6Ti1s7pMUqsxUR"
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };