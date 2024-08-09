import formatPercentage from "./formatPercentage";



export default function calculateFather(Gender: string, Father: number, Mother: number, Spouse: number, Children: number, Siblings: number): number {
    if (Father === 0) {
        return 0;
    }
    if (Gender === "Male") {
        const Father_Potion = (1 / 6 * Children +
            (1 - Children) * (
                10 / 24 * Mother * Spouse +
                2 / 3 * Mother * (1 - Spouse) +
                10 / 24 * (1 - Mother) * Spouse * Siblings +
                3 / 4 * (1 - Mother) * Spouse * (1 - Siblings) +
                2 / 3 * (1 - Mother) * (1 - Spouse) * Siblings +
                1 * (1 - Mother) * (1 - Spouse) * (1 - Siblings)
            ))
        console.log({ "Father Portion": `${formatPercentage(Father_Potion)}%` });
        return Father_Potion;
    } else {
        const Father_Potion = (1 / 6 * Children +
            (1 - Children) * (
                1 / 6 * Mother * Spouse +
                2 / 3 * Mother * (1 - Spouse) +
                1 / 6 * (1 - Mother) * Spouse * Siblings +
                1 / 2 * (1 - Mother) * Spouse * (1 - Siblings) +
                2 / 3 * (1 - Mother) * (1 - Spouse) * Siblings +
                1 * (1 - Mother) * (1 - Spouse) * (1 - Siblings)
            ))
        console.log({ "Father Portion": `${formatPercentage(Father_Potion)}%` });
        return Father_Potion;
    };
}