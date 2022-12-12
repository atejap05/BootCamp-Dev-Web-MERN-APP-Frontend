import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 

export function ProtectedRoute({Component}) {

const navigate = useNavigate();
    
    const loggedInUser = 
    JSON.parse(localStorage.getItem("loggedInUser") || '""');

    useEffect( () =>
    {if(!loggedInUser) {
        navigate("/");
    }},
    []);

    return <Component />
};