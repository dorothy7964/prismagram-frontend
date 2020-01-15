import React from "react";
import { Helmet } from "react-helmet";
import Slick from "react-slick";
import styled from "styled-components";
import FatText from "../../Components/FatText"
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';
import "../../CSS/Arrow.css"

const Wrapper = styled.div`
    height: 100%;
`;

const UserCards = styled.div``;

const UserCardItem = styled.div`
    width: 200px !important;
`;

const PostsCards = styled.div``;

const Text = styled(FatText)`
    color: ${props => props.theme.darkGreyColor};
`;

const Slider = styled(Slick)`
    margin-top: 15px;
    margin-bottom: 50px;
    padding-left: 25px;
    button {
        margin-top: 48px;
    }
`;

const Section = styled.div`
    margin-top: 15px;
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

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
};

export default ({ data, loading }) => {
    const settings = {
        arrows: true,       // 좌우 화살 버튼 노출 여부 ( false 시 안보임 )
        infinite: false,    // 양방향 무한 모션
        speed: 500,         // 모션 스피드
        slidesToShow: 4,    // 한 화면에 보여줄 아이템수
        slidesToScroll: 4,  // 한번에 슬라이드 시킬 아이템 개수
        prevArrow: <Arrow className="slick-prev" />, // Custom Arrows - 이전 버튼
        nextArrow: <Arrow className="slick-next" />  // Custom Arrows - 다음 버튼 
    };

    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading && data && data.randomUser && data.randomPost){
        return (
            <Wrapper>
                <Helmet>
                    <title> Explore | Prismagram</title>
                </Helmet>
                <UserCards>
                    <Text text="팔로우 할 만한 계정 만들기" />
                        {data.randomUser.length === 0? (
                            <FatText text="No Users Found" />
                        ) : (
                            <Slider className="Slider" {...settings}>
                                {data.randomUser.map(user => (
                                    <UserCardItem key={user.id}>
                                        <UserCard 
                                            key={user.id}
                                            id={user.id}
                                            url={user.avatar}
                                            userName={user.userName}
                                            isFollowing={user.isFollowing}
                                        />
                                    </UserCardItem>
                                ))}
                            </Slider>
                        )}
                </UserCards>
                <PostsCards>
                    <Text text="탐색 탭" />
                    <PostSection>
                        {data.randomPost.length === 0? (
                            <FatText text="No Posts Found" />
                        ) : (
                            data.randomPost.map(post => (
                                <SquarePost 
                                    key={post.id}
                                    id={post.id}
                                    file={post.files[0]}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                />
                            ))
                        )}
                    </PostSection>
                </PostsCards>
            </Wrapper>
        );
    }
};


