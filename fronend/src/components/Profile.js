import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Navbar.css";
import "@reach/listbox/styles.css";
import axios from "axios";
import { useCollageTable } from "../hook/collage";
import { useMajorTable } from "../hook/major";

const Profile = () => {
  const { data } = useCollageTable();
  const { data: major } = useMajorTable();

  const [, setData] = useState([]);
  const [name, setName] = useState();
  const [family, setFamily] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [birthday, setBierthday] = useState();
  const [sex, setSex] = useState();
  console.log(
    major?.map((i) => i.name),
    "asdas"
  );

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/master/master", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NDIzNDgxLCJqdGkiOiJlYTA5YTI2ODgzYWM0MzU4YmMyOGYzNzFiMTQ1ODMzMiIsInVzZXJfaWQiOjF9.o_629F8KzenKf8y8Z67jvEqAkxau0iEu-PP4EcVtHRA`,

          "X-CSRFToken":
            "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
        },
      })
      .then(function (res) {
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(
    major?.map((i) => i.name),
    "asdsad"
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "//127.0.0.1:8000/api/share/master/1/",
        {
          first_name: name,
          last_name: family,
          collage: 0,
          major: 0,
          national_code: nationalCode,
          sex: sex,
          birthday: birthday,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NDIzNDgxLCJqdGkiOiJlYTA5YTI2ODgzYWM0MzU4YmMyOGYzNzFiMTQ1ODMzMiIsInVzZXJfaWQiOjF9.o_629F8KzenKf8y8Z67jvEqAkxau0iEu-PP4EcVtHRA`,

            "X-CSRFToken":
              "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
          },
        }
      )
      .then((result) => {
        alert("با موفقیت ثبت شد");
      })
      .catch((error) => {
        alert("به مشکل خوردیم");
      });
  };

  return (
    <div className="Login ">
      <div className=" align-center p-4 w-[30%]  ml-[35%]  ">
        <div className="!bg-red-800 ">
          <div className="card ">
            <HiOutlineUserCircle className="w-40 h-40 ml-[32%]" />
            <div className="card-body">
              <h1>Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2">
                  <div className="form-group ">
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control !w-48"
                      id="name"
                      defaultValue={"name"}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group !ml-5 !w-48 ">
                    <label htmlFor="family">family</label>
                    <input
                      type="text"
                      name="family"
                      className="form-control"
                      id="family"
                      onChange={(e) => setFamily(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="national_code">national_code</label>
                  <input
                    type="text"
                    name="national_code"
                    className="form-control"
                    id="national_code"
                    onChange={(e) => setNationalCode(e.target.value)}
                  />
                </div>
                <select
                  className="form-select form-select-lg mt-4 h-10"
                  aria-label=".form-select-lg example"
                >
                  {data?.map((i, b) => (
                    <option>{i?.name}</option>
                  ))}
                </select>
                <select
                  className="form-select form-select-lg mt-4 h-10"
                  aria-label=".form-select-lg example"
                >
                  {major?.map((i, b) => (
                    <option>{i?.name}</option>
                  ))}
                </select>
                <div className="form-group mt-4">
                  <label htmlFor="birthday	">birthday </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className="ml-10"
                    onChange={(e) => setBierthday(e.target.value)}
                  />
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="sex">sex</label>
                  <div className="ml-10">
                    <label>
                      Famele
                      <input
                        type="radio"
                        id="sex"
                        name="sex"
                        value="Famele"
                        className="mr-10 ml-2"
                        onChange={(e) => setSex(e.target.value)}
                      />
                    </label>

                    <label>
                      Mel
                      <input
                        type="radio"
                        id="sex"
                        name="sex"
                        value="Mel"
                        className="mr-10 ml-2"
                        onChange={(e) => setSex(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn mt-5 btn-primary rounded-full !h-9"
                >
                  ok
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;