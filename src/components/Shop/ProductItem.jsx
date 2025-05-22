import Card from "../UI/Card"
import classes from "./ProductItem.module.css"
import { useDispatch } from "react-redux"
import { sendListActions } from "../../store/sendList"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const ProductItem = (props) => {
  const { id, number, point, level } = props
  const dispatch = useDispatch()
  const handleAddToCart = async () => {
    dispatch(sendListActions.addItems({ id, number, point, level }))
    try {
      const { error } = await supabase.from("send_list").insert({
        id,
        number,
        point,
        level,
      })
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error("Error adding item to send list:", error)
    }
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
