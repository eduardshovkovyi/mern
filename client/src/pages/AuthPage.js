import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten links</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="input-text"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Input email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input-text"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Input password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
