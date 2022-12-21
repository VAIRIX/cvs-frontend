import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Button, TextInput, Form } from 'react-admin';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const submit = (e: any) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify('Invalid username or password'),
    );
  };

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
