import {useStore} from "../resources/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    const user = useStore((state) => state.user);
    const loggedIn = useStore((state) => state.loggedIn);

    useEffect(() => {
        if (!loggedIn || !user) {
            navigate('/');
        }
    }, [loggedIn, user, navigate]);

    return (
        <div>
            <h1>User Profile</h1>
        </div>
    );
}

export default UserProfile;