// เปรียบเหมือน store
export function userReducer(state = null,action){
    switch(action.type){
        case 'LOGIN':
            return action.payload; //ส่งอะไรมาก็เก็บอันนั้น
        case 'LOGOUT':
            localStorage.clear()
            return action.payload;
        default:
            return state;
    }
}