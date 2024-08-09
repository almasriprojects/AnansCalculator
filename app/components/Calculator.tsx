"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FatherButtons from './FatherButtons';
import MotherButtons from './MotherButtons';
import SpouseButtons from './SpouseButtons';
import ChildrenButtons from './ChildrenButtons';
import SiblingsButtons from './SiblingsButtons';
import calculateAndPrintResults from '../api/calculations/calculateAll';
import Modal from './Modal';
import ResultDisplay from './ResultDisplay';

const Calculator = () => {
  const [amountGet, setAmount] = useState<number | string>('');
  const [genderGet, setGender] = useState<string | null>(null);
  const [fatherSelected, setFather] = useState<boolean | null>(null);
  const [motherSelected, setMother] = useState<boolean | null>(null);
  const [spouseSelected, setSpouse] = useState<boolean | null>(null);

  const [childrenSelected, setChildrenSelected] = useState<boolean | null>(null);
  const [maleChildrenGet, setMaleChildren] = useState<number | string>('');
  const [femaleChildrenGet, setFemaleChildren] = useState<number | string>('');

  const [siblingsSelected, setSiblings] = useState<boolean | null>(null);
  const [maleSiblingsGet, setMaleSiblings] = useState<number | string>('');
  const [femaleSiblingsGet, setFemaleSiblings] = useState<number | string>('');

  const [showFatherButtons, setShowFatherButtons] = useState<boolean>(true);
  const [showMotherButtons, setShowMotherButtons] = useState<boolean>(true);
  const [showSpouseButtons, setShowSpouseButtons] = useState<boolean>(true);
  const [showSiblingsButtons, setShowSiblingsButtons] = useState<boolean>(false);
  const [showChildrenButtons, setShowChildrenButtons] = useState<boolean>(true);
  const [showGenderButtons, setShowGenderButtons] = useState<boolean>(true);

  const [result, setResult] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleReset = () => {
    setAmount('');
    setGender(null);
    setFather(null);
    setMother(null);
    setSpouse(null);
    setSiblings(null);
    setMaleSiblings('');
    setFemaleSiblings('');
    setChildrenSelected(null);
    setMaleChildren('');
    setFemaleChildren('');

    setShowFatherButtons(true);
    setShowMotherButtons(true);
    setShowSpouseButtons(true);
    setShowSiblingsButtons(false);
    setShowChildrenButtons(true);
    setShowGenderButtons(true);

    setResult(null);
    setValidationErrors({});
  };

  const handleCalculate = () => {
    const errors: { [key: string]: boolean } = {};

    if (amountGet === '') errors.amountGet = true;
    if (childrenSelected && maleChildrenGet === '') errors.maleChildrenGet = true;
    if (childrenSelected && femaleChildrenGet === '') errors.femaleChildrenGet = true;
    if (siblingsSelected && maleSiblingsGet === '') errors.maleSiblingsGet = true;
    if (siblingsSelected && femaleSiblingsGet === '') errors.femaleSiblingsGet = true;

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const maleChildrenNumber = typeof maleChildrenGet === 'string' ? parseInt(maleChildrenGet, 10) || 0 : maleChildrenGet;
    const femaleChildrenNumber = typeof femaleChildrenGet === 'string' ? parseInt(femaleChildrenGet, 10) || 0 : femaleChildrenGet;
    const maleSiblingsNumber = typeof maleSiblingsGet === 'string' ? parseInt(maleSiblingsGet, 10) || 0 : maleSiblingsGet;
    const femaleSiblingsNumber = typeof femaleSiblingsGet === 'string' ? parseInt(femaleSiblingsGet, 10) || 0 : femaleSiblingsGet;

    const inputData = {
      Gender: genderGet || '',
      Father: fatherSelected ? 1 : 0,
      Mother: motherSelected ? 1 : 0,
      Spouse: spouseSelected ? 1 : 0,
      Children: childrenSelected ? 1 : 0,
      Siblings: siblingsSelected ? 1 : 0,
      Number_Male_Children: maleChildrenNumber,
      Number_Female_Children: femaleChildrenNumber,
      Number_Male_Siblings: maleSiblingsNumber,
      Number_Female_Siblings: femaleSiblingsNumber
    };

    console.log("Input Data:", inputData);

    // Call the calculateAndPrintResults function
    const calculatedResult = calculateAndPrintResults(
      inputData.Gender,
      inputData.Father,
      inputData.Mother,
      inputData.Spouse,
      inputData.Children,
      inputData.Siblings,
      inputData.Number_Male_Children,
      inputData.Number_Female_Children,
      inputData.Number_Male_Siblings,
      inputData.Number_Female_Siblings
    );
    setResult(calculatedResult);
    setIsModalOpen(true);
  };

  const handleFocus = (setter: (value: string) => void) => {
    setter('');
  };

  const handleBlur = (setter: (value: string | number) => void, value: string) => {
    if (value === '') {
      setter('');
    } else {
      setter(parseFloat(value));
    }
  };

  const handleChildren = (value: boolean) => {
    setChildrenSelected(value);
    if (!value) {
      setShowSiblingsButtons(true);
    } else {
      setShowSiblingsButtons(false);
    }
    setMaleChildren('');
    setFemaleChildren('');
  };

  const handleSiblings = (value: boolean) => {
    setSiblings(value);
    setMaleSiblings('');
    setFemaleSiblings('');
    if (value && !childrenSelected) {
      setShowChildrenButtons(false);
    } else {
      setShowChildrenButtons(true);
    }
  };

  const formatResult = (portion: string) => {
    const portionValue = parseFloat(portion.replace('%', ''));
    const calculatedAmount = (typeof amountGet === 'string' ? parseFloat(amountGet) : amountGet) * (portionValue / 100);
    return `$${calculatedAmount.toFixed(2)} - (${portion})`;
  };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-sm mx-auto mt-5 mb-24">
        <h2 className="text-2xl font-bold text-center mb-4">Anan’s Calculator</h2>
        <label className="block mb-1">
          Enter the Amount
          <Input
            type="number"
            value={amountGet}
            placeholder="Please enter the total inheritance amount"
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => handleBlur(setAmount, amountGet.toString())}
            onFocus={() => handleFocus(setAmount)}
            className={`w-full mt-1 p-2 border border-gray-300 rounded ${validationErrors.amountGet ? 'border-red-500' : ''}`}
          />
        </label>

        <div className="mb-4">
          <label className="block mb-1">Deceased</label>

            <>
              <Button
                variant={genderGet === 'Male' ? 'default' : 'secondary'}
                className={`w-1/2 p-2 rounded-l`}
                onClick={() => setGender('Male')}
              >
                Male
              </Button>
              <Button
                variant={genderGet === 'Female' ? 'default' : 'secondary'}
                className={`w-1/2 p-2 rounded-r`}
                onClick={() => setGender('Female')}
              >
                Female
              </Button>
            </>
   
        </div>
          
        <FatherButtons
          father={fatherSelected}
          setFather={setFather}
          showFatherButtons={showFatherButtons}
        />

        <MotherButtons
          mother={motherSelected}
          setMother={setMother}
          showMotherButtons={showMotherButtons}
        />

        <SpouseButtons
          spouse={spouseSelected}
          setSpouse={setSpouse}
          showSpouseButtons={showSpouseButtons}
        />

        {showChildrenButtons && (
          <ChildrenButtons
            showChildrenButtons={showChildrenButtons}
            setChildren={handleChildren}
            maleChildren={maleChildrenGet}
            setMaleChildren={(value) => {
              const val = value === '' ? '' : parseInt(value.toString(), 10);
              setMaleChildren(val);
            }}
            femaleChildren={femaleChildrenGet}
            setFemaleChildren={(value) => {
              const val = value === '' ? '' : parseInt(value.toString(), 10);
              setFemaleChildren(val);
            }}
            childrenSelected={childrenSelected}
            validationErrors={validationErrors}
          />
        )}

        {showSiblingsButtons && (
          <SiblingsButtons
            siblings={siblingsSelected}
            setSiblings={handleSiblings}
            showSiblingsButtons={showSiblingsButtons}
            maleSiblings={maleSiblingsGet}
            setMaleSiblings={(value) => {
              const val = value === '' ? '' : parseInt(value.toString(), 10);
              setMaleSiblings(val);
            }}
            femaleSiblings={femaleSiblingsGet}
            setFemaleSiblings={(value) => {
              const val = value === '' ? '' : parseInt(value.toString(), 10);
              setFemaleSiblings(val);
            }}
            validationErrors={validationErrors}
          />
        )}

      </div>

      <div className="p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-sm mx-auto fixed bottom-0 left-0 right-0">
        <Button variant="default" className="w-full py-2 mt-4 rounded" onClick={handleCalculate}>Calculate</Button>
        <Button variant="secondary" className="w-full py-2 mt-2 rounded" onClick={handleReset}>Clear</Button>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">Calculation Results</h2>
        {result && <ResultDisplay result={result} formatResult={formatResult} amount={parseFloat(amountGet.toString())} />}
      </Modal>

    </div>
  );
};

export default Calculator;
