import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "../../SharedQueries";
import FullPostPresenter from "./FullPostPresenter";


const FullPostContainer = ({
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
    const [loading, setLoading] = useState(false);
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
    
    const slideNext = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
            setCurrentItem(0);
        } else {
            setCurrentItem(currentItem + 1);
        }
    };

    const slidePrev = () => {
        const totalFiles = files.length;
        if (currentItem === 0) {
            setCurrentItem(totalFiles - 1);
        } else {
            setCurrentItem(currentItem - 1);
        }
    };

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
                setLoading(true);
                comment.setValue("");
                const {
                    data: { addComment } 
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
            }catch {
                console.log(e);
                toast.error("Cant send comment");
            }finally {
                setLoading(false);
            }
       }
    };

    return (
        <FullPostPresenter 
            location={location}
            caption={caption}
            user={user}
            files={files}
            currentItem={currentItem}
            slideNext={slideNext}
            slidePrev={slidePrev}
            isLiked={isLikedS}
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

FullPostContainer.propTypes = {
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

export default FullPostContainer;