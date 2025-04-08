import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // Delete all messages for this chat
    await db.message.deleteMany({
      where: {
        userId: userId
      }
    });

    // Delete the chat session
    await db.chatSession.delete({
      where: {
        userId: userId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json(
      { error: 'Failed to delete chat' },
      { status: 500 }
    );
  }
} 