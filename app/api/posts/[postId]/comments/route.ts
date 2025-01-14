import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectToDatabase();
    const { postId } = await route.params;

    const { currentUser }: any = await getServerSession(authOptions);

    const post = await Post.findById(postId)
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "user",
          model: User,
          select: "name email profileImage _id username"
        },
        options: {
          sort: { likes: -1 }
        }
      })
      .sort({ createdAt: -1 });

    const filteredComments = post.comments.map((comment: any) => ({
      body: comment.body,
      createdAt: comment.createdAt,
      user: {
        _id: comment.user._id,
        name: comment.user.name,
        username: comment.user.username,
        profileImage: comment.user.profileImage,
        email: comment.user.email
      },
      likes: comment.likes.length,
      hasLiked: comment.likes.includes(currentUser._id),
      _id: comment._id
    }));

    return NextResponse.json(filteredComments);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
