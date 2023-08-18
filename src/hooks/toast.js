// 커스텀 훅 만들기
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addToast as add, removeToast } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

const useToast = () => {
    const toasts = useRef([]); // 값의 변경이 일어나는 즉시 값에 반영됨
    const [toastRerender, setToastRerender] = useState(false);
    const dispatch = useDispatch();


    // delete 하기 위해서 id값 있어야 함. -> uuidv4 사용
    const deleteToast = (id) => {
        // const filteredToasts = toasts.current.filter(toast => {
        //     return toast.id !== id;
        // });
        // toasts.current = filteredToasts;
        // setToastRerender(prev => !prev);

        dispatch(removeToast(id));

    }

    const addToast = (toast) => {
        // 기존 토스트 객체에 id값을 추가
        const id = uuidv4();

        const toastWithId = {
            ...toast,
            id,
        };

        dispatch(add(toastWithId)); // action.payload를 통해 파라미터 값으로 넘어가고 slice에 있는 배열에 toast값이 추가된다.

        // toasts.current = [...toasts.current, toastWithId];
        // setToastRerender(prev => !prev);

        setTimeout(() => {
            deleteToast(id);
        }, 3000)
    };

    return {
        addToast,
        deleteToast,
    };
    // 배열보다는 객체로 히처와응 ㅅ리 도가
}

export default useToast;