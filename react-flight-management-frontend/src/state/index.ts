import { createStore } from 'easy-peasy';
import user, { UserStore } from './user';
import airports, { AirportsStore } from './airports';


export interface ApplicationStore {
    user:        UserStore;
    airports: AirportsStore;
}

const state: ApplicationStore = {
    user,
    airports,
};

export const store = createStore(state);
