import React, { useEffect } from "react";
// import { useQuery, useMutation } from "react-apollo-hooks";
import { useQuery } from '@apollo/client';
import { SEEROOMS_QUERY } from "./ChatQueries";
import ChatPresenter from "./ChatPresenter";

export default () => {
    const { data, loading } = useQuery(SEEROOMS_QUERY);

    useEffect(() => {
        console.log("챗");
    }, []);

    return (
        <ChatPresenter
            data={data} 
            loading={loading} 
        />

    );

};