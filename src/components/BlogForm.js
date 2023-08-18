import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { bool } from 'prop-types';
import useToast from '../hooks/toast';
const BlogForm = ({ editing}) => {

  const [title, setTitle] = useState('');
  const [originTitle, setOriginTitle] = useState('');
  const { id } = useParams();
  const [body, setBody] = useState('');
  const [originBody, setOriginBody] = useState('');
  const history = useHistory();
  const [publish, setPublish] = useState(false);
  const [originPublish, setOriginPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  // const [toasts, setToasts] = useState([]); 값이 변경되어야만 리랜더링이 일어남
  // const toasts = useRef([]); // 값의 변경이 일어나는 즉시 값에 반영됨
  // const [toastRerender, setToastRerender] = useState(false);
  // const [toasts, addToast, deleteToast] = useToast();
  const { addToast } = useToast();
  

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if (validateForm()) {
      if (editing) {
        axios.patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish,
        }).then(res => { console.log(res) });
      } else {
        axios.post('http://localhost:3001/posts', {
          title: title,
          body: body,
          publish,
          createdAt: Date.now(),
        }).then(() => {
            addToast({
              text : 'Successfully created',
              type : 'success'
            })
            history.push("/admin")
          });
      }
    }

  };

  const validateForm = () => {
    let validated = true;
    if (title === '') {
      setTitleError(true);
      validated = false;
    }
    if (body === '') {
      setBodyError(true);
      validated = false;
    }

    return validated;
  }

  const getPost = () => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setOriginTitle(res.data.title);
      setBody(res.data.body);
      setOriginBody(res.data.body);
      setPublish(res.data.publish);
      setOriginPublish(res.data.publish);
    });
  }

  useEffect(() => {
    if (editing) {
      getPost();
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originTitle || body !== originBody || publish !== originPublish;
  }

  // 뒤로가기
  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push('/blogs');
    }
  }

  // 체크 여부 변경
  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  }

  return (
    <div>
      <h1>{editing ? 'Edit' : 'create'} a blog post</h1>
      <div className='mb-3'>
        <label className='form-label'>Title</label>
        <input className={`form-control ${titleError ? 'border-danger' : ''}`} value={title} onChange={(e) => {
          setTitle(e.target.value);

        }} />
        {titleError && <div className='text-danger'>
          Title is required
        </div>}

      </div>
      <div className='mb-3'>
        <label className='form-label'>Body</label>
        <textarea className={`form-control ${bodyError ? 'border-danger' : ''}`} value={body} onChange={(e) => {
          setBody(e.target.value);
        }} rows='10' />
        {bodyError && <div className='text-danger'>
          Body is required
        </div>}
      </div>

      <div className='form-check mb-3'>
        <input className='form-check-input' type='checkbox' checked={publish} onChange={onChangePublish}></input>
        <label className='form-check-label'>Publish</label>
      </div>

      <button className='btn btn-primary' onClick={onSubmit} disabled={editing && !isEdited()}>{editing ? 'Edit' : 'Post'}</button>
      <button className='btn btn-danger ms-2' onClick={goBack}>Cancel</button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool,
}

BlogForm.defaultiProps = {
  editing: false
}

export default BlogForm;