import React, { useState, Fragment } from 'react';
import { carsCollection, firebaseTimestamp } from '../../api/firebase';

const Form = () => {
  const [state, setState] = useState({
    brand: '',
    color: '',
    price: '',
    available: false,
  });

  const { brand, color, price, available } = state;

  const onChangeHandler = e => {
    // setState({ ...state, [e.target.name]: e.target.value });
    // same as above
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // console.log(state);
    // We can also add documents to collections using the collectionRef object using the .add() method.
    // collectionRef.add({//value: prop})
    carsCollection
      .add({
        ...state,
        price: Number(state.price),
        createdAt: firebaseTimestamp(),
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));

    setState({ brand: '', color: '', price: '', available: false });
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Brand</label>
          <input
            type='text'
            className='form-control'
            name='brand'
            value={brand}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>Color</label>
          <input
            type='text'
            className='form-control'
            name='color'
            value={color}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>Price</label>
          <input
            type='text'
            className='form-control'
            name='price'
            value={price}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>Available</label>
          <select
            className='form-control'
            name='available'
            value={available}
            onChange={onChangeHandler}
          >
            <option value='true'>YES</option>
            <option value='false'>NO</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
