import { prisma } from "../../prisma/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { conversation_id, query, response } = req.body;
  try {
    const createdChat = await prisma.conversation_history.create({
      data: {
        conversation_id,
        query,
        response,
      },
    });
    console.log("createdChat", createdChat);
    res
      .status(201)
      .json({
        message: "Chats created successfully",
        messageHistory: createdChat,
      });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
