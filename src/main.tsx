import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-600">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={() => location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Reload
      </button>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </Suspense>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
