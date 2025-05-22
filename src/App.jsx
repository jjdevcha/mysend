import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Routes from "./components/Shop/Routes"
import Notification from "./components/UI/Notification"
import { fetchSendListData } from "./store/list-action"

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    dispatch(fetchSendListData())
  }, [dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Routes />
      </Layout>
    </Fragment>
  )
}

export default App
