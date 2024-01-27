import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyle from '../../utils/constants/GlobalStyle';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useGetAllUsersQuery} from '../../services/user.service';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addedUser: SelectedUser[];
  setAddedUser: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
};

const SelectUserModal: React.FC<Props> = ({
  open,
  setOpen,
  addedUser,
  setAddedUser,
}) => {
  const {isLoading, data} = useGetAllUsersQuery();

  const [selectedUser, setSelectedUser] = React.useState<User[]>([]);

  const onSelectUser = (user: User) => {
    if (!selectedUser.includes(user)) {
      setSelectedUser([...selectedUser, user]);
    } else {
      setSelectedUser(selectedUser.filter(u => u.id !== user.id));
    }
  };

  const onAddUser = () => {
    let token: number = 0;
    let addAbleUser: SelectedUser[] = [];
    selectedUser.forEach(user => {
      addAbleUser.push({
        ...user,
        token: 1,
      });
    });
    console.log(addAbleUser);
    setAddedUser(addAbleUser);
    setOpen(false);
  };

  useEffect(() => {
    addedUser.forEach(user => {
      if (!selectedUser.includes(user)) {
        setSelectedUser([...selectedUser, user]);
      }
    });
  }, [data]);

  return (
    <Modal
      visible={open}
      presentationStyle="fullScreen"
      animationType="slide"
      onRequestClose={() => setOpen(false)}>
      <View className="flex-1 bg-white px-3">
        {!isLoading ? (
          <>
            <View className="my-3 border border-gray-300 px-2 rounded flex-row items-center">
              <TextInput
                placeholder="Search"
                className="h-10 flex-1"
                style={GlobalStyle.textSemiBold}
                autoCapitalize="none"
                id="usernameOrPhoneNumber"
                // onChangeText={e => Formik.setFieldValue('usernameOrPhoneNumber', e)}
                // onBlur={Formik.handleBlur('usernameOrPhoneNumber')}
                // value={Formik.values.usernameOrPhoneNumber}
              />

              <MagnifyingGlassIcon
                strokeWidth={2.5}
                color={'black'}
                height={20}
                width={20}
              />
            </View>
            <ScrollView
              className="flex-1 bg-white space-y-3"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 20, gap: 10}}>
              {data?.map(user => (
                <ModalCard
                  user={user}
                  key={user.id}
                  onSelectUser={onSelectUser}
                  selectedUser={selectedUser}
                />
              ))}
            </ScrollView>
            <View className="px-3 py-2 flex-row justify-between items-center space-x-3">
              <Pressable
                className="bg-red-500 flex-1 p-3 rounded-lg justify-center items-center"
                onPress={() => setOpen(false)}>
                <Text
                  style={GlobalStyle.textSemiBold}
                  className="uppercase text-white ">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="bg-slate-900 p-3 rounded-lg flex-1 justify-center items-center"
                onPress={onAddUser}>
                <Text
                  style={GlobalStyle.textSemiBold}
                  className="uppercase text-white ">
                  Add
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>Loading</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SelectUserModal;

type ModalCardProps = {
  user: User;
  selectedUser: User[];
  onSelectUser: (user: User) => void;
};

const ModalCard: React.FC<ModalCardProps> = ({
  user,
  onSelectUser,
  selectedUser,
}) => {
  let selected: boolean;

  if (selectedUser.includes(user)) {
    selected = true;
  } else {
    selected = false;
  }
  return (
    <Pressable
      className={`flex-row items-center border border-gray-300 p-2 rounded h-16 ${
        selected && 'bg-slate-900'
      }`}
      onPress={() => onSelectUser(user)}>
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
            className={`text-slate-900 mt-0.5 capitalize ${
              selected && 'text-white'
            }`}
            style={GlobalStyle.textSemiBold}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <Text className="text-slate-400" style={GlobalStyle.textSemiBold}>
            {user.phoneNumber}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
