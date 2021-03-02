export function logError(error: unknown): void {
  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }

  // eslint-disable-next-line no-console
  console.error(new Error(`Error: ${String(error)}`));
}
