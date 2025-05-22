import classes from "./CartItem.module.css"
import { useDispatch } from "react-redux"
import { sendListActions } from "../../store/sendList"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
const CartItem = (props) => {
  const dispatch = useDispatch()
  const { id, number, point, level } = props
  const { removeItemFromCart } = sendListActions

  const handleRemoveItem = async () => {
    dispatch(removeItemFromCart(id))
    try {
      const { error } = await supabase.from("send_list").delete().eq("id", id)
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error removing item from send list:", error)
    }
  }

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
          <button onClick={handleRemoveItem}>Remove</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
