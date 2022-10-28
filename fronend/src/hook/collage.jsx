import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useCollageTable() {
  const { t } = useTranslation();
  // const { data: collages, ...rest } = useCollage();

  const [collages, setData] = useState([]);
  console.log(collages, "collages");

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/collages/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MDI1NzQ2LCJqdGkiOiIzOGI3NzljM2YyN2Q0ZDA3OTdkZTNiM2RiOWEwZjllOSIsInVzZXJfaWQiOjF9.Wtbm1FMJdupw_DoYzGG58tlsvs69L8maihoAAGHDHwM`,

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

  const data = React.useMemo(() => collages, [collages]);

  return {
    data,
    // ...rest,
  };
}
