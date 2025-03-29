export class UserRegistrationRequest {
    email: string;
    password: string;
    fullname: string;
    userRole: UserRole

    constructor(email: string, password: string, fullname: string, userRole: UserRole) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.userRole = userRole;
    }
}