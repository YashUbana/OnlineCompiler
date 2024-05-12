import CodeItem from "@/components/CodeItem";
import { useGetAllCodesQuery } from "@/redux/slices/api";

export default function AllCodes() {
  const { data: allCodes } = useGetAllCodesQuery();

  return allCodes?.length !== 0 ? (
    <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {allCodes?.map((codeItem) => {
        return (
          <CodeItem deleteBtn={false} key={codeItem._id} data={codeItem} />
        );
      })}
    </div>
  ) : (
    <p className=" text-center font-mono text-slate-600 p-3 text-2xl">
      You don't have any saved CODE. 🤷‍♂️
    </p>
  );
}
