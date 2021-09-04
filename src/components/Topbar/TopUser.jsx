import React from "react";

export function TopUser() {
  return (
    <li className="nav-item dropdown no-arrow">
      <a
        className="nav-link dropdown-toggle"
        href="index.html"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          className="img-profile rounded-circle"
          src="https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"
          style={{ maxWidth: "60px" }}
          alt="t"
        ></img>
        <span className="ml-2 d-none d-lg-inline text-white small">Maman Ketoprak</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
        <a className="dropdown-item" href="index.html">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profile
        </a>
        <a className="dropdown-item" href="index.html">
          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
          Settings
        </a>
        <a className="dropdown-item" href="index.html">
          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
          Activity Log
        </a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="index.html" data-toggle="modal" data-target="#logoutModal">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
}
