import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles"
import logoImg from '../../assets/logo.svg'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="logotipo dt-money" />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header