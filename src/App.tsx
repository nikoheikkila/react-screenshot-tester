import './App.css';

import React, { useRef, useState } from 'react';
import ChartContainer from './ChartContainer';
import ContextMenu from './ContextMenu';
import { takeScreenshot } from './screenshot';
import { ImageFormat } from './types';

const formats = [
    { label: 'PNG', value: ImageFormat.PNG },
    { label: 'JPEG', value: ImageFormat.JPEG },
    { label: 'WebP', value: ImageFormat.WEBP },
];

function App() {
    const [format, setFormat] = useState<string>(ImageFormat.PNG);
    const [quality, setQuality] = useState<number>(0.5);

    const captureRef = useRef<HTMLDivElement>(null);

    return (
        <main>
            <ContextMenu className="context-menu">
                {formats.map((format) => (
                    <li key={format.value}>
                        <a
                            href="#"
                            onClick={() => takeScreenshot(captureRef.current, { format: format.value, quality })}
                        >
                            Export to {format.label}
                        </a>
                    </li>
                ))}
            </ContextMenu>

            <header className='header'>
                <h1>React Screenshot Tester</h1>
                <p>
                    Click the button below to save the graph as an image file to disk. Alternatively, right-click on any
                    part of this web page to open a context menu. The image will be saved into your browser's configured
                    download directory.
                </p>
                <p>
                    See the source code at{' '}
                    <a href="https://github.com/nikoheikkila/react-screenshot-tester" target="blank">
                        GitHub
                    </a>
                    .
                </p>
            </header>

            <section className="controls">
                <h2>Controls</h2>

                <label htmlFor="format">Format</label>
                <select id="format" className="format-picker" onChange={(event) => setFormat(event.target.value)}>
                    {formats.map((format) => (
                        <option value={format.value} key={format.value}>
                            {format.label}
                        </option>
                    ))}
                </select>

                <input
                    id="quality"
                    className="quality-picker"
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    value={quality}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuality(Number(event.target.value))}
                />
                <label htmlFor="quality">Quality {quality * 100} %</label>
            </section>

            <button className="capture-button" onClick={() => takeScreenshot(captureRef.current, { format, quality })}>
                Save to Disk
            </button>

            <ChartContainer captureRef={captureRef} />
        </main>
    );
}

export default App;
