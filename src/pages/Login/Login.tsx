import React, { useCallback, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Api from '../../services/api';
import { isAuthenticated } from "../../services/auth";

import { Header, HeaderTitle, LoginContainer, InputContainer, ButtonContainer, InputRemember } from './styles'

interface ILoginForm {
  email?: string;
  password?: string;
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({});
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/appointments');
    }
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post('/sessions', loginForm);
      const { data } = response;
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      history.push('/appointments');
    } catch (err) {
      console.log(err);
    }
  }, [loginForm, history]);

  return (
    <LoginContainer>
      <form name="login" onSubmit={handleSubmit}>
        <Header>
          <HeaderTitle>
            <h1>Entrar</h1>
          </HeaderTitle>
          <p>Novo usuário? <Link to='/signup'>Crie uma conta</Link></p>
        </Header>

        <InputContainer>
          <label>Email</label>
          <input type="text" name="email" placeholder="fulano@exemplo.com" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
          <label>Senha</label>
          <input type="password" name="password" onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
          <InputRemember>
            <input type="checkbox" name="remember" />
            <p>Lembre de mim</p>
          </InputRemember>
        </InputContainer>

        <ButtonContainer>
          <button type="submit">Entrar</button>
        </ButtonContainer>
      </form>
    </LoginContainer>
  )
}

export default Login
