import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useUnit } from "./unit";
import { useTranslation } from "react-i18next";

export function useUnitTable() {
  const { t } = useTranslation();
  // const { data: units, ...rest } = useUnit();

  const [units, setData] = useState([]);

  const getData = () => {
    // axios
    // .get(`http://127.0.0.1:8000/api/share/courses/`)
    // .then((res) => {
    //   this.setState({
    //     results: res.data.learns,
    //     totalPage: Math.ceil(res.data.learns.length / this.state.pageSize),
    //   });
    // })

    // axios
    //   .get(
    //     "http://127.0.0.1:8000/api/share/courses/",

    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         // accept: "application/json",
    //         "X-CSRFToken":
    //           "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
    //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2MDMxMTk1LCJqdGkiOiJjZGUxNDMxYmY0NWU0ZDE4YjNiZTk3OGQwNjBiNWI1MSIsInVzZXJfaWQiOjN9.PdYC16qQRf1N9cgzX26gQ55j-hZVPMVYgHScPPPeJwI `,
    //         // Accept:
    //         //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1NTg4MTg4LCJqdGkiOiI1ODY3Y2VkM2FkYTY0NjZjYmU2MTg0NWFiYzIyZGE3MCIsInVzZXJfaWQiOjN9.3xQw49d2v1tGJkw-ZB6RsgEhcy4IwrLfHsMyHSVjc48/",
    //       },
    //     }
    //   )

    //   .then(function (myJson) {
    //     console.log(myJson);

    //     setData(myJson);
    //   });

    axios
      .get("http://127.0.0.1:8000/api/share/courses/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NDM4OTE1LCJqdGkiOiI5ODMxMzEzMjg1YmM0NDExYTQyOTNhMjE2ZDQ1MTQwOSIsInVzZXJfaWQiOjF9.xDZwsu8iZQJC33q02pDw8qXQG1z4mGhU9hXY2K_JGJU`,

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
