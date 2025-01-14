import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { body, postId, userId } = await req.json();

    const comment = await Comment.create({ body, post: postId, user: userId });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return NextResponse.json(comment);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
