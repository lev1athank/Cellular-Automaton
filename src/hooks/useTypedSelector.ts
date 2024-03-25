import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Store } from "../store/Store";

export const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof Store.getState>> = useSelector
