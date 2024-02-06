import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useBudgets } from "../Context/BudgetContext";

function ExpenseCard() {
  const {
    showViewExpenseCard,
    setShowViewExpenseCard,
    expenses,
    setExpenses,
    currentBudget,
  } = useBudgets();

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };
  return (
    <>
      <Modal
        show={showViewExpenseCard}
        onHide={() => {
          setShowViewExpenseCard(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Expenses - {currentBudget.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expenses.map((expense) => {
            if (expense.budgetId === currentBudget.budgetId)
              return (
                <div
                  key={expense.id}
                  className="d-flex justify-content-between align-items-baseline fw-normal mb-3"
                >
                  <div>{expense.description}</div>
                  <div className="d-flex align-items-baseline fw-normal mb-3">
                    <div>{expense.amount}</div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteExpense(expense.id);
                      }}
                    >
                      X
                    </Button>
                  </div>
                </div>
              );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpenseCard;
