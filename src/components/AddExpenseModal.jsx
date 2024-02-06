import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../Context/BudgetContext";

export default function AddExpenseModal({ show, handleClose }) {
  const {
    addExpense,
    showAddExpenseModal,
    setShowAddExpenseModal,
    currentBudget,
  } = useBudgets();
  const amountRef = useRef();
  const descRef = useRef();
  const budgetRef = useRef();

  function handleClose(e) {
    setShowAddExpenseModal(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: currentBudget.budgetId,
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.1}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              ref={budgetRef}
              type="text"
              required
              value={currentBudget.name}
              disabled
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
