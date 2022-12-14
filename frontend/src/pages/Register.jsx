import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { register, reset, logGuest } from '../features/auth/authSlice';
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth);

  useEffect(() => {
    if (isError){
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  };
  const onGuestLogin = (e) => {
    e.preventDefault();
    dispatch(logGuest())
  }

  if(isLoading){return <Spinner />}

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          {/* todo: form validation of matching passwords */}
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
        <div className="form-group">
            <button className="btn btn-block btn-reverse" onClick={onGuestLogin}>You can also log in as a Guest</button>
          </div>
      </section>
    </>
  );
};

export default Register;
