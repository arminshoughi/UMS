import React from "react";
// import Error from "../components/Error";
// import Loading from "../components/Error";
import { useCollageTable } from "../hook/collage";
function Product() {
  const { data, columns } = useCollageTable();
  console.log(
    data?.map((i) => i.name),
    "data"
  );
  return (
    <>
      <table className="ml-[30%] mt-10  ">
        <thead>
          <tr>
            <td colspan="3">درس </td>
            <td rowspan="2"> نیمسال </td>
            <td rowspan="2"> واحد </td>
            <td colspan="2"> نمره </td>
          </tr>
          <tr>
            <td>کد </td>
            <td colspan="2"> نام </td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CS 225 </td>
            <td colspan="2">Data Structures </td>
            <td> Fall 2015</td>
            <td> 3.0 </td>
            <td> 12.0 </td>
          </tr>
          <tr>
            <td>PHIL 105 </td>
            <td colspan="2">Ethics </td>
            <td> Fall 2015</td>
            <td> 3.0 </td>
            <td> 10.98 </td>
          </tr>
          <tr>
            <td>ECE 310 </td>
            <td colspan="2">Digital Signal Processing </td>
            <td> Fall 2015</td>
            <td> 3.0 </td>
            <td> 12 </td>
          </tr>
          <tr>
            <td>CS 373 </td>
            <td colspan="2">Combinatorial Algorithms </td>
            <td> Fall 2015</td>
            <td> 3.0 </td>
            <td> 9.99</td>
          </tr>
          <tr>
            <td>MATH 225 </td>
            <td colspan="2">Multi-Variable Calculus </td>
            <td> Fall 2015</td>
            <td> 3.0 </td>
            <td> 10.98 </td>
          </tr>
        </tbody>
        <tr>
          <td colspan="4" class="footer">
            جمع واحد ها و نمرات اخذ شده
          </td>
          <td> 15.0 </td>
          <td colspan="2">55.95 </td>
        </tr>
        <tr>
          <td colspan="4" class="footer">
            معدل نیمسال
          </td>
          <td colspan="3">3.73 / 4.0 </td>
        </tr>
      </table>
    </>
  );
}
export default Product;
