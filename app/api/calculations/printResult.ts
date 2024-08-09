import formatPercentage from './formatPercentage';

export default function printResult(
    F_Portion: number,
    M_Portion: number,
    SS_Portion: number,
    C_Portion: number,
    S_Portion: number,
    Charity_Portion: number,
    Children_Type: string,
    Children_List: string[],
    Children_Shares: Record<string, number>,
    Siblings_Type: string,
    Siblings_List: string[],
    Siblings_Shares: Record<string, number>,
    total: number,
    is_equal_to_one: boolean
): void {
    console.log(`Father = ${formatPercentage(F_Portion)}`);
    console.log(`Mother = ${formatPercentage(M_Portion)}`);
    console.log(`Spouse = ${formatPercentage(SS_Portion)}`);
    console.log(`Children Total Portion = ${formatPercentage(C_Portion)}`);
    console.log(`Children Type: ${Children_Type}`);
    for (const child of Children_List) {
        console.log(`${child} = ${formatPercentage(Children_Shares[child])}`);
    }
    console.log(`Siblings Total Portion = ${formatPercentage(S_Portion)}`);
    console.log(`Siblings Type: ${Siblings_Type}`);
    for (const sibling of Siblings_List) {
        console.log(`${sibling} = ${formatPercentage(Siblings_Shares[sibling])}`);
    }
    console.log(`Charity = ${formatPercentage(Charity_Portion)}`);
    console.log(`Total = ${formatPercentage(total)}`);
    console.log(`Does the total equal 100%? ${is_equal_to_one}`);
}