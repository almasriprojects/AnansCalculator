import { Button } from '@/components/ui/button';

interface SpouseButtonsProps {
    spouse: boolean | null;
    setSpouse: (value: boolean) => void;
    showSpouseButtons: boolean;
}

const SpouseButtons: React.FC<SpouseButtonsProps> = ({ spouse, setSpouse, showSpouseButtons }) => {
    if (!showSpouseButtons) return null;
    return (
        <div className="mb-4">
            <label className="block mb-1">Spouse</label>
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
        </div>
    );
};

export default SpouseButtons;