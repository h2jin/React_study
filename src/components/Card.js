import PropTypes from 'prop-types';

const Card = ({ title, onClick, children }) => {
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    );
}

// 데이터 타입을 지정할 수 있다. 
// isRequired -> 반드시 값을 넣어줘야 한다.
Card.propTypes = {
    title : PropTypes.string.isRequired,
    children : PropTypes.element,
    onClick : PropTypes.func,
}
// default 값 설정 가능
Card.defaultProps = {
    title : "Title",
    children : null,
    onClick : () => {},
}

export default Card;