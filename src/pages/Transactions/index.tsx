import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Summary from "../../components/Summary"
import Searchform from "./components/SearchForm"
import { PriceHighLight, TransactionContainer, TransactionTable } from "./styles"

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome'; // Corrected typo here
  price: number;
  category: string;
  createdAt: string;
}

const Transactions = () => {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()
    
   setTransaction(data)
  }

  useEffect(() => {
    loadTransactions()
  },[])

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