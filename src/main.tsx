import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<div className="loading">Loading application ...</div>}>
            <App />
        </Suspense>
    </React.StrictMode>,
);
