import Header from "../../components/Header"
import Summary from "../../components/Summary"
import Searchform from "./components/SearchForm"
import { PriceHighLight, TransactionContainer, TransactionTable } from "./styles"

const Transactions = () => {
  return (
    <div>
      <Header />    
      <Summary />

      <TransactionContainer>
        <Searchform/>
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighLight variant='income'>
                  R$ 12.000,00
                </PriceHighLight>
              </td>
              <td>Venda</td>
              <td>14/04/2022</td>
            </tr>

            <tr>
              <td width="50%">Hamburger</td>
              <td>
                <PriceHighLight variant='outcome'>
                  - R$ 59,00
                </PriceHighLight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionContainer>

    </div>
  )
}

export default Transactions