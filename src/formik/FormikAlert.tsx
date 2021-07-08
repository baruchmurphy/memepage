import React from 'react';
import { Field, FieldProps } from 'formik';
import { makeStyles } from '@material-ui/core';
import { Color } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';

interface FormikAlertProps {
  name: string;
  severity?: Color;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

export default function FormikAlert(props: FormikAlertProps) {
  const classes = useStyles();
  const { name, severity } = props;

  const AlertComponent = (alertProps: FieldProps<unknown>) => {
    if (
      !alertProps.form ||
      !alertProps.form.status ||
      !alertProps.form.status[name]
    ) {
      return null;
    }

    return (
      <Alert severity={severity || 'info'} classes={{ root: classes.root }}>
        {alertProps.form.status[name]}
      </Alert>
    );
  };

  return <Field {...props} name={name} component={AlertComponent} />;
}
