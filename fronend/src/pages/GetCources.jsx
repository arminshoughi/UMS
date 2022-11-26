import React from "react";
import { useGetCourse } from "../hook/getCource";

function GetCourses() {
  const { data } = useGetCourse();
  const access = localStorage.getItem("flag");

  return access === "true" ? (
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
  ) : (
    <div>{window.open("login", "_self")}</div>
  );
}

export default GetCourses;
