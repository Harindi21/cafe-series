export async function backendGet<T>(
  path: string,
  buildFallback: T
): Promise<T> {
  if (process.env.SKIP_BACKEND_FETCH_DURING_BUILD === 'true') {
    return buildFallback;
  }

  const baseUrl =
    process.env.BACKEND_INTERNAL_URL ?? 'http://localhost:8080';

  const response = await fetch(`${baseUrl}${path}`, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(
      `Backend request ${path} returned ${response.status}`
    );
  }

  return (await response.json()) as T;
}