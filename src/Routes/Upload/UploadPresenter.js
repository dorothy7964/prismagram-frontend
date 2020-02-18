import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Slider from 'react-animated-slider';
import "./upload.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
    min-height: 80vh;
`;

const UploadForm = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const UploadImage = styled.div`
    background-image: url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    resize: both;
    margin-bottom: 10px;
`;

const TextInput = styled(Input)`
    margin-bottom: 10px;
`;

const FileSelect = styled.input`
    margin-bottom: 50px !important;
`;

const ButtonContainer = styled.span``;

export default ({
    isFile,
    loading,
    blobFile,
    captionInput,
    locationInput,
    handleChange,
    handleSubmit
}) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }else if(!loading) {
        return (
            <Wrapper>
                <Helmet>
                    <title>Uload | Prismagram</title>
                </Helmet>
                <UploadForm>
                    {isFile[0] && (
                        <Slider>
                            {blobFile.map((image, index) =>
                                <UploadImage url={image} key={index} />
                            )}
                        </Slider>
                    )}
                    <TextInput 
                        placeholder="caption"
                        value={captionInput.value}
                        onChangeText={captionInput.onChange}
                        {...captionInput} 
                    />
                    <TextInput 
                        placeholder="location"
                        value={locationInput.value}
                        onChangeText={locationInput.onChange}
                        {...locationInput} 
                    />
                    <FileSelect 
                        type="file" 
                        accept="image/*" 
                        placeholder="업로드 파일"
                        onChange={handleChange} 
                        multiple
                    />
                    <ButtonContainer onClick={handleSubmit}>
                        <Button text={"게시물 등록"} />
                    </ButtonContainer>
                </UploadForm>
            </Wrapper>
        );
    }
};
