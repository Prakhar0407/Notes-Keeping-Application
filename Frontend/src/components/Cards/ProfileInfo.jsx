import React from "react";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="profileInfo">
      <span className="profileInfoName">
        {userInfo ? userInfo.name : "Guest"}
      </span>
      <button className="logoutButton" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;