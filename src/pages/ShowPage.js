import { useParams } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            console.log(res.data);
            setPost(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        getPost(id);
    }, [id]);

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className='d-flex'>
                <h1 className='flex-grow-1'>{post.title}</h1>
                <div>
                    <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>Edit</Link>
                </div>
            </div>
            <small className='text-muted'>{printDate(post.createdAt)}</small>
            <p>{post.body}</p>
            {/* <button onClick={() => history.push('/blogs/2')}>Click</button> */}
        </div>
    );
}

export default ShowPage;