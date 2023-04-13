import { FormControl } from "@angular/forms";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  isActive: boolean;
}
