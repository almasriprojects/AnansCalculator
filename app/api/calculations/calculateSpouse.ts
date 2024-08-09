import formatPercentage from "./formatPercentage";

export default function calculateSpouse(Gender: string, Spouse: number, Children: number): number {
    if (Spouse === 0) {
        return 0;
    }
    if (Gender === "Male") {
        const Spouse_Portion = (1 / (4 + 4 * Children))
        console.log({ "Wife Portion": `${formatPercentage(Spouse_Portion)}%` });
        return Spouse_Portion;
    } else {
        const Spouse_Portion = (1 / (2 + 2 * Children))
        console.log({ "Husband Portion": `${formatPercentage(Spouse_Portion)}%` });
        return Spouse_Portion;
    }
}