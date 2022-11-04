import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useSemesterTable() {
  const { t } = useTranslation();
  // const { data: majors, ...rest } = useCollage();

  const [majors, setData] = useState([]);
  console.log(majors, "majors");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/semesters/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjQxMzExLCJqdGkiOiJkYzVlMWFmODYzMzc0Y2EzYjYzZWI2ZDVkZmRlZmRkYiIsInVzZXJfaWQiOjN9.VxqDZUlDGF1JrIuQ71XSi4PcoJ4wdQDcUIO3DXX_Oh0`,

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