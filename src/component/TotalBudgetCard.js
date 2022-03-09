
import BudgetCard from './BudgetCard'
import { useBudgets } from '../context/budgetContext';

export default function TotalBudgetCard() {
    const {expenses, budgets}= useBudgets()
    const amount = expenses.reduce(
        (total, expenses) => total + expenses.amount, 0)
    const max= budgets.reduce((total,budgets)=>total+budgets.max,0)
    if (amount === 0) return null
    return (
        <BudgetCard amount={amount} name="total" gray max={max} hideButtons/>
  )
}

