import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

interface SiblingsButtonsProps {
  siblings: boolean | null;
  setSiblings: (value: boolean) => void;
  showSiblingsButtons: boolean;
  maleSiblings: string | number;
  setMaleSiblings: Dispatch<SetStateAction<string | number>>;
  femaleSiblings: string | number;
  setFemaleSiblings: Dispatch<SetStateAction<string | number>>;
  validationErrors: { [key: string]: boolean };
}

const SiblingsButtons: React.FC<SiblingsButtonsProps> = ({
  siblings,
  setSiblings,
  showSiblingsButtons,
  maleSiblings,
  setMaleSiblings,
  femaleSiblings,
  setFemaleSiblings,
  validationErrors
}) => {
  const handleBlur = (setter: Dispatch<SetStateAction<string | number>>, value: string) => {
    if (value === '') {
      setter('');
    } else {
      setter(parseInt(value, 10));
    }
  };

  const handleFocus = (setter: Dispatch<SetStateAction<string | number>>) => {
    setter('');
  };

  return (
    <>
      {showSiblingsButtons && (
        <div className="mb-4">
          <label className="block mb-1">Siblings</label>
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
      {siblings && (
        <>
          <label className="block mb-1">
            Male Siblings
            <Input
              type="number"
              value={maleSiblings === '' ? '' : maleSiblings}
              placeholder="Please enter total number of the brothers"
              onChange={(e) => setMaleSiblings(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              onBlur={() => handleBlur(setMaleSiblings, maleSiblings.toString())}
              onFocus={() => handleFocus(setMaleSiblings)}
              className={`w-full mt-1 p-2 border ${validationErrors.maleSiblingsGet ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
          </label>

          <label className="block mb-1">
            Female Siblings
            <Input
              type="number"
              value={femaleSiblings === '' ? '' : femaleSiblings}
              placeholder="Please enter total number of the sisters"
              onChange={(e) => setFemaleSiblings(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              onBlur={() => handleBlur(setFemaleSiblings, femaleSiblings.toString())}
              onFocus={() => handleFocus(setFemaleSiblings)}
              className={`w-full mt-1 p-2 border ${validationErrors.femaleSiblingsGet ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
          </label>
        </>
      )}
    </>
  );
};

export default SiblingsButtons;
