export interface UserResponse {
    id:             string;
    name:           string | undefined;
    username:       string;
    email:          string;
    roles:          string[];
    status:         string;
    profilePicture: Image | undefined;
    isAdmin: boolean;
}

interface Image{

    id:string ;
    url:string;
}