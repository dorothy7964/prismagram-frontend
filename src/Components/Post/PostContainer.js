import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
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
    const comment = useInput("");
    const [selfComments, setSelfComments] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    useEffect(() => {
        const totalFiles = files.length;
        let timer = null;
        if(currentItem === totalFiles-1){
            timer = setTimeout(() => setCurrentItem(0), 3000);
        }else {
            timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
        return () => clearTimeout(timer);
    }, [currentItem, files]);

    const toggleLike = () => {
        toggleLikeMutation();
        if(isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        }else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const onKeyPress = async e => {
        const { which } = e;
       if(which === 13){
            e.preventDefault();
            try {
                const {
                    data: { addComment } 
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
            }catch {
                toast.error("Cant send comment");
            }
       }
    };

    return (
        <PostPresenter 
            location={location}
            caption={caption}
            user={user}
            files={files}
            currentItem={currentItem}
            isLiked={isLikedS}
            likeCount={likeCountS}
            toggleLike={toggleLike}
            comments={comments}
            newComment={comment}
            selfComments={selfComments}
            onKeyPress={onKeyPress}
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