import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>

      <input
        className="form-control mb-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-success" onClick={register}>
        Register
      </button>

      <p className="mt-3">
        <Link to="/">Back To Login</Link>
      </p>
    </div>
  );
}

export default Signup;