import classes from "./CartItem.module.css"
import { useDispatch } from "react-redux"
import { sendListActions } from "../../store/sendList"

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { id, number, point, level } = props
  const { removeItemFromCart } = sendListActions

  return (
    <li className={classes.item}>
      <header>
        <h3>{number}</h3>
        <div className={classes.price}>{point}</div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          <span>{level}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(removeItemFromCart(id))}>
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
