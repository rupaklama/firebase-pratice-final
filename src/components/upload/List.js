import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersRef } from '../../api/firebase';

const List = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleGetAll = () => {
    // listAll method to display all lists
    usersRef.listAll().then(data => {
      let imagesArray = [];

      data.items.forEach(item => {
        // getting download url for each element
        item.getDownloadURL().then(url => {
          imagesArray.push({
            name: item.name,
            link: url,
          });
          setImages(imagesArray);
        });
      });
    });
  };

  const handleDelete = name => {
    usersRef
      .child(name)
      .delete()
      .then(() => console.log('delete'))
      .catch(err => console.log(err));

    handleGetAll();
  };

  return (
    <div>
      List of uploads
      {images
        ? images.map((item, i) => (
            <div key={i}>
              <strong>{item.name}</strong> -
              <Link to={{ pathname: item.link }} target='_blank'>
                Open it
              </Link>{' '}
              -<div onClick={() => handleDelete(item.name)}>Delete</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default List;
