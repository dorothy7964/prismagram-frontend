import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Photos, HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s linear;
    svg {
        fill: white;
    }
`;

const Container = styled(Link)`
    position: relative;
    user-select: none;
    background-image: url(${props => props.bg});
    background-size: cover;
    cursor: pointer;
    &:hover {
      ${Overlay} {
        opacity: 1;
      }
    }
`;

const PhotoIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 5px;
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &:first-child {
        margin-right: 30px;
    }
`;

const NumberText = styled.span`
    margin-left: 10px;
    font-size: 10px;
`;

const SquarePost = ({ id, file, filesCount, likeCount, commentCount }) => {
    return (
        <Container to={`/FullFeed/${id}`} bg={file.url} >
            {filesCount.length === 1 ? "" : (
                <PhotoIcon>
                    <Photos />
                </PhotoIcon>
            )}
            <Overlay>
                <Number>
                    <HeartFull />
                    <NumberText>{likeCount}</NumberText>
                </Number>
                <Number>
                    <CommentFull  />
                    <NumberText>{commentCount}</NumberText>
                </Number>
            </Overlay>
        </Container>
    );
};

SquarePost.propTypes = {
    id: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired,
    filesCount: PropTypes.array,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
};

export default SquarePost;