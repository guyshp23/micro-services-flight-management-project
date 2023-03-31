import { action, Action } from 'easy-peasy';



export interface GloablPermissionsStore {
    data:           Array<string>;
    setPermissions: Action<GloablPermissionsStore, Array<string>>;
}

const permissions: GloablPermissionsStore = {
    data: [],

    setPermissions: action((state, payload) => {
        state.data = payload;
    }),
};

export default permissions;
