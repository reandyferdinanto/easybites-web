import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Helper for fallback if DB fails
let fallbackAdmins = [
  { id: '1', username: 'easybites.admin', password: 'elva123456', isMain: true }
];

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.warn("DB failed, using fallback admin data.");
    return NextResponse.json(fallbackAdmins);
  }
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    try {
      const existing = await prisma.admin.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
      }

      const newAdmin = await prisma.admin.create({
        data: {
          username,
          password, // Store as is according to request, so main admin can see them
          isMain: false
        }
      });
      return NextResponse.json(newAdmin);
    } catch (error) {
      console.warn("DB failed, storing in memory fallback.");
      const exists = fallbackAdmins.find(a => a.username === username);
      if (exists) {
        return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
      }
      
      const newAdmin = {
        id: Date.now().toString(),
        username,
        password,
        isMain: false
      };
      fallbackAdmins.push(newAdmin);
      return NextResponse.json(newAdmin);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
