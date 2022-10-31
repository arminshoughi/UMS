import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useCourseTable() {
  const { t } = useTranslation();
  // const { data: courses, ...rest } = useCollage();

  const [courses, setData] = useState([]);
  console.log(courses, "courses");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/courses/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MjMxNjYxLCJqdGkiOiIzYmQ4YzUxODgwZmE0NDI0YjBhNDY2M2IzNzMxZTFlMSIsInVzZXJfaWQiOjF9.kNvtW0izZ58tl7EdgmJDckzZ4-ZfRYojJTTu6j1wIZg`,

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

  const data = React.useMemo(() => courses, [courses]);

  return {
    data,
    // ...rest,
  };
}
