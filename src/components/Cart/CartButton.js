import classes from "./CartButton.module.css"
import { useSelector, useDispatch } from "react-redux"
import { uiActions } from "../../store/ui"

const CartButton = () => {
  const dispatch = useDispatch()
  const totalPoint = useSelector((state) => state.sendList.totalPoint)
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={() => toggleCartHandler()}>
      <span>Send List</span>
      <span className={classes.badge}>{totalPoint}</span>
    </button>
  )
}

export default CartButton
