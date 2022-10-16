import range from 'lodash/range';
import { memo } from 'react';
import { VictoryChart, VictoryLegend, VictoryLine, VictoryTheme } from 'victory';

interface ChartProps {
    captureRef: React.RefObject<HTMLDivElement>;
}

const chartData = range(1, 1000, Math.random() * 10).map((x) => ({
    x,
    y: Math.random(),
}));

const ChartContainer: React.FC<ChartProps> = ({ captureRef }) => {
    return (
        <section ref={captureRef}>
            <h2>Example Chart</h2>
            <VictoryChart theme={VictoryTheme.material} width={window.innerWidth} height={window.innerHeight}>
                <VictoryLine
                    data={chartData}
                    style={{
                        data: {
                            stroke: 'hotpink',
                        },
                    }}
                />
                <VictoryLegend
                    data={[{ name: 'Something', symbol: { type: 'star' } }]}
                    x={window.innerWidth / 2 - 100}
                    style={{
                        labels: {
                            fill: 'skyblue',
                            fontSize: 20,
                        },
                    }}
                />
            </VictoryChart>
        </section>
    );
};

export default memo(ChartContainer);
