import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useGetCourseTable() {
  const { t } = useTranslation();
  // const { data: current-users, ...rest } = useCollage();

  const [getCourses, setData] = useState([]);

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/student/student/get_courses/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NDY3NDYyLCJqdGkiOiJlYzAyZjY3N2MwMjI0ZGJiYjc3MWU1NzA2YTA1M2RmNCIsInVzZXJfaWQiOjN9.GyqCz71qu3AxXydIBCtIciW_xRHsBHudI8dzqrfbum8`,

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

  const data = React.useMemo(() => getCourses, [getCourses]);
  return {
    data,
    // ...rest,
  };
}
