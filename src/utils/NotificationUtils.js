import { toast } from "react-toastify";
import types from "./types";


export function createNotification(type, message) {
    switch (type) {
        case types.INFO:
            return toast.info(message);
        case types.ERROR:
            return toast.error(message);
        case types.SUCCESS:
            return toast.success(message);
        case types.WARNING:
            return toast.warn(message);
        case types.NOT_AUTHORIZED:
            return toast.warn(message, {
                icon: "🚫",
            });
        default:
            return "";
    }
}
