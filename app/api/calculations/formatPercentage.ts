export default function formatPercentage(value: number): number {
    return parseFloat((value * 100).toFixed(2));
}
