import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/container";
import AddBudgetMode from "./component/AddBudgetMode";
import BudgetCard from "./component/BudgetCard";
import {useState} from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/budgetContext";
import AddExpensesMode from "./component/AddExpensesMode";
import UncategorizedBudgetCard from "./component/UncategorizedBudgetCard";
import TotalBudgetCard from "./component/TotalBudgetCard";
import ViewExpensesMode from './component/viewAddExpensesMode';







function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
}
  return (
    <>
    <Container className="my-4 ">
      <Stack direction="horizontal" gap="2" className="mb-4">
        
        <h1 className="me-auto">TimBa Budget App</h1>
        <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)} >Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expenses</Button>
        </Stack>
        

      <div className="tp"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
          gap: "2rem",
          alignItems: "flex=start",
        }}
        >
          {budgets.map(budget => {
           const amount= getBudgetExpenses(budget.id).reduce((total, expenses)=> total + expenses.amount, 0)
            
            return (
            <BudgetCard
            name={budget.name}
            key={budget.id}
            amount={amount}
            max = {budget.max}
            onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
            onViewExpenseClick={()=>setViewExpenseModalBudgetId(budget.id)}
              />)
            })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard/>
      </div>
    </Container>
      <AddBudgetMode
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpensesMode
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesMode
        budgetId={viewExpenseModalBudgetId}
        handleClose={()=>setViewExpenseModalBudgetId()}
      />
    </>
  );
}

export default App;
