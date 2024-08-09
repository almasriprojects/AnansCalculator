import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl w-11/12 max-w-lg">
                <div className="p-8">
                    {children}
                </div>
                <div className="p-8">
                    <Button
                        className="w-full p-2"
                        variant="default"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
