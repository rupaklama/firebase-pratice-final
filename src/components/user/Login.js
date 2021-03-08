import React, { useState, Fragment } from 'react';
import firebase, { usersCollection } from '../../api/firebase';

const Login = () => {
  const [state, setState] = useState({
    // false if user is not registered
    register: true,

    email: '',
    password: '',
  });

  const { register, email, password } = state;

  const onChangeHandler = e => {
    // setState({ ...state, [e.target.name]: e.target.value });
    // same as above
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    // register user
    if (register) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        // this is all good, we get response object in firebase - data
        .then(response => {
          // store user in db
          handleStoreRegisterUser(response);

          // verify user after register
          response.user
            .sendEmailVerification()
            .then(() => {
              console.log('email sent');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      // sign in user
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }

    setState({
      email: '',
      password: '',
    });
  };

  // logout user
  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => alert('You are logged out!'))
      .catch(err => console.log(err));
  };

  // to get user info with auth's 'currentUser' property
  const handleGetUserInfo = () => {
    // accessing auth property - currentUser
    let getUser = firebase.auth().currentUser;
    if (getUser) {
      // getUser is to get User object in firebase
      // https://firebase.google.com/docs/reference/js/firebase.User?authuser=0
      // User objects method
      getUser
        .getIdTokenResult() // token info
        .then(res => {
          console.log(res);
        });
    } else {
      console.log('No USER');
    }
  };

  // update user email
  const handleUpdateEmail = () => {
    let getUser = firebase.auth().currentUser;

    // if (getUser) {
    //   getUser.updateEmail('test@testing.com').then(res => console.log(res));
    // }

    // user re-authentication with Credential
    // auth property, not method
    // updating user credential with EmailAuthProvider in firebase.auth
    let credential = firebase.auth.EmailAuthProvider.credential(
      'hi@hello.com',
      'testing1234'
    );
    if (getUser) {
      //reauthenticateWithCredential in User object of firebase.auth
      getUser
        .reauthenticateWithCredential(credential)
        .then(res => getUser.updateEmail('rupaklama@hotmail.com'));
    }
    // NOTE - Display a pop up to update Email for user
  };

  // to update user profile additional two properties
  // firebase won't let add additional properties, just 'displayName' & 'photoURL'
  const handleUpdateProfile = () => {
    let getUser = firebase.auth().currentUser;
    getUser
      .updateProfile({
        displayName: 'Rupak',
        photoURL: 'https://whatever.com/photo.jpeg',
      })
      .then(() => {
        console.log(getUser);
      });
  };

  // register user in db-firestore since firebase don't have method for this
  const handleStoreRegisterUser = data => {
    // creating new user document with user id
    usersCollection
      .doc(data.user.uid)
      .set({
        userId: data.user.uid,
        name: data.user.displayName,
        email: data.user.email,
      })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  };

  // google sign in
  const handleGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        // store on firestore to save user in db-firestore
        handleStoreRegisterUser(user);
        console.log(user);
      })
      .catch(e => console.log(e));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          {register ? 'Register' : 'Login'}
        </button>
      </form>

      <hr />
      <button onClick={onLogout}>Logout</button>

      <hr />
      <button onClick={handleGetUserInfo}>Get user info</button>

      <hr />
      <button onClick={handleUpdateEmail}>Update user email</button>

      <hr />
      <button onClick={handleUpdateProfile}>Update user profile</button>

      <hr />
      <button onClick={handleGoogleSignin}>Google Sign in</button>
    </Fragment>
  );
};

export default Login;
