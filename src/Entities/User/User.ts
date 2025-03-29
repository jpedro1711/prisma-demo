import {UserRole} from "@prisma/client";

export class User {
    email: string;
    fullname: string;
    password: string;
    userRole: UserRole;

    constructor(email: string, fullname: string, password: string, userRole: UserRole) {
        this.email = email;
        this.fullname = fullname;
        this.password = password;
        this.userRole = userRole;
    }
}
