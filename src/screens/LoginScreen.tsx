import {useState} from 'react';
import {useFormik} from 'formik';
import LoginForm from '../UI/LoginScreen/LoginForm';
import {useToast} from 'react-native-toast-notifications';
import {loginSchema} from '../utils/validationSchemas';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../redux/slices/auth.slice';
import {useLoginMutation} from '../services/auth.service';

const initialValues: LoginFormValues = {
  usernameOrPhoneNumber: '',
  password: '',
};

const LoginScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [loginApi] = useLoginMutation();

  const Formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit: values => {
      setLoading(true);
      loginApi(values)
        .unwrap()
        .then(res => {
          toast.show('Login Successful', {
            type: 'success',
          });
          dispatch(AuthActions.login(res));
        })
        .catch(err => {
          console.log(err);
          toast.show(err.data.message, {
            type: 'danger',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    validationSchema: loginSchema,
  });

  return (
    <LoginForm
      loading={loading}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      Formik={Formik}
    />
  );
};

export default LoginScreen;
