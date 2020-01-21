import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from './FatText';
import FollowButton from "./FollowButton";

const Card = styled.div`
    ${props => props.theme.whiteBox}
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const CardAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const CardLink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

const UserCard = ({ id, url, userName, isFollowing, isSelf }) => {
    useEffect(() => {
        console.log("UserCard");
    }, []);
    return (
        <Card>
            <CardAvatar size={"md"} url={url} />
            <CardLink to={`/${userName}`}>
                <FatText text={userName} />
            </CardLink>
            {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
        </Card>
    );
};

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isSelf: PropTypes.bool
};

export default UserCard;