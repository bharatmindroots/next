import Header from "./layout/header";
import { Formik } from "formik";

export default function contact() {
  return (
      <div className="formContact">
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <p><input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              </p>
              <p> {errors.email && touched.email && errors.email}</p>
              <p><input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              /></p>
              <p>{errors.password && touched.password && errors.password}</p>
              <p><button type="submit" disabled={isSubmitting}>
                Submit
              </button></p>
            </form>
          )}
        </Formik>
      </div>
  );
}
