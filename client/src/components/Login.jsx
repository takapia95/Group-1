import {useStore} from "../resources/store";
import {useState} from "react";
const Login = () => {
    const login = useStore((state) => state.login);
    const [loginError, setLoginError] = useState('');
    const setModalContent = useStore((state) => state.setModalContent);

    const switchToRegister = () => {
        setLoginError('');
        setModalContent('register'); // Switch to Registration component
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === '' || password === '') {
            setLoginError('Please fill in all fields');
            return;
        }

        try {
            await login(username, password);
            setLoginError('');
        } catch (error) {
            setLoginError(error.message);
        }
    }

    return (
        <div>
            <h4 className="block text-2xl font-bold my-3 border-b-2 w-11/12">Login</h4>
            <form>
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
                <button
                    id="login"
                    onClick={handleLogin}
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                    Login
                </button>
                {/*  if there's an error  */}
                {loginError && (
                    <p className="text-red-500 text-sm mt-2">{loginError}</p>
                )}
            </form>

            <div>
                <p className="mt-4 text-gray-700">Don't have an account? <button onClick={switchToRegister} className="text-amber-500 underline">Register</button></p>
            </div>
        </div>
    );
}
export default Login;
