import Header from "../../components/Header";
import Summary from "../../components/Summary";
import Searchform from "./components/SearchForm";
import { PriceHighLight, TransactionContainer, TransactionTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { priceFormatter, dateFormatter } from "../../utils/formatter";
import {useContextSelector} from 'use-context-selector'

const Transactions = () => {
  const transactions  = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <Searchform />
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighLight>
                </td>

                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
};

export default Transactions;
