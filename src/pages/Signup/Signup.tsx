import React from 'react'
import { Link } from 'react-router-dom';

import { Header, HeaderTitle, SignUpContainer, InputContainer, ButtonContainer } from './styles'

const Signup = () => {
  return (
    <SignUpContainer>
      <form name="signup">
        <Header>
          <HeaderTitle>
            <h1>Criar Conta</h1>
          </HeaderTitle>
          <p>Já possui uma conta? <Link to='/'>Entre</Link></p>
        </Header>

        <InputContainer>
          <label>Nome</label>
          <input type="text" name="name" placeholder="Fulano Silva" />
          <label>Email</label>
          <input type="email" name="email" placeholder="fulano@exemplo.com" />
          <label>Senha</label>
          <input type="password" name="password" />
          <label>Confirmar Senha</label>
          <input type="password" name="confirmpassword" />
        </InputContainer>''

        <ButtonContainer>
          <button>Salvar</button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  )
}

export default Signup
