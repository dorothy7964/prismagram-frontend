import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius:0px;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

export default ({
    action, 
    setAction,
    userName,
    email,
    firstName,
    lastName,
    secret,
    onSubmit
}) => (
    <Wrapper>
        <Form>
            {action === "logIn" && (
                <React.Fragment>
                    <Helmet>
                        <title>Log In | Prismagram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Button text={"Log In"} />
                    </form>
                </React.Fragment>
            )}
            {action === "signUp" && (
                <React.Fragment>
                    <Helmet>
                        <title>Sign Up | Prismagram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"First name"} {...firstName} />
                        <Input placeholder={"Last name"} {...lastName} />
                        <Input placeholder={"userName"} {...userName} />
                        <Input placeholder={"Email"} {...email} type="email" />
                        <Button text={"Sign up"} />
                    </form>
                </React.Fragment>
            )}
            {action === "confirm" && (
                <React.Fragment>
                    <Helmet>
                        <title>Confirm Secret | Prismagram</title>
                    </Helmet>
                    <form onSubmit={onSubmit}>
                        <Input placeholder="Paste your secret" required {...secret} />
                        <Button text={"Confirm"} />
                    </form>
                </React.Fragment>
            )}
        </Form>
        {action !== "confirm" && (
            <StateChanger>
                {action === "logIn"? (
                    <React.Fragment>
                        Don't have an account?{" "}
                        <Link onClick={() => setAction("signUp")}>Sign up</Link>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        Have an account?{" "}
                        <Link onClick={() => setAction("logIn")}>Log in</Link>
                    </React.Fragment>
                )}
            </StateChanger>
        )}
    </Wrapper>
);