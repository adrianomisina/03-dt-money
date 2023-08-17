import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome'; // Corrected typo here
  price: number;
  category: string;
  createdAt: string;
}
interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })
    
    setTransaction(response.data);
  };

  const createTransaction = async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data; //destruturing
    const response = await api.post('transactions', {
      description,
      price,
      category, 
      type,
      createdAt: new Date(),
    })

    setTransaction(state => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
};