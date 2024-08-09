import formatPercentage from './formatPercentage';

export function calculateSiblings(
    Siblings: number,
    Father: number,
    Mother: number,
    Spouse: number,
): number {
    if (Siblings === 0) {
        const Siblings_Portion = 0;
        console.log({ "Siblings Value Entered": Siblings });
        console.log({ "Siblings Total Portion": `${formatPercentage(Siblings_Portion)}%` });
        return Siblings_Portion;
    }
    const Siblings_Portion = ((
        (1 - Father) * (1 - Mother) * (1 - Spouse) * 1 +
        (1 - Father) * (1 - Mother) * Spouse * (1 / 2) +
        (1 - Father) * Mother * (1 - Spouse) * (20 / 24) +
        (1 - Father) * Mother * Spouse * (1 / 3) +
        Father * (1 - Mother) * (1 - Spouse) * (1 / 3) +
        Father * (1 - Mother) * Spouse * (1 / 3) +
        Father * Mother * (1 - Spouse) * (1 / 6) +
        Father * Mother * Spouse * (1 / 6)));
    
    console.log({ "Siblings Total Portion": `${formatPercentage(Siblings_Portion)}%` });
    return Siblings_Portion;
}

export function calculateSiblingsType(Number_Male_Siblings: number, Number_Female_Siblings: number): string {
    let siblings_type = '';
    if (Number_Male_Siblings > 0 && Number_Female_Siblings > 0) {
        siblings_type = "Males & Females Siblings";
    } else if (Number_Male_Siblings === 0 && Number_Female_Siblings === 1) {
        siblings_type = "One Female Sibling";
    } else if (Number_Male_Siblings === 0 && Number_Female_Siblings >= 2) {
        siblings_type = "More than One Female Siblings";
    } else if (Number_Male_Siblings > 0 && Number_Female_Siblings === 0) {
        siblings_type = "Only Males Siblings";
    } else {
        siblings_type = "No Siblings";
    }
    return siblings_type;
}

export function calculateSiblingsShares(Siblings_Portion: number, Number_Male_Siblings: number, Number_Female_Siblings: number, Spouse: number): Record<string, number> {
    const siblings_shares: Record<string, number> = {};
    const siblings_type = calculateSiblingsType(Number_Male_Siblings, Number_Female_Siblings);

    console.log({ "Siblings Type": siblings_type }); 

    if (Spouse === 0) {
        if (siblings_type === "Only Males Siblings") {
            for (let i = 1; i <= Number_Male_Siblings; i++) {
                siblings_shares[`Brother_${i}`] = Siblings_Portion / Number_Male_Siblings;
                console.log({ [`Brother_${i} Share`]: `${formatPercentage(siblings_shares[`Brother_${i}`])}%` });
            }
        } else if (siblings_type === "Males & Females Siblings") {
            const total_shares = 2 * Number_Male_Siblings + Number_Female_Siblings;
            for (let i = 1; i <= Number_Male_Siblings; i++) {
                siblings_shares[`Brother_${i}`] = 2 / total_shares * Siblings_Portion;
                console.log({ [`Brother_${i} Share`]: `${formatPercentage(siblings_shares[`Brother_${i}`])}%` });
            }
            for (let i = 1; i <= Number_Female_Siblings; i++) {
                siblings_shares[`Sister_${i}`] = 1 / total_shares * Siblings_Portion;
                console.log({ [`Sister_${i} Share`]: `${formatPercentage(siblings_shares[`Sister_${i}`])}%` });
            }
        } else if (siblings_type === "One Female Sibling") {
            siblings_shares['Sister_1'] = Siblings_Portion / 2;
            console.log({ "Sister_1 Share": `${formatPercentage(siblings_shares['Sister_1'])}%` });
        } else if (siblings_type === "More than One Female Siblings") {
            for (let i = 1; i <= Number_Female_Siblings; i++) {
                siblings_shares[`Sister_${i}`] = 2 / 3 * Siblings_Portion / Number_Female_Siblings;
                console.log({ [`Sister_${i} Share`]: `${formatPercentage(siblings_shares[`Sister_${i}`])}%` });
            }
        }
    } else {
        const total_siblings = Number_Male_Siblings + Number_Female_Siblings;
        if (total_siblings > 0) {
            const equal_share = Siblings_Portion / total_siblings;
            for (let i = 1; i <= Number_Male_Siblings; i++) {
                siblings_shares[`Brother_${i}`] = equal_share;
                console.log({ [`Brother_${i} Share`]: `${formatPercentage(siblings_shares[`Brother_${i}`])}%` });
            }
            for (let i = 1; i <= Number_Female_Siblings; i++) {
                siblings_shares[`Sister_${i}`] = equal_share;
                console.log({ [`Sister_${i} Share`]: `${formatPercentage(siblings_shares[`Sister_${i}`])}%` });
            }
        }
    }

    return siblings_shares;
}

export function generateSiblingsList(Number_Male_Siblings: number, Number_Female_Siblings: number): string[] {
    const siblings_list = [];
    for (let i = 1; i <= Number_Male_Siblings; i++) {
        siblings_list.push(`Brother_${i}`);
    }
    for (let i = 1; i <= Number_Female_Siblings; i++) {
        siblings_list.push(`Sister_${i}`);
    }
    return siblings_list;
}
