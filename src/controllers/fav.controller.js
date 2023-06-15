import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getAllFavs = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      include: {
        list: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const computedData = favorites.map(({ user, list,  description, link }) => {
      return {
        user: user.email,
        list: list.name,
        description: `${description} ${link}`,
      };
    });

    res.status(200).json(computedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};