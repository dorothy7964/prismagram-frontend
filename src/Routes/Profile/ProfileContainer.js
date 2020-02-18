import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import axios from "axios";
import ProfilePresenter from "./ProfilePresenter";
import { LOG_OUT, EDIT_PROFILE } from "./ProfileQueries";
import { GET_USER } from "../../SharedQueries";

export default ({ match: { params: { userName } } }) => {
    const [fileLoading, setFileLoading] = useState(false);
    const { data, loading, refetch } = useQuery(GET_USER, {
        variables: { userName },
        fetchPolicy: "cache-and-network"
    });
    const [editAvatarMutaion] = useMutation(EDIT_PROFILE, {
        refetchQueries: () => [{
            query: GET_USER,
            variables: { userName }
        }]
    });
    const [logOut] = useMutation(LOG_OUT);

    const url = process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://prisma-gram-backend.herokuapp.com"

    const handleChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
            setFileLoading(true);
            const {
                data: { location }
            } = await axios.post(`${url}/api/upload`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            
            const {
                data: { editUser }
            } = await editAvatarMutaion({
                variables: {
                    avatar: location,
                }
            });
            if(editUser){
                toast.success("업로드 되었습니다.")
            }
        } catch(e){
            toast.error("업로드 실패하였습니다.");
        } finally{
            setFileLoading(false);
        }
    }

    useEffect(() => {
        refetch();
      }, [])

    return (
        <ProfilePresenter 
            data={data} 
            loading={loading} 
            logOut={logOut} 
            fileLoading={fileLoading}
            handleChange={handleChange}
        />
    );
};

