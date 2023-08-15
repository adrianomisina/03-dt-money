import { MagnifyingGlass } from "phosphor-react"
import { SearchFormContainer } from "./styles"
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from './../../../../contexts/TransactionContext';
import { useContext } from 'react';

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>


const Searchform = () => {
  const {fetchTransactions} = useContext(TransactionsContext)



  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  
  } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
  })

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export default Searchform