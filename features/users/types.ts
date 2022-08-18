type User = {
    id: number;
    email: string;
    full_name: string;
    role: string;
    organisation_id: null | number;
    token: string;
}

export type Organisation = {
    id: number;
    name: string;
    employees_number: string;
    industry: string;
}

export default User;