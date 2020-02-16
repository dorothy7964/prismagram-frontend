import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Upload from "../Routes/Upload";
import FullFeed from "../Routes/FullFeed";
import Search from "../Routes/Search";
import Explore from "../Routes/Explore";
import Notifications from "../Routes/Notifications";
import ChatRoom from "../Routes/ChatRoom";
import Chat from "../Routes/Chat";
import EditProfile from "../Routes/EditProfile";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/upload" component={Upload} />
        <Route path="/fullFeed/:id" component={FullFeed} />
        <Route path="/search/:term" component={Search} />
        <Route path="/explore" component={Explore} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/chat/:roomId" component={ChatRoom} />
        <Route path="/chat" component={Chat} />
        <Route path="/editProfile/:editUser" component={EditProfile} />
        <Route path="/:userName" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
);

const Routes = ({ isLoggedIn }) => 
    isLoggedIn? <LoggedInRoutes /> : <LoggedOutRoutes />;

Routes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default Routes;