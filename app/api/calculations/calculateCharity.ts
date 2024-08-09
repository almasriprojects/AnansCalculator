import formatPercentage from "./formatPercentage";

export default function calculateCharity(
    Father_Portion: number,
    Mother_Portion: number,
    Spouse_Portion: number,
    Children_Portion: number,
    Siblings_Portion: number,
    Children_Type: string,
    Siblings_Type: string
): number {

    let preTotal = Father_Portion + Mother_Portion + Spouse_Portion + Children_Portion + Siblings_Portion
    console.log({ "Pre-Total": preTotal });
    let charity = 1 - preTotal
    console.log({ "Pre-Charity": charity });

    if (Children_Type === "One Female Child") {
        charity += 0.5 * Children_Portion;
    } else if (Children_Type === "More than One Female Children") {
        charity += 1 / 3 * Children_Portion;
    }

    if (Siblings_Type === "One Female Sibling") {
        charity += 0.5 * Siblings_Portion;
    } else if (Siblings_Type === "More than One Female Siblings") {
        charity += 1 / 3 * Siblings_Portion;
    }
    console.log({ "Charity": `${formatPercentage(charity)}%` });
    return charity;
}