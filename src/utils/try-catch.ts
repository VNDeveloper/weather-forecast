import { type Result } from '@/types/result';

export default async function tryCatch<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { success: false, error };
  }
}
