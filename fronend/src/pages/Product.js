import React from "react";
import { toFarsiNumber } from "../constants/unit";
import { useGetCourse } from "../hook/getCource";
import { useMasterGrade } from "../hook/masterGrade";

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
  const sumGrade = data
    .map((i) => i.final_exam_grade)
    .map(function (elt) {
      return /^\d+$/.test(elt) ? parseInt(elt) : 0;
    })
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const sumGradeMin = data
    .map((i) => i.midterm_exam_grade)
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
            <td className="border-2 bg-gray-800 " colspan="2">
              {" "}
              نمره{" "}
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <>
              <tr>
                <td className="border-2 bg-gray-300 text-right" colspan="2">
                  {i.course.name}
                </td>
                <td className="border-2 bg-gray-300 text-right">
                  {i.course.semester.name}
                </td>
                <td className="border-2 bg-gray-300 text-right">
                  {toFarsiNumber(i.course.unit)}
                </td>
                <td className="border-2 bg-gray-300 text-right">
                  {toFarsiNumber(i.midterm_exam_grade)}
                </td>
                <td className="border-2 bg-gray-300 text-right">
                  {toFarsiNumber(i.midterm_exam_grade)}
                </td>
              </tr>
            </>
          ))}
        </tbody>
        <tr>
          <td colspan="3" className="border-2 bg-slate-300 text-right">
            جمع واحد ها و نمرات اخذ شده
          </td>
          <td className="border-2 bg-slate-300 text-right">
            {toFarsiNumber(sumUnit)}
          </td>
          <td className=" border-2 bg-slate-300 text-right">
            {toFarsiNumber(sumGradeMin)}{" "}
          </td>
          <td className=" border-2 bg-slate-300 text-right">
            {toFarsiNumber(sumGrade)}{" "}
          </td>
        </tr>

        <tr>
          <td colspan="4" className="border-2 bg-slate-300 text-center">
            معدل نیمسال
          </td>
          <td colspan="3" className=" border-2 bg-slate-300 text-right">
            {toFarsiNumber((sumGradeMin + sumGrade) / (data.length * 2))}
          </td>
        </tr>
      </table>
    </>
  ) : (
    <div>{window.open("login", "_self")}</div>
  );
}
export default Product;
