import React from "react";
import { useGetCourse } from "../hook/getCource";

function GetCourses() {
  const { data } = useGetCourse();

  return (
    <>
      <table class="table !text-right   mt-3">
      <thead className="!bg-slate-500">
          <tr>
            <th class="col !text-right   !pr-8">{" نام دانشگاه"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right  !bg-slate-500 ">
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
