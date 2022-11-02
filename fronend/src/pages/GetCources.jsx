import React from "react";
import { useState } from "react";
import Modal from "../components/modal";
import { useCourseTable } from "../hook/course";
import { useGetCourseTable } from "../hook/getCource";

function GetCourses() {
  const { data } = useGetCourseTable();
  const { data: cource } = useCourseTable();
  console.log(
    data.map((i) => i.course_id).map((i, k) => i),
    cource.filter((i) => i.id === data.map((i) => i.course_id)),
    "assda"
  );

  for (let index = 0; index < data.map((i) => i.course_id).length; index++) {
    console.log(data.map((i) => i.course_id)[index], "Asdasdsd");
  }

  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  console.log(data, "data");
  return (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <th class="col !text-right   !pr-8">{" نام دانشگاه"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pr-8">{row.course_id}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GetCourses;
