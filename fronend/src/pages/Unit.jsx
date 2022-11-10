import React from "react";
import { useUnits } from "../hook/units";
function Units() {
  const { data } = useUnits();

  return (
    <>

      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <th class="col !pr-8">{" نام  رشته "}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pr-8">'{row.name}'</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Units;
