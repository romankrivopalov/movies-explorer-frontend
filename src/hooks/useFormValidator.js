import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [ values, setValues ] = useState({}),
        [ errors, setErrors ] = useState({}),
        [ isValid, setIsValid ] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, setValues, handleChange, setIsValid, resetForm };
};

export default useFormValidation;
