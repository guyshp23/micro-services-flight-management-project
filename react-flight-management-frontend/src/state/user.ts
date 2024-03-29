import { Action, action } from 'easy-peasy';

export interface UserData {
    id:        number;     
    username:  string;
    email:     string;
    permissions: string[];
    isAdmin:   boolean;
}

export interface UserStore {
    data?: UserData;
    setUserData: Action<UserStore, UserData>;
    updateUserData: Action<UserStore, Partial<UserData>>;
}

const user: UserStore = {
    data: undefined,
    setUserData: action((state, payload) => {
        state.data = payload;
    }),

    
    updateUserData: action((state, payload) => {
        // Yes, this is a cool trick to reset the user data.
        // It's a bit hacky, but it works and that's all that matters :)
        if (JSON.stringify(payload) === "{}"){
            state.data = undefined;
        }
        // can't do much about that currently unfortunately.
        // @ts-expect-error limitation of Typescript, 
        state.data = { ...state.data, ...payload };
    }),
};

export default user;