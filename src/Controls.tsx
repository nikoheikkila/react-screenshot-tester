import { formats } from './screenshot';

interface ControllerProps<T> {
    value: T;
    setValue: (value: T) => void;
}

export const FormatController: React.FC<ControllerProps<string>> = ({ setValue }) => {
    return (
        <>
            <label htmlFor="format">Format</label>
            <select id="format" className="format-picker" onChange={(event) => setValue(event.target.value)}>
                {formats.map((format) => (
                    <option value={format.value} key={format.value}>
                        {format.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export const QualityController: React.FC<ControllerProps<number>> = ({ value, setValue }) => {
    return (
        <>
            <input
                id="quality"
                className="quality-picker"
                type="range"
                min={0.1}
                max={1.0}
                step={0.1}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(Number(event.target.value))}
            />
            <label htmlFor="quality">Quality {value * 100} %</label>
        </>
    );
};
