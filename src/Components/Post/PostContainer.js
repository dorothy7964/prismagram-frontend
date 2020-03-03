import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "../../SharedQueries";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
    id,
    location,
    caption,
    user,
    files,
    isLiked,
    likeCount,
    commentCount,
    comments,
    createdAt
}) => {
    const comment = useInput("");
    const [loading, setLoading] = useState(false);
    const [selfComments, setSelfComments] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const commentCountS = useState(commentCount)[0];
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    const toggleLike = () => {
        toggleLikeMutation();
        if(isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const onKeyPress = async e => {
        const { which } = e;
        if (which === 13){
            e.preventDefault();
            try {
                setLoading(true);
                comment.setValue("");
                const {
                    data: { addComment } 
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
            } catch {
                console.log(e);
                toast.error("Cant send comment");
            } finally {
                setLoading(false);
            }
       }
    };

    useEffect(() => {
        const totalFiles = files.length;
        let timer = null;
        if (currentItem === totalFiles-1){
            timer = setTimeout(() => setCurrentItem(0), 3000);
        } else {
            timer = setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
        return () => clearTimeout(timer);
    }, [currentItem, files]);

    return (
        <PostPresenter 
            id={id}
            location={location}
            caption={caption}
            user={user}
            files={files}
            currentItem={currentItem}
            isLiked={isLikedS}
            likeCount={likeCountS}
            commentCount={commentCountS}
            toggleLike={toggleLike}
            comments={comments}
            newComment={comment}
            selfComments={selfComments}
            onKeyPress={onKeyPress}
            createdAt={createdAt}
            loading={loading}
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
};

export default PostContainer;