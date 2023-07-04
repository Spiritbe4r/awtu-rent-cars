import { IGallery } from "./gallery";

export interface User {
  id: string;
  name: string | null;
  lastName: string | null;
  email: string;
  username: string;
  phoneNumber: string | null;
  profileImage?: IGallery;
  addressId: string | null;
  roles: string[];
  active: boolean;

}