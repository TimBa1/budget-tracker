
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/budgetContext';

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses}= useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expenses) => total + expenses.amount, 0)
    if (amount === 0) return null
    return (
        <BudgetCard amount={amount} name="uncategorized" gray {...props} />
  )
}
