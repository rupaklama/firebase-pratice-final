import React, { useState } from 'react';
import { usersRef } from '../../api/firebase';
import List from './List';

const Upload = () => {
  const [state, setState] = useState({
    file: null,
    url: '',
    progress: 0,
  });

  const handleChange = e => {
    // to make sure we selected some files
    // if we have a file inside of an event, we want to move forward
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setState({ file: file });
    }
  };

  const handleUpload = e => {
    e.preventDefault();

    // since now we have file in our state, we have access to it
    const { file } = state;

    // store it in our firebase storage
    usersRef
      // child method is to create a relative file path from this reference
      // creating dirs - images/users/
      // .child(`/images/users/${file.name}`)
      // NOTE - we have to manually create a file path which is a problem when we have tons of dirs
      // So, we will create a Reference Object for that in firebase.js - usersRef
      .child(`${file.name}`)

      // put method - Uploads data to the above reference's location
      .put(file)

      // to get download url for the file need to use uploadTask
      // .snapshot.ref.getDownloadURL()
      .then(() => console.log('file uploaded'))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div className='form-group'>
          <label>File</label>
          <input className='form-control' type='file' onChange={handleChange} />
        </div>

        <button type='submit' className='btn btn-primary'>
          Upload file
        </button>
      </form>

      <hr />
      <List />
    </div>
  );
};

export default Upload;
