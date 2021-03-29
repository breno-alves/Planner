import React, { useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Api from '../../services/api';

import { Header, HeaderTitle, SignUpContainer, InputContainer, ButtonContainer } from './styles'

interface ISignUpFormProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const [signUpForm, setSignUpForm] = useState<ISignUpFormProps>({});
  const history = useHistory();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', signUpForm)
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }, [api, history, signUpForm]);


  return (
    <SignUpContainer>
      <form name="signup" onSubmit={handleSubmit}>
        <Header>
          <HeaderTitle>
            <h1>Criar Conta</h1>
          </HeaderTitle>
          <p>Já possui uma conta? <Link to='/'>Entre</Link></p>
        </Header>

        <InputContainer>
          <label>Nome</label>
          <input type="text" name="name" placeholder="Fulano Silva" onChange={e => setSignUpForm((rest) => ({ ...rest, name: e.target.value }))} />
          <label>Email</label>
          <input type="email" name="email" placeholder="fulano@exemplo.com" onChange={e => setSignUpForm((rest) => ({ ...rest, email: e.target.value }))} />
          <label>Senha</label>
          <input type="password" name="password" onChange={e => setSignUpForm((rest) => ({ ...rest, password: e.target.value }))} />
          <label>Confirmar Senha</label>
          <input type="password" name="confirmpassword" onChange={e => setSignUpForm((rest) => ({ ...rest, confirmPassword: e.target.value }))} />
        </InputContainer>''

      <ButtonContainer>
          <button type="submit">Salvar</button>
        </ButtonContainer>
      </form>
    </SignUpContainer >
  )
}

export default Signup
