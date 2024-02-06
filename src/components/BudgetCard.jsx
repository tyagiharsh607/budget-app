import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { useBudgets } from "../Context/BudgetContext";
function BudgetCard({ name, amount, max, gray, budgetId }) {
  const { setShowViewExpenseCard, setShowAddExpenseModal, setCurrentBudget } =
    useBudgets();
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  };
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            Rs{amount} /<span className="text-muted fs-6 ms-1">Rs{max}</span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={() => {
              setShowAddExpenseModal(true);
              setCurrentBudget({ name, max, budgetId });
            }}
          >
            Add Expense
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowViewExpenseCard(true);
              setCurrentBudget({ name, max, budgetId });
            }}
          >
            View Expense
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default BudgetCard;
