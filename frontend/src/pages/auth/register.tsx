import Textfield from "../../components/Form/Textfield";
import axios from "axios";
import { Formik, Form, useFormik, Field, FormikProvider } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type initialValues = {
  email?: string | undefined;
  password?: string | undefined;
  verificationCode?: string | undefined;
};
const baseURL = import.meta.env.VITE_BASE_URL;

const send_code_form = async ({
  email,
  password,
  verificationCode,
}: initialValues) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${baseURL}/register`,
    {
      email: email,
      password: password,
    },
    config
  );

  return response;
};

const submit_register_form = async ({
  email,
  password,
  verificationCode,
}: initialValues) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${baseURL}/register/verification_code`,
    {
      email: email,
      verification_code: verificationCode,
    },
    config
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [btnClicked, setBtnClicked] = useState("");

  const initialValues: initialValues = {
    email: "",
    password: "",
    verificationCode: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors: any = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(btnClicked);
      if (btnClicked === "register") {
        submit_register_form({
          ...values,
        })
          .then((res) => {
            console.log(res);
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err.response.data.detail));
          });
      } else {
        console.log("hello");
        send_code_form({
          ...values,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            alert(JSON.stringify(err.response.data.detail));
          });
      }
    },
  });
  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Textfield
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            touched={formik.touched.email}
            handleBlur={formik.handleBlur}
            errors={formik.errors.email}
            placeholder={"Email Address*"}
          />
          <Textfield
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            touched={formik.touched.password}
            handleBlur={formik.handleBlur}
            errors={formik.errors.password}
            placeholder={"Password*"}
          />
          <Textfield
            name="verificationCode"
            onChange={formik.handleChange}
            value={formik.values.verificationCode}
            touched={formik.touched.verificationCode}
            handleBlur={formik.handleBlur}
            errors={formik.errors.verificationCode}
            placeholder={"Verification Code*"}
          />
          <button
            type="submit"
            onClick={(event) => {
              setBtnClicked("register");
            }}
          >
            Register
          </button>
          <button
            type="submit"
            onClick={(event) => {
              setBtnClicked("sendCode");
            }}
          >
            Send Code
          </button>
        </form>
      </FormikProvider>
    </>
  );
};

export default Register;
