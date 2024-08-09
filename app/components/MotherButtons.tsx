import { Button } from '@/components/ui/button';

interface MotherButtonsProps {
    mother: boolean | null;
    setMother: (value: boolean) => void;
    showMotherButtons: boolean;
}

const MotherButtons: React.FC<MotherButtonsProps> = ({ mother, setMother, showMotherButtons }) => {
    if (!showMotherButtons) return null;
    return (
        <div className="mb-4">
            <label className="block mb-1">Mother</label>
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
        </div>
    );
};

export default MotherButtons;