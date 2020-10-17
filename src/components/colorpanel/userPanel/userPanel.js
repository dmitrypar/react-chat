import React from "react";

const UserPanel = ({ hanleOnClickOut, displayName, photoURL }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img className="avatar" src={photoURL} alt="avatar" />
        {displayName}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div className="dropdown-item">Вошел как {displayName}</div>
        <div className="dropdown-item" onClick={hanleOnClickOut}>
          Выйти
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
