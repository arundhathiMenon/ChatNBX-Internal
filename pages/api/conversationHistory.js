import { prisma } from "../../prisma/db";
 
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { title, chats } = req.body;
    try {
        const createdChat = await prisma.ConversationHistory.create({
            data: {
                title,
                chats,
            },
        });
        res.status(201).json({ message: 'Chats created successfully', messageHistory:createdChat });
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
 