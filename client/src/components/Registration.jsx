import {useStore} from "../resources/store";

const Registration = () => {
    const register = useStore((state) => state.register);
    return (
        <div>
            <form>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Username"
                        id="username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Password"
                        id="password"
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        const username = document.getElementById("username").value;
                        const password = document.getElementById("password").value;
                        console.log(username, password);
                        register(username, password);
                    }}
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
export default Registration;