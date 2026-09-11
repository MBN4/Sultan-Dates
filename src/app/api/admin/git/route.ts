import { NextResponse } from 'next/server';
import { getGitStatus, getGitDiff, getGitHistory, commitAndPush } from '@/lib/gitService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode');

    if (mode === 'diff') {
      const diff = await getGitDiff();
      return NextResponse.json({ diff });
    }

    if (mode === 'history') {
      const history = await getGitHistory(15);
      return NextResponse.json({ history });
    }

    const status = await getGitStatus();
    return NextResponse.json({ status });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to inspect git repository', details: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'A commit message is required.' }, { status: 400 });
    }

    const result = await commitAndPush(message.trim());

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
          output: result.output,
          details: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      output: result.output,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Git operation failed', details: err.message }, { status: 500 });
  }
}
