import {type ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import './startModal.css'
interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const StartModal = ({ isOpen, children }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';  // отключаем скролл
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('portal-root')!  // 👈 портал
    );
};

export default StartModal