import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

export async function createUser(userData: {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
}) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
