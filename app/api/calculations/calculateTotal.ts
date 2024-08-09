export default function calculateTotal(Father: number, Mother: number, Spouse: number, Charity: number, Children_Shares: Record<string, number>, Siblings_Shares: Record<string, number>): [number, boolean] {
    let total = Father + Mother + Spouse + Charity;
    for (const share of Object.values(Children_Shares)) {
        total += share;
    }
    for (const share of Object.values(Siblings_Shares)) {
        total += share;
    }
    const is_equal_to_one = Math.round(total * 100) / 100 === 1;
    return [total, is_equal_to_one];
}