import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limitar a 10 posts por carga
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, attachments = [] } = body;

    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Crear el post en la base de datos
    const newPost = await prisma.post.create({
      data: {
        content,
        attachments,
        authorId: session.user.id,
        authorUsername: session.user.name || 'Usuario anónimo',
        authorWallet: session.user.wallet || null,
      }
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Error al crear post' },
      { status: 500 }
    );
  }
}