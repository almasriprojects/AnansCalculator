"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Calculator = () => {
  const [amount, setAmount] = useState<number | string>('');
  const [gender, setGender] = useState<string | null>(null);
  const [father, setFather] = useState<boolean | null>(null);
  const [mother, setMother] = useState<boolean | null>(null);
  const [spouse, setSpouse] = useState<boolean | null>(null);
  const [siblings, setSiblings] = useState<boolean | null>(null);
  const [maleSiblings, setMaleSiblings] = useState<number | string>('');
  const [femaleSiblings, setFemaleSiblings] = useState<number | string>('');
  const [children, setChildren] = useState<boolean | null>(null);
  const [maleChildren, setMaleChildren] = useState<number | string>('');
  const [femaleChildren, setFemaleChildren] = useState<number | string>('');

  const [showFatherButtons, setShowFatherButtons] = useState<boolean>(true);
  const [showMotherButtons, setShowMotherButtons] = useState<boolean>(true);
  const [showSpouseButtons, setShowSpouseButtons] = useState<boolean>(true);
  const [showSiblingsButtons, setShowSiblingsButtons] = useState<boolean>(false);
  const [showChildrenButtons, setShowChildrenButtons] = useState<boolean>(true);
  const [showGenderButtons, setShowGenderButtons] = useState<boolean>(true);

  const handleReset = () => {
    setAmount('');
    setGender(null);
    setFather(null);
    setMother(null);
    setSpouse(null);
    setSiblings(null);
    setMaleSiblings('');
    setFemaleSiblings('');
    setChildren(null);
    setMaleChildren('');
    setFemaleChildren('');

    setShowFatherButtons(true);
    setShowMotherButtons(true);
    setShowSpouseButtons(true);
    setShowSiblingsButtons(false);
    setShowChildrenButtons(true);
    setShowGenderButtons(true);
  };

  const handleCalculate = async () => {
    const inputData = {
      amount: typeof amount === 'string' ? parseFloat(amount) : amount,
      gender,
      father: father ? 1 : 0,
      mother: mother ? 1 : 0,
      spouse: spouse ? 1 : 0,
      siblings: siblings ? 1 : 0,
      maleSiblings: typeof maleSiblings === 'string' ? parseInt(maleSiblings, 10) : maleSiblings,
      femaleSiblings: typeof femaleSiblings === 'string' ? parseInt(femaleSiblings, 10) : femaleSiblings,
      children: children ? 1 : 0,
      maleChildren: typeof maleChildren === 'string' ? parseInt(maleChildren, 10) : maleChildren,
      femaleChildren: typeof femaleChildren === 'string' ? parseInt(femaleChildren, 10) : femaleChildren,
    };

    console.log("Input Data:", inputData);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });

      const result = await response.json();
      console.log("Query Result:", result);

      setShowFatherButtons(false);
      setShowMotherButtons(false);
      setShowSpouseButtons(false);
      setShowSiblingsButtons(false);
      setShowChildrenButtons(false);
      setShowGenderButtons(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFocus = (setter: (value: string) => void) => {
    setter('');
  };

  const handleChildren = (value: boolean) => {
    setChildren(value);
    if (!value) {
      setShowSiblingsButtons(true);
    } else {
      setShowSiblingsButtons(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Anan’s Calculator</h2>
      <label className="block mb-2">
        Enter the Amount
        <Input
          type="number"
          value={amount}
          placeholder="Please enter the total inheritance amount"
          onChange={(e) => setAmount(e.target.value)}
          onFocus={() => handleFocus(setAmount)}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>

      <div className="mb-4">
        <label className="block mb-2">Deceased</label>
        {showGenderButtons ? (
          <>
            <Button
              variant={gender === 'Male' ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setGender('Male')}
            >
              Male
            </Button>
            <Button
              variant={gender === 'Female' ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setGender('Female')}
            >
              Female
            </Button>
          </>
        ) : (
          <Button className="w-full p-2">{`Deceased: ${gender}`}</Button>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Father</label>
        {showFatherButtons ? (
          <>
            <Button
              variant={father === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setFather(true)}
            >
              Yes
            </Button>
            <Button
              variant={father === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setFather(false)}
            >
              No
            </Button>
          </>
        ) : (
          <Button className="w-full p-2">{`Father: ${father ? 1 : 0}`}</Button>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Mother</label>
        {showMotherButtons ? (
          <>
            <Button
              variant={mother === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setMother(true)}
            >
              Yes
            </Button>
            <Button
              variant={mother === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setMother(false)}
            >
              No
            </Button>
          </>
        ) : (
          <Button className="w-full p-2">{`Mother: ${mother ? 1 : 0}`}</Button>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Spouse</label>
        {showSpouseButtons ? (
          <>
            <Button
              variant={spouse === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setSpouse(true)}
            >
              Yes
            </Button>
            <Button
              variant={spouse === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setSpouse(false)}
            >
              No
            </Button>
          </>
        ) : (
          <Button className="w-full p-2">{`Spouse: ${spouse ? 1 : 0}`}</Button>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Children</label>
        {showChildrenButtons ? (
          <>
            <Button
              variant={children === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => handleChildren(true)}
            >
              Yes
            </Button>
            <Button
              variant={children === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => handleChildren(false)}
            >
              No
            </Button>
          </>
        ) : (
          <Button className="w-full p-2">{`Children: ${children ? 1 : 0}`}</Button>
        )}
      </div>

      {children && (
        <>
          <label className="block mb-2">
            Male Children
            <Input
              type="number"
              value={maleChildren === 0 ? '' : maleChildren}
              placeholder="Please enter total number of the sons"
              onChange={(e) => setMaleChildren(e.target.value)}
              onFocus={() => handleFocus(setMaleChildren)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="block mb-2">
            Female Children
            <Input
              type="number"
              value={femaleChildren === 0 ? '' : femaleChildren}
              placeholder="Please enter total number of the daughters"
              onChange={(e) => setFemaleChildren(e.target.value)}
              onFocus={() => handleFocus(setFemaleChildren)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </>
      )}

      {showSiblingsButtons && (
        <div className="mb-4">
          <label className="block mb-2">Siblings</label>
          <>
            <Button
              variant={siblings === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setSiblings(true)}
            >
              Yes
            </Button>
            <Button
              variant={siblings === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setSiblings(false)}
            >
              No
            </Button>
          </>
        </div>
      )}

      {siblings && showSiblingsButtons && (
        <>
          <label className="block mb-2">
            Male Siblings
            <Input
              type="number"
              value={maleSiblings === 0 ? '' : maleSiblings}
              placeholder="Please enter total number of the brothers"
              onChange={(e) => setMaleSiblings(parseInt(e.target.value, 10))}
              onFocus={() => handleFocus(setMaleSiblings)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="block mb-2">
            Female Siblings
            <Input
              type="number"
              value={femaleSiblings === 0 ? '' : femaleSiblings}
              placeholder="Please enter total number of the sisters"
              onChange={(e) => setFemaleSiblings(parseInt(e.target.value, 10))}
              onFocus={() => handleFocus(setFemaleSiblings)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </>
      )}

      <Button variant="default" className="w-full py-2 mt-4 rounded" onClick={handleCalculate}>Calculate</Button>
      <Button variant="secondary" className="w-full py-2 mt-2 rounded" onClick={handleReset}>Clear</Button>
    </div>
  );
};

export default Calculator;
