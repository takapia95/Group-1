import {useStore} from "../resources/store";
import {useState} from "react";
const Register = () => {
    const register = useStore((state) => state.register);
    const [registerError, setRegisterError] = useState('');
    const setModalContent = useStore((state) => state.setModalContent);

    // switch to login
    const switchToLogin = () => {
        setRegisterError('');
        setModalContent('login'); // Switch to Login component
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match');
            return;
        }

        if (password === '' || confirmPassword === '') {
            setRegisterError('Please fill in all fields');
            return;
        }

        try {
            await register(username, password);
            setRegisterError('');

            // Clear the form
            document.getElementById('register-form').reset();
        } catch (error) {
            setRegisterError(error.message);
        }
    }

    return (
        <div>
            <h4 className="block text-2xl font-bold my-3 border-b-2 w-11/12">Register</h4>
            <form id="register-form">
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Username"
                        id="username"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Password"
                        id="password"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Confirm Password"
                        id="confirm-password"
                        required
                    />
                </div>
                <button
                    onClick={handleRegister}
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                    Register
                </button>
                {/*  if there's an error  */}
                {registerError && (
                    <p className="text-red-500 text-sm mt-2">{registerError}</p>
                )}
            </form>

            <div>
                <p className="mt-4 text-gray-700">Already have an account? <button onClick={switchToLogin}
                                                                                   className="text-amber-500 underline">Login</button>
                </p>
            </div>
        </div>
    );
}
export default Register;