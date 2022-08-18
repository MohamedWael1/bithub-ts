import axios from "axios";
import auth from "@features/users/auth";
import AppError from "@lib/error";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

client.interceptors.request.use((config: any) => {
    const user = auth.getUser();

    if(user){
        config.headers["Authorization"] = `Token token=${user.token}`;
    }

    return config;
})

client.interceptors.response.use(
    res => res,
    err => {
        const res = err.response;

        if(res && res.status === 401){
            auth.logout();
            throw new AppError("Token has expired.", "unauthorized");
        }

        if(res && res.status >= 500){
            throw new AppError("Sever Error", "server_error");
        }

        if(res){
            return res;
        }

        if(err.request){
            throw new AppError("Network error!", "network_error");
        }
    }
);

export default client;