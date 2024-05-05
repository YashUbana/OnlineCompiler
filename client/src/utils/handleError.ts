import { toast } from "sonner";

export const handleError = (error: any) => {
  console.log(error.data.error);
  toast("Error: " + error.data.message);
};
