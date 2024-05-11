import {
  ClipboardCopy,
  Code,
  HardDriveDownload,
  PencilLine,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/redux/slices/api";
import { Input } from "./ui/input";

export default function HelperHeader() {
  const isOwner = useSelector(
    (state: RootState) => state.compilerSlice.isOwner
  );
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("");
  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast("NO CODE FOUND TO BE DOWNLOADED 🤷‍♂️");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("CODE DOWNLOADED IN YOUR SYSTEM 👌 ");
    }
  };

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);
  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };
    const response = await saveCode(body).unwrap();
    try {
      console.log(response);
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditCode = async () => {
    try {
    } catch (error) {
      handleError(error);
    }
  };
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center ">
      <div className="__btn_container flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              // onClick={handleSaveCode}
              variant="success"
              // className="flex justify-center items-center gap-1"
              disabled={isLoading}
              size="icon"
            >
              <Save size="20" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 justify-center items-center">
                <Code /> Save Your Code
              </DialogTitle>

              <div className="__url flex gap-1">
                <Input
                  className="bg-slate-700 focus-visible:ring-0"
                  placeholder="Type your Post Title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="h-full"
                  onClick={handleSaveCode}
                  color="blue"
                >
                  Save
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant="blue" onClick={handleDownloadCode} size="icon">
          <HardDriveDownload size="20" />
        </Button>
        {isOwner && (
          <Button size="icon" onClick={handleEditCode} variant="default">
            <PencilLine size="16" />
          </Button>
        )}

        {shareBtn && (
          <Dialog>
            <DialogTrigger className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[90px] bg-gray-800 outline-none focus:ring-0">
              <>
                <Share2 size="16px" />
                Share
              </>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code /> Share Your Code{" "}
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded-xl bg-stone-800 text-slate-400"
                      value={window.location.href}
                    />
                    <Button
                      variant={"ghost"}
                      className="gap-1"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your Clipboard!!");
                      }}
                    >
                      <ClipboardCopy />
                      Copy URL
                    </Button>
                  </div>
                  <p className="text-center">
                    Share this URL to collaborate with your FRIEND!
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>Current Language:</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[150px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue placeholder="HTML" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
