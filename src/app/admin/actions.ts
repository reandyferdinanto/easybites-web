'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- PRODUCTS ---
export async function getProducts() {
  try {
    return await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.product.create({
    data: { name, description, price, imageUrl },
  });

  revalidatePath('/');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.product.update({
    where: { id },
    data: { name, description, price, imageUrl: imageUrl || undefined },
  });

  revalidatePath('/');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/products');
}

// --- BLOG POSTS ---
export async function getPosts() {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPost(id: string) {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const category = formData.get('category') as string;
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.post.create({
    data: { title, content, author, category, imageUrl },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const category = formData.get('category') as string;
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.post.update({
    where: { id },
    data: { title, content, author, category, imageUrl: imageUrl || undefined },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
