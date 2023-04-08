import Textfield from "../../components/Form/Textfield";
import axios from "axios";
import { Formik, Form, useFormik, Field, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

type initialValues = {
  email?: string | undefined;
  password?: string | undefined;
};
const baseURL = import.meta.env.VITE_BASE_URL;

const submit_register_form = async ({ email, password }: initialValues) => {
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

const Register = () => {
  const navigate = useNavigate();

  const initialValues: initialValues = {
    email: "",
    password: "",
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
      submit_register_form({
        ...values,
      })
        .then((res) => {
          formik.resetForm();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert("Some error occured!");
        });
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
          <button>Register</button>
        </form>
      </FormikProvider>
    </>
  );
};

export default Register;
