import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'assets', 'images');

export async function GET() {
  try {
    await fs.mkdir(MEDIA_DIR, { recursive: true });
    const entries = await fs.readdir(MEDIA_DIR, { withFileTypes: true });

    const files = await Promise.all(
      entries
        .filter(entry => entry.isFile() && !entry.name.startsWith('.'))
        .map(async entry => {
          const filePath = path.join(MEDIA_DIR, entry.name);
          const stats = await fs.stat(filePath);
          return {
            name: entry.name,
            url: `/assets/images/${entry.name}`,
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
            extension: path.extname(entry.name).toLowerCase(),
          };
        })
    );

    // Sort newest first
    files.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ files });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to list media', details: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitize filename
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
    const ext = path.extname(originalName) || '.jpg';
    const base = path.basename(originalName, ext);
    const timestamp = Date.now();
    const filename = `${base}-${timestamp}${ext}`;

    const filePath = path.join(MEDIA_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      file: {
        name: filename,
        url: `/assets/images/${filename}`,
        size: buffer.length,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to upload media', details: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('name');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Safety check: ensure filename doesn't traverse path
    const safeName = path.basename(filename);
    const filePath = path.join(MEDIA_DIR, safeName);

    await fs.unlink(filePath);

    return NextResponse.json({ success: true, message: `File ${safeName} deleted successfully` });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to delete file', details: err.message }, { status: 500 });
  }
}
