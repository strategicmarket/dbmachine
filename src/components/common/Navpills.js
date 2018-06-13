import React from "react";

const Navpills = props =>
  <ul className="nav nav-pills mb-3">
    <li
      onClick={() => props.handlePageChange("Agents")}
      className={props.currentPage === "Agents" ? "active" : ""}
    >
      <a>Agents</a>
    </li>
    <li
      onClick={() => props.handlePageChange("Clients")}
      className={props.currentPage === "Clients" ? "active" : ""}
    >
      <a>Clients</a>
    </li>
    <li
      onClick={() => props.handlePageChange("Blog")}
      className={props.currentPage === "Blog" ? "active" : ""}
    >
      <a>Blog</a>
    </li>
    <li
      onClick={() => props.handlePageChange("Contact")}
      className={props.currentPage === "Contact" ? "active" : ""}
    >
      <a>Contact</a>
    </li>
  </ul>;

export default Navpills;
