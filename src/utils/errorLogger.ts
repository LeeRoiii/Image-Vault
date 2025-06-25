// You can later replace this with something like Sentry or LogRocket
export function logError(error: unknown) {
  if (error instanceof Error) {
    console.error(`[ERROR]: ${error.message}`, error.stack);
  } else {
    console.error(`[UNKNOWN ERROR]:`, error);
  }

  // Example for Sentry:
  // import * as Sentry from "@sentry/browser";
  // Sentry.captureException(error);
}
