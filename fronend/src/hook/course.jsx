import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useCourses(refresh) {
  const { t } = useTranslation();
  // const { data: courses, ...rest } = useCollage();

  const [courses, setData] = useState([]);
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
  }, [refresh]);

  const data = React.useMemo(() => courses, [courses]);

  return {
    data,
    // ...rest,
  };
}
