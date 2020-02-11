import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { SEE_LIKE, READ_LIKE } from "./NoticeLikeQueries";
import NoticeLikePresenter from "./NoticeLikePresenter";

export default withRouter(({ history, toggleButton }) => {
    const { data, loading, refetch } = useQuery(SEE_LIKE);
    const [readLikeMutation] = useMutation(READ_LIKE);

    const handleClick = async (likeId, postId) => {
        try {
            await readLikeMutation({
                refetchQueries:() => [{
                    query: SEE_LIKE,
                }],
                variables: {
                    likeId
                }   
            }); 
            history.push(`/FullFeed/${postId}`);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        refetch();
    }, []);

    return (
        <NoticeLikePresenter 
            data={data}
            loading={loading}
            toggleButton={toggleButton}
            handleClick={handleClick}
        />
    );
});



