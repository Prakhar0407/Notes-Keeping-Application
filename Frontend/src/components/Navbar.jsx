import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";
import { MdMargin } from "react-icons/md";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      if (!res.data.success) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <div style={styles.navbar}>
      <Link to={"/"}>
        <h2 style={styles.brand}>
          <span style={styles.brandTextLight}>Noteset</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
  
};

const styles = {
  navbar: {
    backgroundColor: "brown",
    display: "flex",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    boxShadow: "0 4px 2px -2px gray",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "700",
    padding: "0.5rem 0",
    color: "aqua",
    textDecoration: "none",
  },
  brandTextLight: {
    color: "#4fd1c5",
  },
  brandTextDark: {
    color: "aqua",
  },
};


export default Navbar;
