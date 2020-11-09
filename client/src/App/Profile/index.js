import React from 'react';

const Profile = ({ data }) => {
  console.log('data in profile', data);

  return (
    <>
      <div>
        {data.firstname}
        {' '}
        {data.lastname}
      </div>
      <div>
        {data.email}
      </div>
    </>
  );
};

export default Profile;
