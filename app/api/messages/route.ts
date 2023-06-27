import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currrentUser = await getCurrentUser();
    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!currrentUser?.id || !currrentUser?.email) {
      return new NextResponse("Unauthrized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currrentUser.id,
          },
        },
        seen: {
          connect: {
            id: currrentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    await pusherServer.trigger(conversationId, "message:new", newMessage);
    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESS");
    return new NextResponse("Internal erorr", { status: 500 });
  }
}
