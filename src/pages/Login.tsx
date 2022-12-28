import React, { useCallback } from 'react';
import { useState } from 'react';
import { useLogin, Button, TextInput, Form, Login } from 'react-admin';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const submit = useCallback(() => {
    login({ username, password });
  }, [login, username, password]);

  return (
    <Login>
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
    </Login>
  );
};

export default LoginPage;
