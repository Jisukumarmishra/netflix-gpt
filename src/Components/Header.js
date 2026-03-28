import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from 'Utils/userSlice';
import { auth } from 'Utils/fireBase';
import { netLOGO, USER_AVTAR } from 'Utils/constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  };

  // this useEffect helps to naviagate on every where in poage we not need to right in seperate component
  useEffect(()=>{ 
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid, email, displayName} = user;
      dispatch(
      addUser({   
      uid:uid, 
      email:email, 
      displayName:displayName
      })
    ); 
      navigate("/browse");
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/");
    }
  });

  // unsubscribe when component
  return () => unsubscribe(); // we will unsubscribe it when my header component is unload
}, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-30 flex justify-between items-center">
      <img className="w-44 hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-lg"
        src={netLOGO}
        alt="logo"
      />
      {user && (
        <div className="relative">
          <div 
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleDropdown}
          >
            <img 
              className="w-10 h-10 rounded-md shadow-md border border-gray-700" 
              alt="userIcon" 
              src={USER_AVTAR}
            />
            <span className="text-white hidden md:inline">▼</span>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 border border-gray-700 rounded-sm shadow-xl flex flex-col py-2 text-sm">
              <button className="px-4 py-2 text-white text-left hover:underline">Manage Profiles</button>
              <button className="px-4 py-2 text-white text-left hover:underline">Account</button>
              <button className="px-4 py-2 text-white text-left hover:underline border-b border-gray-700 pb-3">Help Centre</button>
              <button 
                onClick={handleSignOut} 
                className="px-4 py-2 mt-1 text-white text-left font-bold hover:underline"
              >
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header

// const Body = () => {
  
//   const appRouter = createBrowseRouter([
//     {
//      path:"/",
//      element:<Login/>
//     },
    
//     {
//      path:"/browse",
//      element:<Browse/>
//     }

//     // {
//     //  path:"/",
//     //  element:<Body/>
//     // },

//     //     {
//     //  path:"/",
//     //  element:<Body/>
//     // }
    
//   ])

//   return (
//     <div><routerprovider router = {appRouter} /></div>
//   )
// }