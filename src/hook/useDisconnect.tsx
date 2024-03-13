import { setClear } from "@/redux/auth/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function useDisconnect() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  function disconnect() {
    const okxwallet = (window as any).okxwallet;
    if (okxwallet) {
      okxwallet.disconnect();
    }
    localStorage.removeItem("address");
    localStorage.removeItem("isEmty");
    //router.reload();
    dispatch(setClear());
    if (pathname !== "/") {
      router.push("/");
    }
  }
  return { disconnect };
}
