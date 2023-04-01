import { action, Action } from 'easy-peasy';



export interface AirportsStore {
    data:        Array<string>;
    setAirports: Action<AirportsStore, Array<string>>;
}

const airports: AirportsStore = {
    data: [],

    setAirports: action((state, payload) => {
        state.data = payload;
    }),
};

export default airports;
