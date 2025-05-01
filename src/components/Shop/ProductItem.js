import Card from "../UI/Card"
import classes from "./ProductItem.module.css"
import { useDispatch } from "react-redux"
import { sendListActions } from "../../store/sendList"

const ProductItem = (props) => {
  const { id, number, point, level } = props
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(sendListActions.addItems({ id, number, point, level }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{number}</h3>
          <div className={classes.price}>{point}</div>
        </header>
        <p>{level}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Send List</button>
        </div>
      </Card>
    </li>
  )
}

export default ProductItem
