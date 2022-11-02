import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useMajorTable() {
  const { t } = useTranslation();
  // const { data: majors, ...rest } = useCollage();

  const [majors, setData] = useState([]);
  console.log(majors, "majors");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/majors/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NDc3NTMxLCJqdGkiOiIzMWNkMzkxODY3ZmI0ODg3OGQ4YjkxN2E4OTNhOTYwNSIsInVzZXJfaWQiOjF9.mPMQU18-EhtI_8ZVzOHd6ebCNK0AeeBSIYmVWaWBS7Q`,

          "X-CSRFToken":
            "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
        },
      })
      .then(function (res) {
        setData(res.data);
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

  const data = React.useMemo(() => majors, [majors]);

  return {
    data,
    // ...rest,
  };
}
