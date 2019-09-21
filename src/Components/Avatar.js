import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getSize = size => {
    let number;
    if(size === "sm"){
        number = 30;
    }else if(size === "md"){
        number = 50;
    }else if (size === "lg") {
        number = 150;
    }
    return `
        width:${number}px;
        height:${number}px;
    `;
}

const getURL = avata => {
    if(avata === null){
        return `
            background-image:url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png);
        `;
    }
    return `
        background-image:url(${avata});
    `;
}

const Container = styled.div`
    ${props => getSize(props.size)} 
    ${props => getURL(props.url)} 
    background-size:cover;
    border-radius:50%;
`;


const Avatar = ({ className, size, url }) => (
    <Container className={className} size={size} url={url} />
);

Avatar.propTypes = {
    url: PropTypes.string,
    size: PropTypes.oneOf(["sm", "md", "lg"])
};

export default Avatar;