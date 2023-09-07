import { Button } from "react-bootstrap";

const RemoveCartItemComp = ({ productId, orderCreated, quantity, price, removeCartItemHandler = false }) => {
  return (
    <Button
      disabled={orderCreated}
      type="button"
      variant="secondary"
      onClick={removeCartItemHandler ? () => removeCartItemHandler(productId, quantity, price) : undefined}
    >
      <i className="bi bi-trash"></i>

    </Button>
  )
}

export default RemoveCartItemComp;