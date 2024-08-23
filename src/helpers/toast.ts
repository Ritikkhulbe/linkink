import toast from "react-hot-toast";

export const notify = (success: boolean, message: string ) => {
    if(success){
        toast.success(message);
    } else {
        toast.error(message);
    }
}