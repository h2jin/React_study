import propTypes from 'prop-types';


const Toast = ({ toasts, deleteToast}) => {
    return (
        <div className="position-fixed bottom-0 end-0 p-2">
            { toasts.map( toast => {
                return <div onClick={() => {deleteToast(toast.id)}} key={toast.id} className={`alert alert-${toast.type || 'success'} m-0 py-2 mt-2`}>{toast.text}</div>})}
            {/* 데이터 원본이 BlogList에 있기 때문에 deleteToast 함수를 파라미터로 받아와야 한다. */}
        </div>
    );
}

Toast.propTypes = {
    toasts : propTypes.arrayOf(propTypes.shape({
        text : propTypes.string,
        type : propTypes.string
    })).isRequired,
    deleteToast : propTypes.func.isRequired,
}

Toast.defaultProps = {
    toasts : []
}

export default Toast;