import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/adminDataService';

export async function GET() {
  try {
    const data = await readJsonFile('siteContent.json');
    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to read site content', details: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await writeJsonFile('siteContent.json', body);
    return NextResponse.json({ success: true, message: 'Site content updated successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to update site content', details: err.message }, { status: 500 });
  }
}
