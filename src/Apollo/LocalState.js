/// // client.js 에서 cache.writeData 처리했다.
// export const defaults = {
//     isLoggedIn: Boolean(localStorage.getItem("token")) || false
// };

export const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
           return null;
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token");
            window.location = "/";
            return null;
        }
    }       
};