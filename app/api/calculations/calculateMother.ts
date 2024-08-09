import formatPercentage from "./formatPercentage";



export default function calculateMother(Mother: number, Father: number, Children: number, Siblings: number): number {
    if (Mother === 0) {
        return 0;
    }
    const Mother_Potion = (1 / 6 + (1 - Father) * (1 - Children) * (1 - Siblings) * (1 / 3) + Father * (1 - Children) * (1 - Siblings) * (1 / 6))
    console.log({ "Mother Portion": `${formatPercentage(Mother_Potion)}%`});
    return Mother_Potion;
}
