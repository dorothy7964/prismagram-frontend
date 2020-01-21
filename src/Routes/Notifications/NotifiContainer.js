import React from "react";
import { useQuery } from "react-apollo-hooks";
import NotifiPresenter from "./NotifiPresenter";
import { ME } from "./NotificationsQueries";

export default () => {
    const { data, loading } = useQuery(ME, {
        fetchPolicy: "cache-and-network"
    });
    
    return <NotifiPresenter data={data} loading={loading} />
};



