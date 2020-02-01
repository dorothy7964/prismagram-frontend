import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { ROOMS_QUERY } from "./ChatQueries";
import ChatPresenter from "./ChatPresenter";

export default () => {
    const { data, loading } = useQuery(ROOMS_QUERY);

    useEffect(() => {
        console.log("ChatContainer");
    }, []);

    return (
        <ChatPresenter
            data={data} 
            loading={loading} 
        />

    );

};