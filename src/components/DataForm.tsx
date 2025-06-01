import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import { createRecord } from '../api/api';
import { Record } from '../types/Record';

interface Props {
  onAdd: (record: Record) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  age: Yup.number().positive('Возраст должен быть положительным').integer().required('Возраст обязателен'),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  city: Yup.string().required('Город обязателен'),
  profession: Yup.string().required('Профессия обязательна'),
});

const RecordForm: React.FC<Props> = ({ onAdd }) => {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <h2>Создать запись</h2>
      <Formik
        initialValues={{
          name: '',
          age: 0,
          email: '',
          city: '',
          profession: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const newRecord = await createRecord(values);
            onAdd(newRecord);
            resetForm();
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field as={TextField} label="Имя" name="name" fullWidth margin="normal" />
            <ErrorMessage name="name" component="div" />

            <Field as={TextField} label="Возраст" name="age" type="number" fullWidth margin="normal" />
            <ErrorMessage name="age" component="div" />

            <Field as={TextField} label="Email" name="email" type="email" fullWidth margin="normal" />
            <ErrorMessage name="email" component="div" />

            <Field as={TextField} label="Город" name="city" fullWidth margin="normal" />
            <ErrorMessage name="city" component="div" />

            <Field as={TextField} label="Профессия" name="profession" fullWidth margin="normal" />
            <ErrorMessage name="profession" component="div" />

            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Сохранить'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RecordForm;