import * as Dialog from '@radix-ui/react-dialog';
import { Content, Overlay,  CloseButton, TransactionType, TransactionTypeButton} from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useContext } from 'react';
import { TransactionsContext } from './../../contexts/TransactionContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

const NewTransactionModal = () => {
  const {createTransaction} = useContext(TransactionsContext)


  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    } = useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        type: 'income'
      }
    })
  
  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data; //destruturing

    await createTransaction({
      description,
      price,
      category,
      type
    })

    reset();
  }

  return (
    <Dialog.Portal>
        <Overlay />
          
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
        
        <CloseButton>
          <X size={24} />
        </CloseButton>
          <form  onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" placeholder="Descrição" required {...register('description')} />
          <input type="number" placeholder="Preço" required  {...register('price',{valueAsNumber: true})}/>
          <input type="text" placeholder="Categoria" required  {...register('category')} />
          
          <Controller
            control={control}
            name='type'
            render={({field}) => {
              
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant='icome' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                <TransactionTypeButton variant='outcome;' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>

              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
          </form>

        </Content>
    </Dialog.Portal>
  )
}

export default NewTransactionModal