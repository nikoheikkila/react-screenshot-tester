import './App.css';

import range from 'lodash/range';
import React, { useRef, useState } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { takeScreenshot } from './screenshot';
import { ImageFormat } from './types';

interface ChartProps {
    captureRef: React.RefObject<HTMLDivElement>;
}

const chartData = range(1, 100).map((x) => ({
    x,
    y: Math.random(),
}));

function App() {
    const [format, setFormat] = useState<string>(ImageFormat.PNG);
    const [quality, setQuality] = useState<number>(0.5);

    const captureRef = useRef<HTMLDivElement>(null);

    return (
        <main>
            <header>
                <h1>React Screenshot Tester</h1>
                <p>Click the button below to save the graph as an image file to disk.</p>
                <p>The image will be saved into your browser's configured download directory.</p>
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
                    <option value={ImageFormat.PNG}>PNG</option>
                    <option value={ImageFormat.JPEG}>JPEG</option>
                    <option value={ImageFormat.WEBP}>WebP</option>
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

const ChartContainer: React.FC<ChartProps> = ({ captureRef }) => {
    return (
        <section ref={captureRef}>
            <h2>Example Chart</h2>
            <VictoryChart theme={VictoryTheme.material} width={window.innerWidth} height={window.innerHeight}>
                <VictoryLine data={chartData} />
            </VictoryChart>
        </section>
    );
};

export default App;
