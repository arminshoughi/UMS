import axios from "axios";
import React, { useEffect, useState } from "react";

export function useMasters() {
  const [masters, setMasters] = useState([]);

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/master/master", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2NTYxNjQ4LCJqdGkiOiIzNzkzNWM1MmQ4Mzg0NjQ2OTdlNmE0NWYwNGEwYzI4NyIsInVzZXJfaWQiOjN9.EJuZ4h5fwzNcl5A0swmhqUprfTvzHT1Ctv_BnJYLokg`,

          "X-CSRFToken":
            "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
        },
      })
      .then(function (res) {
        setMasters(res.data);
      })
      .catch(function (err) {
        if (err.response) {
          console.error("Res Error: ", err.response.status);
        } else if (err.request) {
          console.error("Req Error");
        } else {
          console.error("Error: ", err.message);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const data = React.useMemo(() => masters, [masters]);

  return {
    data,
  };
}
