import { uiActions } from "./ui"
import { sendListActions } from "./sendList"

export const fetchSendListData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://redux-practice-a811e-default-rtdb.asia-southeast1.firebasedatabase.app/sendList.json`
      )
      if (!response.ok) {
        throw new Error("Could not fetch list data!")
      }
      const data = await response.json()
      return data
    }

    try {
      const sendListData = await fetchData()
      dispatch(
        sendListActions.replaceList({
          items: sendListData.items || [],
          totalPoint: sendListData.totalPoint,
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching send list data failed!",
        })
      )
    }
  }
}

export const sendListData = (sendList) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending list data!",
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        `https://redux-practice-a811e-default-rtdb.asia-southeast1.firebasedatabase.app/sendList.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: sendList.items,
            totalPoint: sendList.totalPoint,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Sending list data failed.")
      }
    }
    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent list data successfully!",
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending list data failed!",
        })
      )
    }
  }
}
