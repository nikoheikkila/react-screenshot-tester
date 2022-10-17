import './App.css';

import { lazy, useRef, useState } from 'react';
import { FormatController, QualityController } from './Controls';
import { formats, takeScreenshot } from './screenshot';
import { ImageFormat } from './types';

const ChartContainer = lazy(() => import('./ChartContainer'));
const ContextMenu = lazy(() => import('./ContextMenu'));
const CaptureButton = lazy(() => import('./CaptureButton'));
const Header = lazy(() => import('./Header'));

function App() {
    const [format, setFormat] = useState<string>(ImageFormat.PNG);
    const [quality, setQuality] = useState<number>(0.9);
    const captureRef = useRef<HTMLDivElement>(null);

    const handleCapture = () => {
        takeScreenshot(captureRef.current, { format, quality });
    };

    const dropDownMenu = formats.map((format) => (
        <li key={format.value}>
            <a href="#" onClick={() => takeScreenshot(captureRef.current, { format: format.value, quality })}>
                Export to {format.label}
            </a>
        </li>
    ));

    return (
        <main role="main">
            <ContextMenu className="context-menu">{dropDownMenu}</ContextMenu>
            <Header className="header" />
            <section className="controls">
                <FormatController value={format} setValue={setFormat} />
                <QualityController value={quality} setValue={setQuality} />
            </section>
            <CaptureButton className="capture-button" onClick={handleCapture} />
            <ChartContainer captureRef={captureRef} />
        </main>
    );
}

export default App;
