import React, { useState } from 'react';
import { login, logout } from '../store/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function LoginPage() {
  const [newUsername, setNewUsername] = useState('');
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);
  return (
    <>
      <h1>This is login Page</h1>
      <h4>User: {username}</h4>
      <TextField
        type='text'
        onChange={(e) => {
          setNewUsername(e.target.value);
        }}
      />
      <div>
        {username ? (
          <Button
            variant='contained'
            onClick={() => dispatch(logout({ username: newUsername }))}
            color='primary'
          >
            Logout
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            onClick={() => dispatch(login({ username: newUsername }))}
          >
            Login
          </Button>
        )}
      </div>
    </>
  );
}

export default LoginPage;
