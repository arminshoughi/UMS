import React from "react";
// import Error from "../components/Error";
// import Loading from "../components/Error";
import { useCollageTable } from "../hook/collage";
import { useGetCourseTable } from "../hook/getCource";
function Product() {
  const { data } = useGetCourseTable();
  console.log(
    data
      .map((i) => i.course)
      .map((i) => i.unit)
      .map(function (elt) {
        return /^\d+$/.test(elt) ? parseInt(elt) : 0;
      })
      .reduce(function (a, b) {
        return a + b;
      }),
    "asdsad"
  );
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
      <table className="ml-[30%] mt-10  ">
        <thead>
          <tr>
            <td colspan="2">درس </td>
            <td> نیمسال </td>
            <td> واحد </td>
            <td> نمره </td>
          </tr>
        </thead>
        <tbody>
          {data
            .map((i) => i.course)
            .map((i) => (
              <>
                <tr>
                  <td colspan="2">{i.name} </td>
                  <td>{i.semester.name}</td>
                  <td>{i.unit}</td>
                  <td> 12.0 </td>
                </tr>
              </>
            ))}
        </tbody>
        <tr>
          <td colspan="4" class="footer">
            جمع واحد ها و نمرات اخذ شده
          </td>
          <td>{sumUnit}</td>
          <td colspan="2">55.95 </td>
        </tr>
        <tr>
          <td colspan="4" class="footer">
            معدل نیمسال
          </td>
          <td colspan="3"> </td>
        </tr>
      </table>
    </>
  );
}
export default Product;
