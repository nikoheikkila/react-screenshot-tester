import "./App.css";

import html2canvas from "html2canvas";
import range from "lodash/range";
import React, { useRef, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const data = range(1, 100).map((x) => ({
    x,
    y: Math.random(),
}));

const parseExtension = (mimeType: string): string => {
    const [, extension] = mimeType.split("/");
    return extension;
}

const parseBackgroundColor = (format: string) => {
    return format.endsWith('png') ? 'transparent' : '#FFF';
}

const createImage = async (target: HTMLElement | null, format: string, quality: number): Promise<string> => {
    if (!target) {
        throw new Error('Cannot take a screenshot of an empty element')
    }

    const width = target.offsetWidth;
    const height = target.offsetHeight;

    const canvas = await html2canvas(target, {
        width: width > 0 ? width : 1920,
        height: height > 0 ? height : 1080,
        backgroundColor: parseBackgroundColor(format),
    });

    return canvas.toDataURL(format, quality);
}

const createFileName = (prefix: string, timestamp: string, extension: string): string => {
    return `${prefix}-${timestamp}.${extension}`;
}

function App() {
    const [format, setFormat] = useState<string>('image/png');
    const [quality, setQuality] = useState<number>(0.5);

    const captureRef = useRef<HTMLDivElement>(null);

    const downloadScreenshot = async () => {
        const downloadLink = document.createElement("a");

        downloadLink.href = await createImage(captureRef.current, format, quality);
        downloadLink.download = createFileName('capture', new Date().toISOString(), parseExtension(format));
        downloadLink.click();
        downloadLink.remove();
    };

    return (
        <main>
            <header>
                <h1>React Screenshot Tester</h1>
                <p>Click the button below to save the graph as an image file to disk.</p>
                <p>The image will be saved into your browser's configured download directory.</p>
                <p>
                    See the source code at <a href="https://github.com/nikoheikkila/react-screenshot-tester" target="blank">GitHub</a>.
                </p>
            </header>

            <section className="controls">
                <h2>Controls</h2>
                <label htmlFor="format">Format</label>
                <select id="format" className="format-picker" onChange={(event) => setFormat(event.target.value)}>
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WEBP</option>
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

            <button className="capture-button" onClick={downloadScreenshot}>
                Save Chart as {parseExtension(format).toUpperCase()}
            </button>

            <ChartContainer captureRef={captureRef}/>
        </main>
    );
}

interface ChartProps {
    captureRef: React.RefObject<HTMLDivElement>;
}

const ChartContainer: React.FC<ChartProps> = ({captureRef}) => {
    return (
        <section ref={captureRef}>
            <h2>Example Chart</h2>
            <VictoryChart theme={VictoryTheme.material} width={1920} height={1080}>
                <VictoryLine data={data}/>
            </VictoryChart>
        </section>
    );
};

export default App;
