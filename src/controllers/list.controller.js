import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createList = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el middleware de autenticación

    const newList = await prisma.list.create({
      data: {
        name: name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};


export const getAllLists = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el middleware de autenticación

    const lists = await prisma.list.findMany({
      where: {
        userId: userId,
      },
      include: {
        favorites: true,
      },
    });

    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const getListById = async (req, res) => {
  try {
   const userId = req.user.id; // Obtén el ID del usuario autenticado desde el middleware de autenticación
    const listId = req.params.listId; // Obtén el ID de la lista desde los parámetros de la ruta

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        userId: userId,
      },
      include: {
        favorites: true,
      },
    });

    if (!list) {
      return res.status(404).json({ error: true, message: "List not found" });
    }

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const addFavoriteToList = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el middleware de autenticación
    const listId = req.params.listId; // Obtén el ID de la lista desde los parámetros de la ruta
    const { title, description, link } = req.body;

    const newList = await prisma.list.update({
      where: {
        id: listId,
        userId: userId,
      },
      data: {
        favorites: {
          create: {
            title: title,
            description: description,
            link: link,
          },
        },
      },
      include: {
        favorites: true,
      },
    });

    res.status(200).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const deleteList = async (req, res) => {
  try {
    const listId = parseInt(req.params.id);
    const userId = req.user.id;

    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list || list.userId !== userId) {
      return res.status(404).json({ error: "List not found" });
    }

    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting list" });
  }
};