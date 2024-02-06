import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCard from "./components/ExpenseCard";
import { useBudgets } from "./Context/BudgetContext";

function App() {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    showAddExpenseModal,
    budgets,
    expenses,
  } = useBudgets();

  function calculateAmount(budgetId) {
    let sum = 0;
    expenses.forEach((expense) => {
      if (expense.budgetId === budgetId) sum += expense.amount;
    });
    return sum;
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            return (
              <BudgetCard
                key={budget.id}
                budgetId={budget.id}
                name={budget.name}
                amount={calculateAmount(budget.id)}
                max={budget.max}
              />
            );
          })}
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} />
      <AddExpenseModal show={showAddExpenseModal} />
      <ExpenseCard />
    </>
  );
}

export default App;
