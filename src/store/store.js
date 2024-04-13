import {create} from 'zustand';
import {createStore} from 'redux';

export const useAuthStore = create((set) => ({
    auth : {
        username : '',
        active : false
    },
    setUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }}))
}))

const reducerFn = (state = { username : '', active : false}, action) => {

    if (action.type === "SETNAME"){
        return {username: action.payload}
    }

    return state;
}

const store = createStore(reducerFn);
export default store;