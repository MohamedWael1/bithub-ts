import User from "./types";
import client from "@lib/client"

type OnLoginCallback = (user: User) => void;
type OnLogoutCallback = () => void;

type Credentials = {
    email: string;
    password: string;
}

type RegisterData = {
    email: string;
    password: string;
    password_confirmation: string;
    full_name: string;
    role: "organisation_admin"
}

type LoginResult = {
    user: User
}

type RegisterResult = LoginResult;

class Auth{
    private STORAGE_KEY = "__auth_🗝️__";
    private loginListeners: Set<OnLoginCallback>;
    private logoutListeners: Set<OnLogoutCallback>;

    constructor(){
        this.loginListeners = new Set();
        this.logoutListeners = new Set();
    }

    async register(data: RegisterData): Promise<User>{
        const res = await client.post<RegisterResult>(`/api/web/users`, data);
        const user = res.data.user;
        this.storeUser(user);
        this.loginListeners.forEach(listener => listener(user));
        return user;
    }

    async login(credentials: Credentials): Promise<User>{
        const res = await client.post<LoginResult>("/api/web/users/login", credentials);
        const user = res.data.user;
        this.storeUser(user);
        this.loginListeners.forEach(listener => listener(user));
        return user;
    }

    async logout(){
        this.removeUser();
        this.logoutListeners.forEach(listener => listener());
    }

    storeUser(user: User): void{
        if(typeof window === "undefined") return;

        window.localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(user)
        );
    }

    getUser(): User | null{
        if(typeof window === "undefined") return null;
        const user = window.localStorage.getItem(this.STORAGE_KEY) || "";
        return JSON.parse(user) || null;
    }

    removeUser(): void{
        if(typeof window === "undefined") return;
        window.localStorage.removeItem(this.STORAGE_KEY);
    }
}

const auth = new Auth();

export default auth;