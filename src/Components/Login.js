import React, { useState ,  useRef } from 'react'
import Header from './Header'
import {checkValidData} from "../Utils/validate";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from "../Utils/fireBase"; 
import { useDispatch } from 'react-redux';
import { addUser } from 'Utils/userSlice';


const Login = () => {

  
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the data
    // checkValidData(Email, Password) 

    const message = checkValidData(
      isSignInForm ? null : name.current.value,
      email.current.value, 
      password.current.value
    );
    // console.log(message);
    seterrorMessage(message);
    // console.log(email.current.value);
    // console.log(password.current.value);

    if (message) return;

    // sign in sign up logic
    
    if(!isSignInForm) {
      // signup logic
      createUserWithEmailAndPassword(auth,
      email.current.value,
      password.current.value,
    )
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {

           const {uid, email, displayName} = auth.currentUser; //  i am tring to fetch the uid,email, dispalyName from the updaed value of the url
              dispatch(
                addUser({uid:uid, email:email, displayName:displayName})
              );
        }).catch((error) => {
          // An error occurred
          // ...
        });
        // console.log(user);
        // navigate("/browse");
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      seterrorMessage(errorCode + " " + errorMessage);
      // ..
    });
    } else {
    // sign in logic

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const {uid, email, displayName} = auth.currentUser;
      dispatch(addUser({uid, email, displayName}));
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode +"-"+ errorMessage);

  });

    }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className='relative min-h-screen'><Header showUserActions={false}/>

    <div className='absolute inset-0 -z-10'>
      <img  src = "https://assets.nflxext.com/ffe/siteui/vlv3/eb110559-67e9-40ec-8f1c-4a45b9f9c9bb/web/IN-en-20260309-TRIFECTA-perspective_6796824d-3538-42c9-95e0-baabc0fdbadf_large.jpg"
      alt = "text"
      className='h-full w-full object-cover'/>
    </div>

    {/* <div>
      <form className='align-middle'>
        <input type ="text" placeholder='First Name' className = 'p-2 m-2'></input>
        <input type ="text" placeholder='Last Name'  className = 'p-2 m-2'></input>
        <input type ="password" placeholder='Password' className='p-2 m-2'></input>
        <input type ="email" placeholder='Emial' className='p-2 m-2'></input>
        <button type ="" className=''>SignIn</button>
      </form>
    </div> */}

    <div>
        <form onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">

        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input ref = {name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input ref = {email} // email is refrencing to this input box
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input ref = {password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className='text-red-500'>{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>

    </div>
  )
}

export default Login;