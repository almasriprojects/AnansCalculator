import calculateFather from './calculateFather';
import calculateMother from './calculateMother';
import calculateSpouse from './calculateSpouse';
import { calculateChildren, calculateChildrenShares, calculateChildrenType, generateChildrenList } from './calculateChildren';
import { calculateSiblings, calculateSiblingsShares, calculateSiblingsType, generateSiblingsList } from './calculateSiblings';
import calculateCharity from './calculateCharity';
import calculateTotal from './calculateTotal';

export default function calculateAndPrintResults(
    Gender: string,
    Father: number,
    Mother: number,
    Spouse: number,
    Children: number,
    Siblings: number,
    Number_Male_Children: number,
    Number_Female_Children: number,
    Number_Male_Siblings: number,
    Number_Female_Siblings: number
): any {
    const Father_Portion = calculateFather(Gender, Father, Mother, Spouse, Children, Siblings);
    const Mother_Portion = calculateMother(Mother, Father, Children, Siblings);
    const Spouse_Portion = calculateSpouse(Gender, Spouse, Children);
    const Children_Portion = calculateChildren(Gender, Children, Father, Mother, Spouse);
    const Siblings_Portion = calculateSiblings(Siblings, Father, Mother, Spouse);

    const Children_Type = calculateChildrenType(Number_Male_Children, Number_Female_Children);
    const Siblings_Type = calculateSiblingsType(Number_Male_Siblings, Number_Female_Siblings);
    
    const Children_List = generateChildrenList(Number_Male_Children, Number_Female_Children);
    const Siblings_List = generateSiblingsList(Number_Male_Siblings, Number_Female_Siblings);

    const Children_Shares = calculateChildrenShares(Children_Portion, Number_Male_Children, Number_Female_Children);
    const Siblings_Shares = calculateSiblingsShares(Siblings_Portion, Number_Male_Siblings, Number_Female_Siblings, Spouse);

    const Charity_Portion = calculateCharity(Father_Portion, Mother_Portion, Spouse_Portion, Children_Portion, Siblings_Portion, Children_Type, Siblings_Type);

    const [total, is_equal_to_one] = calculateTotal(Father_Portion, Mother_Portion, Spouse_Portion, Charity_Portion, Children_Shares, Siblings_Shares);

    return {
        Father_Portion,
        Mother_Portion,
        Spouse_Portion,
        Children_Portion,
        Children_List,
        Children_Shares,
        Siblings_Portion,
        Siblings_Shares,
        Siblings_List,
        Charity_Portion,
        total
        
    };
}
