import { useContext} from "react"
import Header from "../../components/Header"
import Summary from "../../components/Summary"
import Searchform from "./components/SearchForm"
import { PriceHighLight, TransactionContainer, TransactionTable } from "./styles"
import { TransactionsContext } from "../../contexts/TransactionContext"

const Transactions = () => {
  const { transactions} = useContext(TransactionsContext)
  
  return (
    <div>
      <Header />    
      <Summary />

      <TransactionContainer>
        <Searchform/>
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
      </TransactionContainer>

    </div>
  )
}

export default Transactions