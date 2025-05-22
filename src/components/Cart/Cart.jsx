import Card from "../UI/Card"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import { useSelector } from "react-redux"

const Cart = (props) => {
  const { items } = useSelector((state) => state.sendList)
  const sortedItems = [...items].sort((a, b) => a.number - b.number)
  return (
    <Card className={classes.cart}>
      <h2>Your Send List</h2>
      <ul>
        {sortedItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            number={item.number}
            point={item.point}
            level={item.level}
          />
        ))}
      </ul>
    </Card>
  )
}

export default Cart
