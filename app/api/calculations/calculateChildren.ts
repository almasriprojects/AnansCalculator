import formatPercentage from './formatPercentage';

export function calculateChildren(
    Gender: string,
    Children: number,
    Father: number,
    Mother: number,
    Spouse: number,
): number {
    if (Children === 0) {
        const Children_Portion = 0;
        console.log({ "Children Value Entered": Children });
        console.log({ "Children Total Portion": `${formatPercentage(Children_Portion)}%` });
        return Children_Portion;
    }
    if (Gender === "Male") {
        const Children_Portion = (1 - (Father / 6) - (Mother / 6) - (Spouse / 8));
        console.log({ "Children Total Portion": `${formatPercentage(Children_Portion)}%` });
        return Children_Portion;
    } else {
        const Children_Portion = (1 - (Father / 6) - (Mother / 6) - (Spouse / 4));
        console.log({ "Children Total Portion": `${formatPercentage(Children_Portion)}%` });
        return Children_Portion;
    }
}

export function calculateChildrenType(Number_Male_Children: number, Number_Female_Children: number): string {
    let children_type = '';
    if (Number_Male_Children > 0 && Number_Female_Children > 0) {
        children_type = "Males & Females Children";
    } else if (Number_Male_Children === 0 && Number_Female_Children === 1) {
        children_type = "One Female Child";
    } else if (Number_Male_Children === 0 && Number_Female_Children >= 2) {
        children_type = "More than One Female Children";
    } else if (Number_Male_Children > 0 && Number_Female_Children === 0) {
        children_type = "Only Males Children";
    } else {
        children_type = "No Children";
    }
    
    return children_type;
}

export function calculateChildrenShares(Children_Portion: number, Number_Male_Children: number, Number_Female_Children: number): Record<string, number> {
    const children_shares: Record<string, number> = {};
    const children_type = calculateChildrenType(Number_Male_Children, Number_Female_Children);

    console.log({ "Children Type": children_type });

    if (children_type === "Only Male Children") {
        for (let i = 1; i <= Number_Male_Children; i++) {
            children_shares[`Son_${i}`] = Children_Portion / Number_Male_Children;
            console.log({ [`Son_${i} Share`]: `${formatPercentage(children_shares[`Son_${i}`])}%` });
        }
    } else if (children_type === "Males & Females Children") {
        const total_shares = 2 * Number_Male_Children + Number_Female_Children;
        for (let i = 1; i <= Number_Male_Children; i++) {
            children_shares[`Son_${i}`] = 2 / total_shares * Children_Portion;
            console.log({ [`Son_${i} Share`]: `${formatPercentage(children_shares[`Son_${i}`])}%` });
        }
        for (let i = 1; i <= Number_Female_Children; i++) {
            children_shares[`Daughter_${i}`] = 1 / total_shares * Children_Portion;
            console.log({ [`Daughter_${i} Share`]: `${formatPercentage(children_shares[`Daughter_${i}`])}%` });
        }
    } else if (children_type === "One Female Child") {
        children_shares['Daughter_1'] = Children_Portion / 2;
        console.log({ "Daughter_1 Share": `${formatPercentage(children_shares['Daughter_1'])}%` });
    } else if (children_type === "More than One Female Children") {
        for (let i = 1; i <= Number_Female_Children; i++) {
            children_shares[`Daughter_${i}`] = 2 / 3 * Children_Portion / Number_Female_Children;
            console.log({ [`Daughter_${i} Share`]: `${formatPercentage(children_shares[`Daughter_${i}`])}%` });
        }
    }

    return children_shares;
}

export function generateChildrenList(Number_Male_Children: number, Number_Female_Children: number): string[] {
    const children_list = [];
    for (let i = 1; i <= Number_Male_Children; i++) {
        children_list.push(`Son_${i}`);
    }
    for (let i = 1; i <= Number_Female_Children; i++) {
        children_list.push(`Daughter_${i}`);
    }
    return children_list;
}
