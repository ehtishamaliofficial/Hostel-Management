import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../../utils/constants/GlobalStyle';
import {
  CalendarDaysIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import DatePicker from 'react-native-date-picker';
import {FormikProps} from 'formik';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  handleDateChange: (date: Date) => void;
  date: Date;
  openDatePicker: boolean;
  setOpenDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenModel: () => void;
  selectedUser: SelectedUser[];
  amountPerToken: number;
  Formik: FormikProps<AddKarchaFormValues>;
  handleIncreaseToken: (user: User) => void;
  navigation: NativeStackNavigationProp<any>;
  handleDecreaseToken: (user: User) => void;
};

const AddKharchaForm: React.FC<Props> = ({
  handleDateChange,
  date,
  openDatePicker,
  setOpenDatePicker,
  handleOpenModel,
  selectedUser,
  amountPerToken,
  Formik,
  handleIncreaseToken,
  navigation,
  handleDecreaseToken,
}) => {
  return (
    <View className="space-y-2 flex-1">
      <View className="space-y-1 ">
        <Text style={GlobalStyle.textSemiBold} className="pl-1 text-slate-900">
          Title
        </Text>
        <View className={`border border-gray-400 px-2 rounded justify-center`}>
          <TextInput
            placeholder="ex. House Rent"
            className="h-10"
            style={GlobalStyle.textSemiBold}
            autoCapitalize="none"
            id="title"
            onChangeText={e => Formik.setFieldValue('title', e)}
            onBlur={Formik.handleBlur('title')}
            value={Formik.values.title}
          />
        </View>
        {Formik.touched.title && Formik.errors.title && (
          <Text
            style={GlobalStyle.textRegular}
            className="text-red-500 text-xs ml-0.5 ">
            {Formik.errors.title}
          </Text>
        )}
      </View>
      <View className="space-y-1 ">
        <Text style={GlobalStyle.textSemiBold} className="pl-1 text-slate-900">
          Description
        </Text>
        <View className={`border border-gray-400 px-2 rounded h-20`}>
          <TextInput
            placeholder="ex. House Rent for 3 months"
            className="h-10"
            style={GlobalStyle.textSemiBold}
            autoCapitalize="none"
            id="description"
            onChangeText={e => Formik.setFieldValue('description', e)}
            onBlur={Formik.handleBlur('description')}
            value={Formik.values.description}
          />
        </View>
        {Formik.touched.description && Formik.errors.description && (
          <Text
            style={GlobalStyle.textRegular}
            className="text-red-500 text-xs ml-0.5 ">
            {Formik.errors.description}
          </Text>
        )}
      </View>
      <View className="space-y-1 ">
        <Text style={GlobalStyle.textSemiBold} className="pl-1 text-slate-900">
          Date
        </Text>
        <Pressable
          className={`border border-gray-400 px-2 rounded flex-row items-center h-10`}
          onPress={() => setOpenDatePicker(true)}>
          <Text
            style={GlobalStyle.textSemiBold}
            className="text-slate-900 flex-1">
            {Formik.values.date.toDateString()}
          </Text>
          <CalendarDaysIcon
            strokeWidth={1.5}
            color={'black'}
            height={25}
            width={20}
          />
        </Pressable>

        <DatePicker
          modal
          open={openDatePicker}
          mode="date"
          date={date}
          onConfirm={handleDateChange}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
      </View>
      <View className="space-y-1 ">
        <Text style={GlobalStyle.textSemiBold} className="pl-1 text-slate-900">
          Amount
        </Text>
        <View className={`border border-gray-400 px-2 rounded`}>
          <TextInput
            placeholder="ex. 2000"
            className="h-10"
            style={GlobalStyle.textSemiBold}
            autoCapitalize="none"
            keyboardType="numeric"
            id="amount"
            onChangeText={e => Formik.setFieldValue('amount', e)}
            onBlur={Formik.handleBlur('amount')}
            value={Formik.values.amount.toString()}
          />
        </View>
        {Formik.touched.amount && Formik.errors.amount && (
          <Text
            style={GlobalStyle.textRegular}
            className="text-red-500 text-xs ml-0.5 ">
            {Formik.errors.amount}
          </Text>
        )}
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text
            style={GlobalStyle.textSemiBold}
            className="pl-1 text-slate-900">
            All Members
          </Text>
          <Pressable
            className="flex-row items-center bg-slate-900 p-1 px-3 rounded"
            onPress={handleOpenModel}>
            <PlusIcon
              strokeWidth={1.5}
              color={'white'}
              height={25}
              width={20}
            />
            <Text className="text-white" style={GlobalStyle.textSemiBold}>
              Add
            </Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{paddingBottom: 20, paddingTop: 10, gap: 5}}
          showsVerticalScrollIndicator={false}>
          {selectedUser.map((user, index) => (
            <View
              key={index}
              className="flex-row items-center border border-gray-300 p-2 rounded h-16">
              <View className="flex-row space-x-2 flex-1">
                <View className="w-10 h-10 bg-red-300 rounded-full justify-center items-center">
                  <Text
                    className="text-white uppercase"
                    style={GlobalStyle.textSemiBold}>
                    {user.firstName.charAt(0) + user.lastName.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text
                    className="text-slate-900 mt-0.5 capitalize"
                    style={GlobalStyle.textSemiBold}>
                    {user.firstName + ' ' + user.lastName}
                  </Text>
                  <Text
                    className="text-slate-400"
                    style={GlobalStyle.textSemiBold}>
                    Rs. {(user.token * amountPerToken).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View className="space-x-2 flex-row items-center">
                <Pressable
                  className="bg-red-500 p-1 rounded-full"
                  onPress={() => {
                    handleDecreaseToken(user);
                  }}>
                  <MinusIcon strokeWidth={2.5} color={'white'} size={15} />
                </Pressable>
                <Text
                  className="text-slate-900"
                  style={GlobalStyle.textSemiBold}>
                  {user.token}
                </Text>
                <Pressable
                  className="bg-green-500 p-1 rounded-full"
                  onPress={() => {
                    handleIncreaseToken(user);
                  }}>
                  <PlusIcon strokeWidth={2.5} color={'white'} size={15} />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="px-3 py-2 flex-row justify-between items-center space-x-3">
        <Pressable
          className="bg-red-500 flex-1 p-3 rounded-lg justify-center items-center"
          onPress={() => navigation.goBack()}>
          <Text
            style={GlobalStyle.textSemiBold}
            className="uppercase text-white ">
            Cancel
          </Text>
        </Pressable>
        <Pressable
          className="bg-slate-900 p-3 rounded-lg flex-1 justify-center items-center"
          onPress={() => {}}>
          <Text
            style={GlobalStyle.textSemiBold}
            className="uppercase text-white ">
            Add
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddKharchaForm;
