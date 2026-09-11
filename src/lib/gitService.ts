import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export interface GitFileStatus {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'untracked' | 'renamed' | 'copied' | 'unknown';
  rawCode: string;
}

export interface GitStatusResult {
  branch: string;
  isClean: boolean;
  files: GitFileStatus[];
  remoteUrl?: string;
  lastCommit?: {
    hash: string;
    message: string;
    author: string;
    date: string;
  };
}

export interface GitCommitResult {
  success: boolean;
  message: string;
  commitHash?: string;
  output?: string;
  error?: string;
}

export async function getGitStatus(): Promise<GitStatusResult> {
  try {
    // Branch name
    const { stdout: branchOut } = await execPromise('git rev-parse --abbrev-ref HEAD');
    const branch = branchOut.trim() || 'main';

    // Remote origin url
    let remoteUrl = '';
    try {
      const { stdout: remoteOut } = await execPromise('git remote get-url origin');
      remoteUrl = remoteOut.trim();
    } catch {
      // Remote might not exist or failed
    }

    // Status porcelain
    const { stdout: statusOut } = await execPromise('git status --porcelain=v1');
    const lines = statusOut.split('\n').filter(line => line.trim().length > 0);

    const files: GitFileStatus[] = lines.map(line => {
      const code = line.substring(0, 2).trim();
      const filePath = line.substring(3).trim();

      let status: GitFileStatus['status'] = 'unknown';
      if (code === 'M' || code === 'MM' || code.includes('M')) status = 'modified';
      else if (code === 'A' || code === 'AM') status = 'added';
      else if (code === 'D') status = 'deleted';
      else if (code === '??') status = 'untracked';
      else if (code === 'R') status = 'renamed';
      else if (code === 'C') status = 'copied';

      return {
        path: filePath,
        status,
        rawCode: code,
      };
    });

    // Last commit details
    let lastCommit: GitStatusResult['lastCommit'] = undefined;
    try {
      const { stdout: logOut } = await execPromise('git log -1 --format="%h|%s|%an|%cr"');
      const parts = logOut.trim().split('|');
      if (parts.length >= 4) {
        lastCommit = {
          hash: parts[0],
          message: parts[1],
          author: parts[2],
          date: parts[3],
        };
      }
    } catch {
      // No commits yet
    }

    return {
      branch,
      isClean: files.length === 0,
      files,
      remoteUrl,
      lastCommit,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      branch: 'unknown',
      isClean: true,
      files: [],
      remoteUrl: '',
      lastCommit: undefined,
    };
  }
}

export async function getGitDiff(): Promise<string> {
  try {
    const { stdout } = await execPromise('git diff HEAD');
    return stdout;
  } catch {
    try {
      const { stdout } = await execPromise('git diff');
      return stdout;
    } catch {
      return 'No diff available.';
    }
  }
}

export async function getGitHistory(limit = 10): Promise<Array<{ hash: string; message: string; author: string; date: string }>> {
  try {
    const { stdout } = await execPromise(`git log -n ${limit} --format="%h|%s|%an|%cr"`);
    return stdout
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        const [hash, message, author, date] = line.split('|');
        return { hash, message, author, date };
      });
  } catch {
    return [];
  }
}

export async function commitAndPush(commitMessage: string): Promise<GitCommitResult> {
  if (!commitMessage || commitMessage.trim().length === 0) {
    return {
      success: false,
      message: 'Commit message is required.',
    };
  }

  const cleanMessage = commitMessage.replace(/"/g, '\\"');

  try {
    // 1. Stage all changes
    await execPromise('git add -A');

    // 2. Commit
    const { stdout: commitOut } = await execPromise(`git commit -m "${cleanMessage}"`);

    // 3. Push to origin branch
    const { stdout: branchOut } = await execPromise('git rev-parse --abbrev-ref HEAD');
    const branch = branchOut.trim() || 'main';

    let pushOut = '';
    try {
      const pushRes = await execPromise(`git push origin ${branch}`);
      pushOut = pushRes.stdout + (pushRes.stderr ? `\n${pushRes.stderr}` : '');
    } catch (pushErr: unknown) {
      const pErr = pushErr as { message?: string; stderr?: string };
      return {
        success: false,
        message: `Committed locally, but push failed: ${pErr.stderr || pErr.message || 'Remote push error'}`,
        output: commitOut,
        error: pErr.stderr || pErr.message,
      };
    }

    return {
      success: true,
      message: `Successfully committed and pushed to origin/${branch}!`,
      output: `${commitOut}\n${pushOut}`,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; stdout?: string; stderr?: string };
    return {
      success: false,
      message: err.stderr || err.message || 'An error occurred during git commit/push',
      error: err.stderr || err.message,
      output: err.stdout,
    };
  }
}
