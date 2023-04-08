import Textfield from "../../components/Form/Textfield";
import axios from "axios";
import { Formik, Form, useFormik, Field, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

type initialValues = {
  username?: string | undefined;
  password?: string | undefined;
};
const baseURL = import.meta.env.VITE_BASE_URL;

const submit_login_form = async ({ username, password }: initialValues) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await axios.post(
    `${baseURL}/login`,
    {
      username: username,
      password: password,
    },
    config
  );

  return response;
};

const Login = () => {
  const navigate = useNavigate();

  const initialValues: initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors: any = {};

      if (!values.username) {
        errors.username = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
      ) {
        errors.username = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      submit_login_form({
        ...values,
      })
        .then((res) => {
          formik.resetForm();

          const data = res.data;
          const token: string = data.access_token;

          if (!token) {
            alert("Unable to login. Please try again.");
            return;
          }

          const options = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };

          if (res.status === 200) {
            axios
              .get(`${baseURL}/validate-access-token`, options)
              .then((response) => {
                localStorage.clear();
                localStorage.setItem("user-token", token);
                setTimeout(() => {
                  navigate("/");
                }, 500);
              });
          }
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
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            touched={formik.touched.username}
            handleBlur={formik.handleBlur}
            errors={formik.errors.username}
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
          <button>submit</button>
        </form>
      </FormikProvider>
    </>
  );
};

export default Login;
