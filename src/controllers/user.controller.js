import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const generateToken = (req, res) => {
  try {
    const { user } = req.body;
    const payload = { ...user };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).json({ ...user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }

    const isValidUser = bcrypt.compareSync(password, user.password);

    if (isValidUser) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }

    const hash = bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({
      data: { email: email, password: hash },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

//MIDDLEWARE

