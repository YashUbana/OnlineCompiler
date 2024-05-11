import { Code, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { codeType } from "@/vite-env";
import { handleError } from "@/utils/handleError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDeleteCodeMutation } from "@/redux/slices/api";

export default function CodeItem({ data }: { data: codeType }) {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();
  const handleDelete = async () => {
    const reponse = await deleteCode(data._id!).unwrap();
    console.log(reponse);

    try {
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className=" p-3 rounded cursor-pointer bg-slate-700 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-start items-start gap-3 w-full">
        <Code />
        <p className="font-mono font-bold text-lg">{data.title}</p>
      </div>
      <Separator />
      <div className="__btn_container flex gap-2">
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="outline">Open Code</Button>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              // onClick={handleSaveCode}
              variant="destructive"
              disabled={false}
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 justify-center items-center">
                <Trash2 /> Confire? You want to DELETE.
              </DialogTitle>

              <div className="__url flex gap-1 justify-center items-center">
                <Button
                  loading={isLoading}
                  variant="destructive"
                  className="h-full"
                  onClick={handleDelete}
                  color="blue"
                >
                  YES DELETE
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
