import html2canvas from 'html2canvas';
import { ImageFormat } from '../types';

interface DownloadOptions {
    readonly format: string;
    readonly quality: number;
}

export const formats = [
    { label: 'PNG', value: ImageFormat.PNG },
    { label: 'JPEG', value: ImageFormat.JPEG },
    { label: 'WebP', value: ImageFormat.WEBP },
];

export const takeScreenshot = async (target: HTMLElement | null, options: DownloadOptions): Promise<void> => {
    const { format, quality } = options;
    const downloadLink = document.createElement('a');

    try {
        downloadLink.href = await createImage(target, format, quality);
        downloadLink.download = createFileName('capture', new Date().toISOString(), parseExtension(format));
        downloadLink.click();
    } catch (error) {
        console.error(error);
        Promise.reject(error);
    } finally {
        downloadLink.remove();
    }
};

const parseExtension = (mimeType: string): string => {
    const [, extension] = mimeType.split('/');
    return extension;
};

const parseBackgroundColor = (format: string) => {
    return format.endsWith('png') ? 'transparent' : '#FFF';
};

const createImage = async (target: HTMLElement | null, format: string, quality: number): Promise<string> => {
    if (!target) {
        throw new Error('Cannot take a screenshot of an empty element');
    }

    const canvas = await html2canvas(target, {
        width: target.offsetWidth,
        height: target.offsetHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
        backgroundColor: parseBackgroundColor(format),
    });

    return canvas.toDataURL(format, quality);
};

const createFileName = (prefix: string, timestamp: string, extension: string): string => {
    return `${prefix}-${timestamp}.${extension}`;
};
