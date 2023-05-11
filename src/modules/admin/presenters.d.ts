import { Admin, Session } from "./entities";

export interface AdminPresenter extends Omit<Admin, 'password' | 'sessions'>{

}

export interface SessionPresenter extends Session {}