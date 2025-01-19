import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const user = {
      id: '1',
      username,
      email,
      createdAt: new Date(),
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en el registro' },
      { status: 400 }
    );
  }
}