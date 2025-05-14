// เปรียบเหมือน store
export function searchReduer(state = { text: "" }, action) {
    switch (action.type) {
        case 'SEARCH_QUERY':
            return { ...state, ...action.payload }; //ส่งอะไรมาก็เก็บอันนั้น
        default:
            return state;
    }
}