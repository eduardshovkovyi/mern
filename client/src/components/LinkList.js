import React from "react";
import { Link } from "react-router-dom";

export const LinkList = ({ links }) => {
  if (!links.length) {
    return <p className="center">Not found links</p>;
  }
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Original link</th>
          <th>Short link</th>
          <th>open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td
                style={{
                  maxWidth: "200px",
                  whiteSpace: "no-wrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {link.from}
              </td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
