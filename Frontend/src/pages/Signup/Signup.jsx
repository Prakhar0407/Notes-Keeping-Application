import React, { useState } from "react"
import PasswordInput from "../../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axios from "axios"
import { toast } from "react-toastify"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container_reg">
      <div className="form-container_reg">
        <form onSubmit={handleSignUp}>
          <h4 className="title_reg">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="input-box_reg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box_reg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box_reg"
          />

          {error && <p className="error-message_reg">{error}</p>}

          <button type="submit" className="btn-primary_reg">
            SIGN UP
          </button>

          <p className="link_reg">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="link-text_reg"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;