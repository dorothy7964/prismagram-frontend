import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import NotifiPresenter from "./NotifiPresenter";

const ME = gql`
    query {
        me {
            followers {
                    id
                    userName
                    avatar
                    isFollowing
                }
            }
        }
`;

export default () => {
    const { data, loading } = useQuery(ME);

    return <NotifiPresenter data={data} loading={loading} />
};



