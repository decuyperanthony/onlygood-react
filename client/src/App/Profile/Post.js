import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

const PostProfile = () => {
  const { filteredProfilePosts } = useSelector((state) => state.post);
  console.log('composant');
  return (
    <div>{filteredProfilePosts}</div>
  );
};

export default PostProfile;
