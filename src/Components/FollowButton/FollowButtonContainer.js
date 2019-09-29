import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { TOGGLEFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ id, isFollowing })  => {
    const [isFollowingS, setIsFollowing] = useState(isFollowing);
    const [followMutation] = useMutation(TOGGLEFOLLOW, {
        variables: { id }
    });

    const onClick = () => {
        followMutation();
        if(isFollowingS === true){
            setIsFollowing(false);
        }else {
            setIsFollowing(true);
        }
    };

    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />
};


FollowButtonContainer.propTypes = {
    id: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired
};

export default FollowButtonContainer;

