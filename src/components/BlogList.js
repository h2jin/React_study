import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import Card from "../components/Card";
import { useHistory } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from 'prop-types';
import Pagination from "./Pagination";
import { useLocation } from 'react-router-dom';
import useToast from "../hooks/toast";

const BlogList = ({ isAdmin }) => {
    const history = useHistory();
    const location = useLocation(); // location.search
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0); // 총 post 수
    const [numberOfPages, setNumberOfPages] = useState(0); // 총 page 수
    const limit = 5; // 페이지 당 글 개수
    const [searchText, setSearchText] = useState('');

    const {addToast} = useToast();



    // useEffect 
    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    const onClickPageButton = (page) => {
        history.push(`${location.pathname}?page=${page}`);
        setCurrentPage(page);
        getPosts(page);

    }

    const onSearch = (e) => {
        if (e.key == 'Enter') {
            getPosts(1);
        }
    }

    const getPosts = (page = 1) => {
        // json-server를 이용해서 미리 정해져 있음
        // 나중에 서버 직접 구축하면 커스텀 할 수 있음

        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
            title_like: searchText, // 검색창에 데이터가 있어야만 검색 처리가 됨. 아니면 null
        }

        if (!isAdmin) {
            params = { ...params, publish: true };
        }

        axios.get(`http://localhost:3001/posts`, {
            params
        }).then((res) => {
            setNumberOfPosts(res.headers['x-total-count']);
            setPosts(res.data);
            setLoading(false);
        })
    }; // isAdmin이 변경되지 않는 한 함수가 새로 생성되지 않는다. - useCallbackd



    const deleteBlog = (e, id) => { // id : 삭제하고자 하는 아이디 값
        e.stopPropagation(); // 이벤트 버블링 방지
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => { // 리렌더링
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            addToast({
                text: "Successfully delete",
                type: 'success'
            })
        });
    }

    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    }, [posts]); // 


    const renderBlogList = () => {
        if (loading) {
            return (
                <LoadingSpinner />
            )
        }

        if (posts.length === 0) {
            return (
                <div>No blog posts found</div>
            )
        }

        return (posts).map((post) => {
            return (
                <Card
                    key={post.id}
                    title={post.title}
                    onClick={() => history.push(`/blogs/${post.id}`)}
                >
                    {isAdmin ? <div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => deleteBlog(e, post.id)}>
                            Delete
                        </button>
                    </div> : null}
                </Card>
            )
        });
    }

    return (
        <div>
            <input type="text" placeholder="Search.." className="form-control" value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
                onKeyUp={onSearch}
            />
            <hr />
            {renderBlogList()}
            {numberOfPages > 1 && <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton} />}
        </div>
    );

}

BlogList.propTypes = {
    isAdmin: bool,
}  

BlogList.defaultProps = {
    isAdmin: false,
}

export default BlogList;