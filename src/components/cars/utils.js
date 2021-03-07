// functions to reuse in our app

// since we don't get 'id' in snapshot object,
// creating helper function to store snapshot object with 'id' in our Collection Reference object
export const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(doc => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return data;
};
