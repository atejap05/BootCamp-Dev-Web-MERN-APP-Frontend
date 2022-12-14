import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 

export function ProtectedRoute({Component}) {

    const location = useLocation();
    const navigate = useNavigate();
    
    const loggedInUser = 
    JSON.parse(localStorage.getItem("loggedInUser") || '""');

    useEffect( () =>
    {if(!loggedInUser) {
        navigate("/");
    } else {
        if(location.pathname === '/') {
            navigate("/permuta");
        }
    }
},[]);

    return <Component />
};