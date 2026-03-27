import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from 'Utils/userSlice';
import { auth } from 'Utils/fireBase';

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
  onAuthStateChanged(auth, (user) => {
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
}, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-30 flex justify-between items-center">
      <img className="w-44 hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-lg"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-02-12/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
              src="https://preview.redd.it/sgfxdosc4qo81.png?width=338&format=png&auto=webp&s=68081fe5673ff6ac567a531ae01a786ca80695f6" 
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