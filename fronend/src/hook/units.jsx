import axios from "axios";
import React, { useEffect, useState } from "react";

export function useUnits() {
  const [units, setData] = useState([]);
  const access = localStorage.getItem("access");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/courses/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${access}`,

          "X-CSRFToken":
            "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
        },
      })
      .then(function (res) {
        setData(res);
      })
      .catch(function (err) {
        alert(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const data = React.useMemo(() => units, [units]);

  return {
    data,
  };
}
