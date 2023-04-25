import { Admin } from "./entities";

export interface AdminPresenter extends Omit<Admin, 'password' | 'sessions'>{

}