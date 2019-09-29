import React from "react";
import Button from "../Button";

export default ({ onClick, isFollowing }) => (
    <Button 
        onClick={onClick} 
        text={isFollowing? "Unfollow" : "Follow"} 
    />
);