import React from "react";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";
import SearchPresenter from "./SearchPresenter";

export default ({ match: { params: { term } }}) => {
    const { data, loading } = useQuery(SEARCH, {
        skip: term === undefined,
        variables: { term },
        fetchPolicy: "cache-and-network"
    });
    
    return <SearchPresenter searchTerm={term} loading={loading} data={data} />
};