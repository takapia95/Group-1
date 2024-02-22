import {useStore} from "../resources/store";
import Login from "./Login";
import Registration from "./Registration";

const Modal = ({ isOpen, onClose}) => {
    const modalContent = useStore((state) => state.modalContent);

    let content;

    switch (modalContent) {
        case 'login':
            content = <Login />;
            break;
        case 'register':
            content = <Registration />;
            break;
        default:
            content = <Login />;
            break;
    }

    return(
        isOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition ease-linear opacity-100">
                <div className="relative w-full max-w-md p-8 bg-white rounded-2xl">
                    <button onClick={onClose} className="absolute top-4 right-4" data-testid="close-button">
                        <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    {content}
                </div>
            </div>
        ) : null
    )
}

export default Modal;