import { useState, useEffect } from "react"
import ProductItem from "./ProductItem"
import classes from "./Routes.module.css"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Routes = (props) => {
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data, error } = await supabase.from("comp_set").select()
        if (error) {
          throw new Error(error.message)
        }
        if (data) {
          setRoutes(data)
        }
      } catch (error) {
        console.error("Error fetching routes:", error)
      }
    }
    fetchRoutes()
  }, [])
  const { items } = useSelector((state) => state.sendList)
  const itemIds = items.map((item) => item.id)

  const sortedRoutes = routes.filter((route) => !itemIds.includes(route.id))
  const [searchValue, setSearchValue] = useState(undefined)
  const searchRoutes = sortedRoutes.filter(
    (route) => route.number === Number(searchValue)
  )

  return (
    <section className={classes.products}>
      <h2>In Beta we trust</h2>
      <Autocomplete
        onChange={(event, newValue) => {
          if (newValue) {
            setSearchValue(newValue.number)
          }
          if (!newValue) {
            setSearchValue(undefined)
          }
        }}
        options={sortedRoutes}
        getOptionLabel={(option) => String(option.number)}
        sx={{ width: 300, margin: "0 auto" }}
        renderInput={(params) => (
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "8px" }}
            {...params}
            label="Number of the route"
          />
        )}
      />
      <ul>
        {searchValue
          ? searchRoutes.map((route) => (
              <ProductItem
                key={route.id}
                id={route.id}
                number={route.number}
                point={route.point}
                level={route.level}
              />
            ))
          : sortedRoutes.map((route) => (
              <ProductItem
                key={route.id}
                id={route.id}
                number={route.number}
                point={route.point}
                level={route.level}
              />
            ))}
      </ul>
    </section>
  )
}

export default Routes
