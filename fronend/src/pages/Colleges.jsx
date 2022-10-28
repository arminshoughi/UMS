import React from "react";
// import Error from "../components/Error";
// import Loading from "../components/Error";
import { useCollageTable } from "../hook/collage";
function Collages() {
  const { data, columns } = useCollageTable();

  return (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <button className="w-96">اضافه کردن دانشگاه</button>
            <th class="col !text-right !pr-8">{" نام دانشگاه"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pr-8">{row.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Collages;
