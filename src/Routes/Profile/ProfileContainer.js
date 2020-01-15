import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { GET_USER, LOG_OUT } from "./ProfileQueries";

export default ({ match: { params: { userName } } }) => {
    const { data, loading } = useQuery(GET_USER, {
        variables: { userName }
    });
    const [logOut] = useMutation(LOG_OUT);
    
    return (
        <ProfilePresenter 
            data={data} 
            loading={loading} 
            logOut={logOut} 
        />
    );
};

