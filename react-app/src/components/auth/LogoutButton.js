import React from "react";
import { logout } from "../../services/auth";
import { removeUser } from '../../store/actions/users';
import { useDispatch } from 'react-redux';

const LogoutButton = ({setAuthenticated}) => {

  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(removeUser())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
