import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";

const formStyles = {
  width: "50%",
  margin: "5rem auto",
};

const Register = () => {
  const authContext = useContext(AuthContext);

  const { createUser } = authContext;

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    chkPassword: "",
  });

  const [error, setError] = useState({
    isActive: false,
    message: "",
  });

  const { name, lastName, chkPassword, email, password } = user;

  let navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return;
    }

    if (chkPassword !== password) {
      setError({
        isActive: true,
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    setError({
      isActive: false,
      message: "",
    });
    delete user.chkPassword;

    await createUser(user);

    navigate("/");
  };

  return (
      <form
        className="shadow-lg p-5 mb-5 bg-body rounded"
        style={formStyles}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Create User</h1>

        <div className="form-group my-4">
          <label htmlFor="name" className="fw-bold">
            Name{" "}
          </label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="lastName" className="fw-bold">
            Last Name{" "}
          </label>
          <input
            value={lastName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="form-group my-4">
          <label htmlFor="email" className="fw-bold">
            Email address
          </label>
          <input
            value={email}
            onChange={handleChange}
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="fw-bold">
            Password
          </label>
          <input
            value={password}
            onChange={handleChange}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="chkPassword" className="fw-bold">
            Check Password
          </label>
          <input
            value={chkPassword}
            onChange={handleChange}
            type="password"
            className="form-control"
            name="chkPassword"
            placeholder="Check your Password"
            required
          />
        </div>

        {error.isActive && (
          <div className="alert alert-danger text-center" role="alert">
            {error.message}
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="mt-4 btn btn-lg btn-primary">
            Register Account
          </button>
        </div>
      </form>
  );
};

export default Register;
