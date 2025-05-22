import { uiActions } from "./ui"
import { sendListActions } from "./sendList"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const fetchSendListData = () => {
  return async (dispatch) => {
    try {
      const { data: sendListData, error } = await supabase
        .from("send_list")
        .select()
      dispatch(
        sendListActions.replaceList({
          items: sendListData || [],
          totalPoint: sendListData.reduce(
            (total, item) => total + item.point,
            0
          ),
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
