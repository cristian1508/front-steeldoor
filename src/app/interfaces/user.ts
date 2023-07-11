export class User{
    public Id : number;
    public Email : string;
    public Role : string;
    public readonly IsAdmin : boolean;

    constructor(id : number, email : string, role : string, isAdmin : boolean){
        this.Id = id;
        this.Email = email;
        this.Role = role;
        this.IsAdmin = this.Role === Roles.admin;
    }
}

export enum Roles{
    admin = 'admin',
    user = ''
}