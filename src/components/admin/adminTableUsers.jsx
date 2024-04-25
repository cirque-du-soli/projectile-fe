import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminTableUsers({ props }) {

  ///////////////////////// BUTTON FUNCTIONS /////////////////////////////////////
  
  // TODO: SOLI: Fix this function
  function resetUserPassword(user) {
    console.log("Reset Password button clicked. id: " + user._id);
  }

  // TOGGLE DELETE
  async function toggleUserIsSoftDeleted(user) {

    console.log("Delete button clicked. id: " + user._id);

    try {

      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsSoftDeleted`, { user: user });
      
      if (response.status == 200) {
        props.newToastMessage("success", "User softDelete toggled. isSoftDeleted = " + response.data.message);
        updateUser(user._id, { isSoftDeleted: !user.isSoftDeleted });
      } else {
        props.newToastMessage("error", "failed to toggle isSoftDeleted : " + response.data);
      }

    } catch (error) {
      props.newToastMessage("error", "Error toggling user isSoftDeleted: " + error);
      console.error(error);
    }
  }


  // TOGGLE BAN
  async function toggleUserIsBanned(user) {
    console.log("Toggle ban button clicked. id: " + user._id);

    try {
      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsBanned`, { user: user });
      
      if (response.status == 200) {

        props.newToastMessage("success", "User ban toggled. isBanned = " + response.data.message);
        
        updateUser( user._id, { isBanned: !user.isBanned });

      } else {
        props.newToastMessage("error", "failed to toggle ban : " + response.data);
      }
    } catch (error) {
      props.newToastMessage("error", "Error toggling user ban: " + error);
      console.error(error);
    }
}

  // TOGGLE ADMIN
async function toggleUserIsAdmin(user) {
  console.log("Toggle Admin button clicked. id: " + user._id);
  
    try {
      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsAdmin`, { user: user });

      if (response.status == 200) {

        props.newToastMessage("success", "User isAdmin toggled. isAdmin = " + response.data.message);

        updateUser(user._id, { isAdmin: !user.isAdmin });

      } else {
        props.newToastMessage("error", "failed to toggle ban : " + response.data);
      }

    } catch (error) {
      props.newToastMessage("error", "Error toggling user ban: " + error);
      console.error(error);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  
  // Function to update user data
  const updateUser = (userId, newUserData) => {
    // Update state with the new user data
    setUsersList(usersList => usersList.map(user => {
      if (user._id === userId) {

        // Only update the user that matches the ID
        return { ...user, ...newUserData };
      }
      return user;
    }));
  };
  

  const [usersList, setUsersList] = useState([]);
  const [usersTimestamps, setUsersTimestamps] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${baseUrl}/admin/getAllUsers`);
      console.log(response.data.users);
      props.newToastMessage("success", "Users fetched!");
      setUsersList(response.data.users);
      setUsersTimestamps(response.data.userTimestamps);
      console.log(response.data.userTimestamps)
    } catch (error) {
      console.error(error);
      props.newToastMessage("error", "Error fetching users.");
    }
  };

  function formatTimestamp(isoString) {
    const date = new Date(isoString);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };

    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    return `${formattedTime} ${formattedDate}`;
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="table w-full table-pin-cols table-pin-rows">
        <thead>
          <tr>
            <th className='bg-cyan-950 text-white'>ID</th>
            <th className='bg-cyan-950 text-white'>Username</th>
            <th className='bg-cyan-950 text-white'>Email</th>
            <th className='bg-cyan-950 text-white'>Role</th>
            <th className='bg-cyan-950 text-white'>Status</th>
            <th className='bg-cyan-950 text-white'>Created</th>
            <th className='bg-cyan-950 text-white'>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {usersList.map((user, index) => {

            let formattedTimestamp = formatTimestamp(usersTimestamps[index]);
            
            return (
              <tr key={index} className={`bg-${index % 2 === 0 ? 'cyan-800' : 'cyan-900'}`}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td
                  className={
                    `${user.isBanned
                      ?
                      'bg-red-500'
                      :
                      (user.isSoftDeleted
                        ?
                      'bg-yellow-500'
                      :
                        ''
                      )
                    }`
                  }>
                  {
                    user.isSoftDeleted
                    &&
                    "Deleted"
                  }
                  {
                    user.isSoftDeleted &&
                    user.isBanned &&
                    <br />
                  }
                  {
                    user.isBanned
                    &&
                    "Banned"
                  }
                </td>
                <td>{formattedTimestamp}</td>
                <td>
                  {/* ACTION BUTTONS TODO: soli fix button colors */}
                  
                  <button
                    className="btn btn-secondary mx-1"
                    onClick={() => { resetUserPassword(user) }}>
                    Reset
                  </button>
                  
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => { toggleUserIsSoftDeleted(user) }}>
                    {user.isSoftDeleted ? "UnDelete" : "Delete"}
                  </button>
                  
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => { toggleUserIsBanned(user) }}>
                    {user.isBanned ? "UnBan" : "Ban"}
                  </button>

                  <button
                    className={`btn ml-2`}
                    onClick={() => { toggleUserIsAdmin(user) }}>
                    {user.isAdmin ? ` ->User ` : `-> Admin`}
                  </button>
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
  );
}

export default AdminTableUsers;
