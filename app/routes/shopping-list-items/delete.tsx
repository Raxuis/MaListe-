import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";

const Delete = () => {
    const {id, itemId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}/${itemId}`, {
            method: 'DELETE'
        });
        response.then(() => {
            navigate(`/shopping-lists/${id}/items`);
        });
    }, []);
    return (
        <div>
            Delete
        </div>
    );
};

export default Delete;
