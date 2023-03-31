import { createStore } from 'easy-peasy';
import user, { UserStore } from './user';
import permissions, { GloablPermissionsStore } from './permissions';


export interface ApplicationStore {
    user:        UserStore;
    permissions: GloablPermissionsStore;
}

const state: ApplicationStore = {
    user,
    permissions,
};

export const store = createStore(state);
