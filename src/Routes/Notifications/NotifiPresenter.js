import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import UserCard from "../../Components/UserCard";
import FollowButton from "../../Components/FollowButton";

const Wrapper = styled.div`
    height: 100%;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 45px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
    button {
        margin-top: 48px;
    }
`;

export default ({ data, loading }) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading && data && data.me) {
        const {
            me: {
                followers
            }
        } = data;
        return (
            <Wrapper>
                <Section>
                    {followers.length === 0? (
                            <FatText text="No notifications" />
                        ) : ""
                    }
                    {followers &&
                        followers.map(user => (
                            <UserCard 
                                key={user.id}
                                id={user.id}
                                url={user.avatar}
                                userName={user.userName}
                                isFollowing={user.isFollowing}
                            />
                    ))}
                </Section>
            </Wrapper>
        );
    }
};