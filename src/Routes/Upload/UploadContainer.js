import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import axios from "axios";
import { UPLOAD } from "./UploadQueries"
import { FEED_QUERY } from "../../SharedQueries";
import useInput from "../../Hooks/useInput";
import UploadPresenter from "./UploadPresenter";

export default ({ history }) => {
    const captionInput = useInput("");
    const locationInput = useInput("");
    const awsFile = useState([])[0];
    const blobFile = useState([])[0];
    const [isFile, setIsFile] = useState({});
    const [loading, setLoading] = useState(false);
    const [uploadMutation] = useMutation(UPLOAD, {
        refetchQueries: () => [{ 
            query: FEED_QUERY,
            variables: {
                pageNumber: 0,
                items: 4
            }
        }]
    });

    const url = process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://prisma-gram-backend.herokuapp.com"


    const handleChange = async (e) => {
        if(blobFile.length >= 5){
            return toast.error("사진 5장 까지 업로드 가능합니다.");
        }

        const files = e.target.files;
        setIsFile(files);
        for(var value of files){
            var obj = window.URL.createObjectURL(value);
            blobFile.push(obj);
            awsFile.push(value);
        }
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (captionInput.value === "") {
            return toast.error("caption을 작성 해주세요.");
        } else if (awsFile.length === 0){
            return toast.error("파일 선택 해주세요.");
        }

        const formData = new FormData();
        for(var result of awsFile){
            formData.append("file", result);
        }

        try {
            setLoading(true);
            const {
                data: { location }
            } = await axios.post(`${url}/api/uploads`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            
            const {
                data: { upload }
            } = await uploadMutation({
                variables: {
                    files: location,
                    caption: captionInput.value,
                    location: locationInput.value
                }
            });
            if(upload){
                toast.success("업로드 되었습니다.")
                history.push(`/`);
            }
        } catch(e) {
            toast.error("업로드 실패하였습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => window.URL.revokeObjectURL(blobFile);
    }, []);

    return (
        <UploadPresenter
            isFile={isFile}
            loading={loading}
            blobFile={blobFile}
            captionInput={captionInput}
            locationInput={locationInput}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
};