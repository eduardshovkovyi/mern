import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const history = useNavigate();
  const [link, setLink] = useState("");

  const { request } = useHttp();

  const auth = useContext(AuthContext);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log("data", data);
        history(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            id="email"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  );
};
