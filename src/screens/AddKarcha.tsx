import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddKharchaForm from '../UI/AddKarchaScreen/AddKharchaForm';
import {useToast} from 'react-native-toast-notifications';
import SelectUserModal from '../UI/AddKarchaScreen/SelectUserModal';
import {useFormik} from 'formik';
import {AddKarchaFormValidationSchema} from '../utils/validationSchemas';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const AddKarcha = () => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser[]>([]);
  const [amountPerToken, setAmountPerToken] = useState(0);
  const [date, setDate] = useState(new Date());
  const toast = useToast();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleDateChange = (date: Date) => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 10);
    const currentDate = new Date();
    if (date >= minDate && date <= currentDate) {
      setDate(date);
      Formik.setFieldValue('date', date);
      console.log('Selected date is allowed:', date);
    } else {
      toast.show('Selected date is not allowed', {
        type: 'danger',
      });
      console.log('Selected date is not allowed:', date);
    }
    setOpenDatePicker(false);
  };

  const handleOpenModel = () => {
    setModelOpen(true);
  };

  const Formik = useFormik<AddKarchaFormValues>({
    initialValues: {
      title: '',
      description: '',
      date: new Date(),
      amount: 0,
    },
    onSubmit: values => {
      console.log(values);
    },
    validationSchema: AddKarchaFormValidationSchema,
  });

  const handleIncreaseToken = (user: User) => {
    const newSelectedUser = selectedUser.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          token: u.token + 1,
        };
      }
      return u;
    });
    setSelectedUser(newSelectedUser);
    handleCalculateAmount();
  };

  const handleDecreaseToken = (user: User) => {
    const newSelectedUser = selectedUser.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          token: u.token - 1,
        };
      }
      return u;
    });
    setSelectedUser(newSelectedUser);
    handleCalculateAmount();
  };

  function handleCalculateAmount() {
    let token: number = 0;
    selectedUser.forEach(user => {
      token += user.token;
    });
    setAmountPerToken(Formik.values.amount / token);
  }

  useEffect(() => {
    handleCalculateAmount();
  }, [Formik.values.amount, selectedUser]);

  return (
    <View className="flex-1 bg-white px-3">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AddKharchaForm
        handleDateChange={handleDateChange}
        date={date}
        openDatePicker={openDatePicker}
        setOpenDatePicker={setOpenDatePicker}
        handleOpenModel={handleOpenModel}
        selectedUser={selectedUser}
        amountPerToken={amountPerToken}
        Formik={Formik}
        handleIncreaseToken={handleIncreaseToken}
        navigation={navigation}
        handleDecreaseToken={handleDecreaseToken}
      />

      <SelectUserModal
        open={modelOpen}
        setOpen={setModelOpen}
        addedUser={selectedUser}
        setAddedUser={setSelectedUser}
      />
    </View>
  );
};

export default AddKarcha;
