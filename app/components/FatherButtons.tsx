import { Button } from '@/components/ui/button';

interface FatherButtonsProps {
    father: boolean | null;
    setFather: (value: boolean) => void;
    showFatherButtons: boolean;
}

const FatherButtons: React.FC<FatherButtonsProps> = ({ father, setFather, showFatherButtons }) => {
    if (!showFatherButtons) return null;
    return (
        <div className="mb-4">
            <label className="block mb-1">Father</label>
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
        </div>
    );
};

export default FatherButtons;