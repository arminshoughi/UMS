import React from "react";
// import Error from "../components/Error";
// import Loading from "../components/Error";
import { useCollageTable } from "../hook/collage";
import { useGetCourseTable } from "../hook/getCource";
function Product() {
  const { data } = useGetCourseTable();

  const sumUnit = data
    .map((i) => i.course)
    .map((i) => i.unit)
    .map(function (elt) {
      return /^\d+$/.test(elt) ? parseInt(elt) : 0;
    })
    .reduce(function (a, b) {
      return a + b;
    });
  return (
    <>
      <table className="ml-[30%] mt-10 !w-[45%] ">
        <thead>
          <tr>
            <td className="border-2" colspan="2">
              درس{" "}
            </td>
            <td className="border-2"> نیمسال </td>
            <td className="border-2"> واحد </td>
            <td className="border-2"> نمره </td>
          </tr>
        </thead>
        <tbody>
          {data
            .map((i) => i.course)
            .map((i) => (
              <>
                <tr>
                  <td className="border-2" colspan="2">
                    {i.name}{" "}
                  </td>
                  <td className="border-2">{i.semester.name}</td>
                  <td className="border-2">{i.unit}</td>
                  <td className="border-2"> 12.0 </td>
                </tr>
              </>
            ))}
        </tbody>
        <tr>
          <td colspan="3">جمع واحد ها و نمرات اخذ شده</td>
          <td>{sumUnit}</td>
          <td>55.95 </td>
        </tr>
        <tr>
          <td colspan="4">معدل نیمسال</td>
          <td colspan="3">3.73 </td>
        </tr>
      </table>
    </>
  );
}
export default Product;
