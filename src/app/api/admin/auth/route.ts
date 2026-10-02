import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
    }

    // Hardcode fallback if DB is not available / initialized
    // Requirements: admin utama: easybites.admin / elva123456
    let admin = null;
    
    try {
      admin = await prisma.admin.findUnique({
        where: { username }
      });
    } catch (dbError) {
      console.warn("Database connection failed. Using hardcoded auth.");
    }

    if (!admin) {
      // Fallback auth
      if (username === 'easybites.admin' && password === 'elva123456') {
        return NextResponse.json({
          user: {
            username: 'easybites.admin',
            isMain: true
          }
        });
      }
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    // Checking DB auth
    if (admin.password !== password) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        username: admin.username,
        isMain: admin.isMain
      }
    });

  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal server' }, { status: 500 });
  }
}
