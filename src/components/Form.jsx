import React, { useEffect } from 'react';
import { withFormik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Form = props => {
  const { userData, setUserData, values, errors, touched, status} = props;
  
  useEffect(() => {
    console.log('status has changed!', status);
    status && setUserData(userData => [...userData, status]);
  }, [status]);

  // Name, Email, Password, Terms of Service (checkbox), Submit button
  return (
    <div>
      <FormikForm>
        <label htmlFor="name">Name
          <Field id="name" type="text" name="name" placeholder="name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">Email
          <Field id="email" type="email" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p>{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">Password
          <Field id="password" type="password" name="password" placeholder="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label>Terms of Service
          <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
        </label>
        <button type="submit">Submit</button>
      </FormikForm>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      {userData.map(user => {
        return (
          <ul key={Date.now()}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || '',
      email: props.email || '',
      termsOfService: props.termsOfService || false,
      password: '',
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log('submitting', values);
    axios.post('https://reqres.in/api/users/', values)
      .then(res => {
        console.log('sucess', res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.err(err.response));
  }
})(Form);

export default FormikUserForm;
