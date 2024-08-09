import { NextRequest, NextResponse } from 'next/server';
import { openDB } from '../../../lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = await openDB();
    const query = 'SELECT name FROM sqlite_master WHERE type="table"';
    const tables = await db.all(query);

    return NextResponse.json({ success: true, tables }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await openDB();
    const body = await req.json();

    const {
      gender, father, mother, spouse, children, siblings,
      maleChildren, femaleChildren, maleSiblings, femaleSiblings
    } = body;

    // Calculate children and siblings conditions
    const Children_Males_N_Females = femaleChildren > 0 && maleChildren > 0 ? 1 : 0;
    const Children_Only_Males = femaleChildren === 0 && maleChildren > 0 ? 1 : 0;
    const Children_Only_One_Female = femaleChildren === 1 && maleChildren === 0 ? 1 : 0;
    const Children_Two_More_Female = femaleChildren > 1 && maleChildren === 0 ? 1 : 0;

    const Siblings_Males_N_Females = femaleSiblings > 0 && maleSiblings > 0 ? 1 : 0;
    const Siblings_Only_Males = femaleSiblings === 0 && maleSiblings > 0 ? 1 : 0;
    const Siblings_Only_One_Female = femaleSiblings === 1 && maleSiblings === 0 ? 1 : 0;
    const Siblings_Two_More_Female = femaleSiblings > 1 && maleSiblings === 0 ? 1 : 0;

    const query = `
      SELECT * FROM DB_Will
      WHERE Deceased_Gender = ?
      AND Deceased_Father = ?
      AND Deceased_Mother = ?
      AND Deceased_Spouse = ?
      AND Deceased_Children = ?
      AND Deceased_Siblings = ?
      AND \`Deceased_Children/Males_N_Females\` = ?
      AND \`Deceased_Children/Only_Males\` = ?
      AND \`Deceased_Children/Only_One_Female\` = ?
      AND \`Deceased_Children/Two_More_Female\` = ?
      AND \`Deceased_Siblings/Males_N_Females\` = ?
      AND \`Deceased_Siblings/Only_Males\` = ?
      AND \`Deceased_Siblings/Only_One_Female\` = ?
      AND \`Deceased_Siblings/Two_More_Female\` = ?
    `;
    const params = [
      gender, father, mother, spouse, children, siblings,
      Children_Males_N_Females, Children_Only_Males, Children_Only_One_Female, Children_Two_More_Female,
      Siblings_Males_N_Females, Siblings_Only_Males, Siblings_Only_One_Female, Siblings_Two_More_Female
    ];
    const result = await db.get(query, params);

    if (!result) {
      return NextResponse.json({ success: false, error: 'No matching record found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
