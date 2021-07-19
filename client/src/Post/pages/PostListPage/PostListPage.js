import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import { logOutUser } from '../../../User/UserActions';
import Logo from '../../../logo.svg';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const PostListPage = ({ showAddPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data) || []
  const token = useSelector(state => state.user.token)


  useEffect(() => {
    dispatch(fetchPosts(token))
  },[]);

  const handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post,token));
    }
  };

  const handleAddPost = (post) => {
    dispatch(addPostRequest(post,token));
  };
  const logOut = () => {
    dispatch(logOutUser())
  };

  return (
   
    <div className="container">
            { token === "" ? <Redirect to='/'/>
      :''  }
      <div className="d-flex justify-content-end"> 
            <Button className="mt-4" onClick={logOut} color="default"> LOG OUT </Button>
        </div>
      <div className="row"> 
           
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        
        </div>
      
      </div>
      <hr />
      <div className="row">
     
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
