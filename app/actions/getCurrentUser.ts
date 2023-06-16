import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      console.log("no current user found");
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
        console.log("session found but no user found again")
        return null
    }

    return currentUser
  } catch (error: any) {
    // server action return null instead of throwing error
    return null;
  }
};


export default getCurrentUser