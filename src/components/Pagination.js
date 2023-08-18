import propTypes from 'prop-types'

const Pagination = ({currentPage, numberOfPages, onClick, limit}) => {
    
    const currentSet = Math.ceil(currentPage/limit); // 현재 페이지의 페이징 번호 (1~5 -> 1, 6~10-> 2 ...)
    const startPage = limit * (currentSet - 1) + 1; // 1 -> 1 / 2 -> 6 / 3 -> 11 ...
    const lastSet = Math.ceil(numberOfPages/limit); // 
    const numberOfPageForSet = currentSet === lastSet && numberOfPages % limit !== 0 ? numberOfPages % limit : limit; 
    // 마지막 페이징이라면 총 게시글을 limit으로 나눈 후 나머지 개수만 가짐

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {currentSet !== 1 &&
                    <li className="page-item">
                    <div className="page-link cursor-pointer" onClick={() => onClick(startPage - limit)}>Previous</div>
                    </li>
                }

                {Array(numberOfPageForSet).fill(startPage).map((value, index) => value + index).map((pageNumber) => {
                    return <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                        <div className="page-link cursor-pointer" onClick={() => {onClick(pageNumber)}}>{pageNumber}</div></li>
                }) }

                {currentSet !== lastSet &&
                    <li className="page-item">
                    <div className="page-link cursor-pointer" onClick={() => onClick(startPage + limit)} >Next</div>
                    </li>
                }
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    currentPage : propTypes.number,
    numberOfPages : propTypes.number.isRequired,
    onClick : propTypes.func.isRequired,
    limit : propTypes.number,
}

Pagination.defaultProps = {
    currentPage : 1,
    limit : 5,
}

export default Pagination;