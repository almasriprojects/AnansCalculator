import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

interface ChildrenButtonsProps {
  showChildrenButtons: boolean;
  setChildren: (value: boolean) => void;
  maleChildren: string | number;
  setMaleChildren: Dispatch<SetStateAction<string | number>>;
  femaleChildren: string | number;
  setFemaleChildren: Dispatch<SetStateAction<string | number>>;
  childrenSelected: boolean | null;
  validationErrors: { [key: string]: boolean }; // Ensure this is correctly defined
}

const ChildrenButtons: React.FC<ChildrenButtonsProps> = ({
  setChildren,
  showChildrenButtons,
  maleChildren,
  setMaleChildren,
  femaleChildren,
  setFemaleChildren,
  childrenSelected,
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
      {showChildrenButtons && (
        <div className="mb-4">
          <label className="block mb-1">Children</label>
          <>
            <Button
              variant={childrenSelected === true ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-l`}
              onClick={() => setChildren(true)}
            >
              Yes
            </Button>
            <Button
              variant={childrenSelected === false ? 'default' : 'secondary'}
              className={`w-1/2 p-2 rounded-r`}
              onClick={() => setChildren(false)}
            >
              No
            </Button>
          </>
        </div>
      )}
      {childrenSelected && (
        <>
          <label className="block mb-1">
            Male Children
            <Input
              type="number"
              value={maleChildren === '' ? '' : maleChildren}
              placeholder="Please enter total number of the sons"
              onChange={(e) => setMaleChildren(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              onBlur={() => handleBlur(setMaleChildren, maleChildren.toString())}
              onFocus={() => handleFocus(setMaleChildren)}
              className={`w-full mt-1 p-2 border ${validationErrors.maleChildrenGet ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
          </label>
          <label className="block mb-1">
            Female Children
            <Input
              type="number"
              value={femaleChildren === '' ? '' : femaleChildren}
              placeholder="Please enter total number of the daughters"
              onChange={(e) => setFemaleChildren(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              onBlur={() => handleBlur(setFemaleChildren, femaleChildren.toString())}
              onFocus={() => handleFocus(setFemaleChildren)}
              className={`w-full mt-1 p-2 border ${validationErrors.femaleChildrenGet ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
          </label>
        </>
      )}
    </>
  );
};

export default ChildrenButtons;
