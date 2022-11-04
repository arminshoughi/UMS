import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useCurrentUserTable() {
  const { t } = useTranslation();
  // const { data: current-users, ...rest } = useCollage();

  const [currentUsers, setData] = useState([]);
  console.log(currentUsers, "current-users");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/current-user/", {
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

  const data = React.useMemo(() => currentUsers, [currentUsers]);
  return {
    data,
    // ...rest,
  };
}