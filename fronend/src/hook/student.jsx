import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useStudentTable() {
  const { t } = useTranslation();
  // const { data: students, ...rest } = useCollage();

  const [students, setData] = useState([]);
  console.log(students, "students");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/student/student/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MzE2MDQ5LCJqdGkiOiI1MGM0NWJhZDkxZWI0YjY4YThmYTRhMTQ3OTc1MWJkMSIsInVzZXJfaWQiOjF9.2QNopStjy_DnsUTUD_v2kNlWBYY079g3G8CfuXVazkU`,

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

  const data = React.useMemo(() => students, [students]);
  return {
    data,
    // ...rest,
  };
}
