import React from "react";
import { useState } from "react";
import Modal from "../components/modal";

function Test() {
  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <>
      <input
        type="text"
        id="myInput"
        onkeyup={myFunction}
        placeholder="Search for names.."
        title="Type in a name"
      ></input>

      <table id="myTable">
        <tr class="header">
          <th>Name</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Berglunds snabbkop</td>
          <td>Sweden</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Koniglich Essen</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Italy</td>
        </tr>
        <tr>
          <td>North/South</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Paris specialites</td>
          <td>France</td>
        </tr>
      </table>
    </>
  );
}

export default Test;
