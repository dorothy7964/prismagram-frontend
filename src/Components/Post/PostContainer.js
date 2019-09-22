import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
    id,
    location,
    caption,
    user,
    files,
    isLiked,
    likeCount,
    comments,
    createdAt
}) => {
    const [currentItem, setCurrentItem] = useState(0);
    
    useEffect(() => {
        const totalFiles = files.length;
        if(currentItem === totalFiles-1){
            setTimeout(() => setCurrentItem(0), 3000);
        }else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    }, [currentItem, files]);

    return (
        <PostPresenter 
            location={location}
            caption={caption}
            user={user}
            files={files}
            currentItem={currentItem}
            isLiked={isLiked}
            likeCount={likeCount}
            comments={comments}
            createdAt={createdAt}
        />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string,
    caption: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    isLiked: PropTypes.bool.isRequired,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
}
export default PostContainer;