import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

export default () => {
    const [action, setAction] = useState("logIn");
    const userName = useInput("");
    const email = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret = useInput("");
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: { email: email.value }
    });

    const onSubmit = e => {
        e.preventDefault();
        if(email !== ""){
            requestSecretMutation();
        }
    };
    
    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction}
            userName={userName}
            email={email}
            firstName={firstName}
            lastName={lastName}
            secret={secret}
            onSubmit={onSubmit}
        />
    );
};