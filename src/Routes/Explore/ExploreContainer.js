import React from "react";
import ExplorePresenter from "./ExplorePresenter";
import { ALL_USERS } from "./ExploreQueries";
import { useQuery } from "react-apollo-hooks";

export default () => {
    const { data, loading } = useQuery(ALL_USERS, {
        fetchPolicy: "cache-and-network"
    });
    
    return (
        <ExplorePresenter data={data} loading={loading} />
    );
};