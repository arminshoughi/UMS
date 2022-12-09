import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle, HiX } from "react-icons/hi";
import "./Navbar.css";
import "@reach/listbox/styles.css";
import axios from "axios";
import { useCollage } from "../hook/collage";
import { useMajors } from "../hook/major";
import { useCurrentUser } from "../hook/currentUser";
import { toJalaali } from "../constants/unit";

const Profile = () => {
  const { data } = useCollage();
  const { data: major } = useMajors();
  const { data: currentUser } = useCurrentUser();
  const [, setData] = useState([]);
  const [name, setName] = React.useState(currentUser.first_name);
  const [family, setFamily] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [birthday, setBierthday] = useState();
  const [sex, setSex] = useState();

  const access = localStorage.getItem("access");
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/master/master", {
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
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        "//127.0.0.1:8000/api/share/master/1/",
        {
          first_name: name,
          last_name: family,
          collage: 1,
          major: 1,
          national_code: nationalCode,
          sex: sex,
          birthday: birthday,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${access}`,

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
  const modalClose = () => {
    window.open(
      currentUser.typ === "STUDENT" ? "welcome" : "welcomemaster",
      "_self"
    );
  };
  return (
    <div className="Login ">
      <div className=" align-center p-4 w-[30%]  ml-[35%]   ">
        <div className="!bg-red-800 mt-1">
          <div className="ml-4 mt-2 !z-50 fixed ">
            <HiX onClick={(e) => modalClose(e)} className="w-6 h-6" />
          </div>
          <div className="card ">
            <HiOutlineUserCircle className="w-40 h-40 ml-[35%]" />
            <div className="card-body">
              <h1 className="text-center text-3xl">پروفایل</h1>
              <form onSubmit={handleSubmit} dir="rtl">
                <div className="grid grid-cols-2">
                  <div className="form-group ">
                    <label htmlFor="name">نام</label>
                    <input
                      disabled
                      type="text"
                      name="name"
                      className="form-control !w-60"
                      id="name"
                      defaultValue={currentUser.first_name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group !ml-5 !w-[16.5rem] ">
                    <label htmlFor="family">فامیل</label>
                    <input
                      disabled
                      type="text"
                      name="family"
                      className="form-control"
                      id="family"
                      defaultValue={currentUser.last_name}
                      onChange={(e) => setFamily(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="national_code">کد ملی</label>
                  <input
                    disabled
                    type="text"
                    name="national_code"
                    className="form-control"
                    id="national_code"
                    defaultValue={currentUser.national_code}
                    onChange={(e) => setNationalCode(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="national_code">دانشگاه</label>
                  <input
                    disabled
                    type="text"
                    name="national_code"
                    className="form-control"
                    id="national_code"
                    defaultValue={data?.map((i, b) =>
                      i?.id === currentUser.collage ? i.name : ""
                    )}
                  />
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="national_code">رشته</label>
                  <input
                    disabled
                    type="text"
                    name="national_code"
                    className="form-control"
                    id="national_code"
                    defaultValue={major?.map((i, b) =>
                      i?.id === currentUser.major ? i.name : ""
                    )}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="birthday	">تاریخ تولد </label>
                  <input
                    disabled
                    id="birthday"
                    name="birthday"
                    defaultValue={toJalaali(currentUser.birthday)}
                    className="mr-10"
                    onChange={(e) => setBierthday(e.target.value)}
                  />
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="sex">جنسیت</label>
                  <div className="ml-10" dir="ltr">
                    <label>
                      زن
                      <input
                        disabled
                        type="radio"
                        id="sex"
                        name="sex"
                        className="mr-10 ml-2"
                        defaultChecked={currentUser.sex !== "Famele"}
                        onChange={(e) => setSex(e.target.value)}
                      />
                    </label>

                    <label>
                      مرد
                      <input
                        disabled
                        type="radio"
                        id="sex"
                        name="sex"
                        value="Mel"
                        className="mr-10 ml-2"
                        defaultChecked={currentUser.sex !== "Male"}
                        onChange={(e) => setSex(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
