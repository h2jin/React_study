import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts : [],
}

const toastSlice = createSlice({
    name : 'toast',
    initialState,
    reducers : { // 관리하기 위한 함수들
        addToast : (state, action) => {
            state.toasts.push(action.payload) // action의 payload -> 호출했을 때의 파라미터 값
        },
        removeToast : (state, action) => {
            state.toasts = state.toasts.filter(toast => {
                return toast.id !== action.payload;
            })
        }
    }
});

// console.log(toastSlice.actions.addToast('hello'));;

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;