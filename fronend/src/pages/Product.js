import React from "react";
import { useGetCourse } from "../hook/getCource";

function Product() {
  const { data } = useGetCourse();

  const sumUnit = data
    .map((i) => i.course)
    .map((i) => i.unit)
    .map(function (elt) {
      return /^\d+$/.test(elt) ? parseInt(elt) : 0;
    })
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const access = localStorage.getItem("flag");

  return access === "true" ? (
    <>
      <table className="ml-[30%] mt-10 !w-[45%] ">
        <thead>
          <tr>
            <td className="border-2 bg-gray-800" colspan="2">
              درس
            </td>
            <td className="border-2 bg-gray-800"> نیمسال </td>
            <td className="border-2 bg-gray-800"> واحد </td>
            <td className="border-2 bg-gray-800"> نمره </td>
          </tr>
        </thead>
        <tbody>
          {data
            .map((i) => i.course)
            .map((i) => (
              <>
                <tr>
                  <td className="border-2 bg-gray-300 text-right" colspan="2">
                    {i.name}{" "}
                  </td>
                  <td className="border-2 bg-gray-300 text-right">
                    {i.semester.name}
                  </td>
                  <td className="border-2 bg-gray-300 text-right">{i.unit}</td>
                  <td className="border-2 bg-gray-300 text-right"> 12.0 </td>
                </tr>
              </>
            ))}
        </tbody>
        <tr>
          <td colspan="3" className="border-2 bg-slate-300 text-right">
            جمع واحد ها و نمرات اخذ شده
          </td>
          <td className="border-2 bg-slate-300 text-right">{sumUnit}</td>
          <td className=" border-2 bg-slate-300 text-right">55.95 </td>
        </tr>

        <tr>
          <td colspan="4" className="border-2 bg-slate-300 text-center">
            معدل نیمسال
          </td>
          <td colspan="3" className=" border-2 bg-slate-300 text-right">
            3.73{" "}
          </td>
        </tr>
      </table>
    </>
  ) : (
    <div>لطفا لاگ ین کنید اول</div>
  );
}
export default Product;
