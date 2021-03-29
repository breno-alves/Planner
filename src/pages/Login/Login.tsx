import React from 'react'

import { Header, HeaderTitle, LoginContainer, InputContainer, ButtonContainer, InputRemember } from './styles'

const handleSubmit = () => {
  console.log('teste')
}

const Login = () => {
  return (
    <LoginContainer>
      <form name="login" onSubmit={handleSubmit}>
        <Header>
          <HeaderTitle>
            <h1>Entrar</h1>
          </HeaderTitle>
          <p>Novo usuário? <a href="#">Crie uma conta</a></p>
        </Header>

        <InputContainer>
          <label>Email</label>
          <input type="text" name="email" placeholder="fulano@exemplo.com" />
          <label>Senha</label>
          <input type="password" name="password" />
          <InputRemember>
            <input type="checkbox" name="remember" />
            <p>Lembre de mim</p>
          </InputRemember>
        </InputContainer>

        <ButtonContainer>
          <button>Entrar</button>
        </ButtonContainer>
      </form>
    </LoginContainer>
  )
}

export default Login
