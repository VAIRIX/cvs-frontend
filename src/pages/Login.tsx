import React, { useCallback } from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Button, TextInput, Form } from 'react-admin';
import { INVALID_USER } from '../constants/errorMessages';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const submit = useCallback(() => {
    login({ username, password }).catch(() => notify(INVALID_USER));
  }, [login, notify, username, password]);

  return (
    <>
      <Form onSubmit={submit}>
        <TextInput
          name="username"
          source="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextInput
          name="password"
          source="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </Form>
      <Button onClick={submit} label={'Login'} />
    </>
  );
};

export default LoginPage;
