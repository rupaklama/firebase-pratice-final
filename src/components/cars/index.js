import React, { useEffect, useState } from 'react';

// to access cars collection in firestore to fetch documents
import { carsCollection } from '../../api/firebase';
import Form from './Form';

import { firebaseLooper } from './utils';

const Cars = () => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    // collectionRef returns a 'Snapshot' object - array of document objects
    // NOTE - Right now, we are accessing the firestore database & then using the Collection
    // now instead of doing this, we can use 'references'.
    // NOTE - We get the snapshotObject from the referenceObject using
    // the .get() method. ie. documentRef.get() or collectionRef.get()
    carsCollection
      // using 'Where' clause method for query like in sql, we can chain many of it
      // first arg is what we want to check - objects property
      // second arg is the comparison operator
      // third arg is the value for comparison
      // .where('color', '==', 'red')
      // .where('price', '>=', 300)
      // .where('price', '<=', 1000000)

      // order by method query
      // .orderBy('price') // default is ascending
      .orderBy('price', 'desc')
      // .orderBy('createdAt', 'asc') // by timestamp
      // .limit(20) // number of items to display
      // .limitToLast(20) // last - 20 items
      .get()
      .then(snapshot => {
        // firebaseLooper is a helper function with 'id' property
        const carsData = firebaseLooper(snapshot);

        setCars(carsData);
      })
      .catch(err => console.log(err));

    // collection reference
    // empoyeeRef.get().then(snapshot => {
    //   const employees = firebaseLooper(snapshot);
    //   console.log(employees);
    // });

    // 4xTId9rRHHx1w9TbnopR
    // carsCollection
    //   .doc('4xTId9rRHHx1w9TbnopR')
    //   .get()
    //   .then(snapshot => console.log(snapshot.data()));
  }, []);

  const handleCarData = () =>
    cars
      ? cars.map((car, i) => (
          <tr key={i}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.color}</td>
            <td>{car.price}</td>
          </tr>
        ))
      : null;

  return (
    <div>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
            <th>Available</th>
          </tr>
        </thead>

        <tbody>{handleCarData()}</tbody>
      </table>

      <hr />
      <Form />
    </div>
  );
};

export default Cars;
