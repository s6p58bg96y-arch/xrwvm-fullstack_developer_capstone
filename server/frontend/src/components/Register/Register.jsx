import React, { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, firstName, lastName, email }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  const box = { maxWidth: 400, margin: "50px auto", padding: 30, borderRadius: 12, boxShadow: "0 3px 10px #0003", fontFamily: "Arial" };
  const input = { width: "100%", padding: 10, margin: "8px 0 16px", borderRadius: 6, border: "1px solid #ccc" };

  return (
    <div style={box}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={register}>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" style={input} onChange={(e) => setUserName(e.target.value)} />
        <label>First Name</label>
        <input type="text" name="first_name" placeholder="First Name" style={input} onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" style={input} onChange={(e) => setLastName(e.target.value)} />
        <label>Email</label>
        <input type="email" name="email" placeholder="Email" style={input} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" name="psw" placeholder="Password" style={input} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Register" style={{ ...input, background: "#0d6efd", color: "#fff", border: "none", cursor: "pointer" }} />
      </form>
    </div>
  );
};

export default Register;
