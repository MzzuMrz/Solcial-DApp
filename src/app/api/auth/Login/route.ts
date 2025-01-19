import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Aquí implementarías la lógica de verificación con tu backend
    // Por ahora retornamos un usuario de ejemplo
    const user = {
      id: '1',
      username: 'usuario_ejemplo',
      email,
      createdAt: new Date(),
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en la autenticación' },
      { status: 401 }
    );
  }
}
