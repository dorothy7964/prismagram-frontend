import React from "react";
import { useQuery } from "react-apollo-hooks";
import PropTypes from "prop-types";
import SearchCardPresenter from "./SearchCardPresenter";
import { SEARCH } from "./SearchCardQueries";


const SearchCardContainer = ({ term }) => {
    const { data, loading } = useQuery(SEARCH, {
        skip: term.value === "",
        variables: { 
            term: term.value 
        },
        fetchPolicy: "network-only"
    });

    return (
        <SearchCardPresenter
            data={data}
            loading={loading}
        />
    );
};

SearchCardContainer.propTypes = {
    term: PropTypes.shape({
        value: PropTypes.string.isRequired
    }).isRequired,
};

export default SearchCardContainer;