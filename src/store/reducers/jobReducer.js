import { ActionTypes } from "store/actions/types";
import AxiosConfig from "AxiosConfig";


const jobReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ALL_JOBS:
            AxiosConfig.get('jobs/')
                .then(res => {
                    return {
                        ...state,
                        jobs: res.data
                    };
                })
                .catch(err => console.log(err));
            break;
        default:
            return state;
    }
};

export default jobReducer;