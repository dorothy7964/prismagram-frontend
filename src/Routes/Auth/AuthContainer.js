import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";

export default () => {
    const [action, setAction] = useState("logIn");

    return (
        <AuthPresenter 
            action={action} 
            setAction={setAction}
        />
    );
};