import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";

export default () => {
    const [action, setAction] = useState("logIn");
    const userName = useInput("");
    const email = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret = useInput("");

    console.log(
        "userName",userName,
        "firstName",firstName,
        "lastName",lastName,
        "email",email,
        "secret",secret,
    );

    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction}
            userName={userName}
            email={email}
            firstName={firstName}
            lastName={lastName}
            secret={secret}
        />
    );
};