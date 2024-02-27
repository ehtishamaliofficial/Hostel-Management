import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import GlobalStyle from '../utils/constants/GlobalStyle';
import {
  Bars3CenterLeftIcon,
  BanknotesIcon,
} from 'react-native-heroicons/outline';
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from 'react-native-heroicons/mini';
import Header from '../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PendingPaymentCard from '../UI/HomeScreen/PendingPaymentCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  useIncomingPaymentQuery,
  useOutGoingPaymentQuery,
} from '../services/payment.service';

const Home = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  const {data: incomingPayment} = useIncomingPaymentQuery();

  const {data: outgoingPayment} = useOutGoingPaymentQuery();

  const [inComing, setInComing] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [total, setTotal] = useState(0);

  const [pending, setPending] = useState<PendingPayment[]>([]);

  useEffect(() => {
    if (incomingPayment) {
      setInComing(incomingPayment.reduce((a, b) => a + b.amount, 0));
      addedToPendingPayment(incomingPayment, setPending, pending);
    }
    if (outgoingPayment) {
      setOutgoing(outgoingPayment.reduce((a, b) => a + b.amount, 0));
      // addedToPendingPayment(outgoingPayment, setPending, pending);
    }

    if (incomingPayment && outgoingPayment) {
      setTotal(
        incomingPayment.reduce((a, b) => a + b.amount, 0) -
          outgoingPayment.reduce((a, b) => a + b.amount, 0),
      );
    }
  }, [incomingPayment, outgoingPayment]);

  console.log(pending.length);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="rgb(15,23,42)" />
      <View
        style={{
          height: hp('38%'),
        }}
        className="bg-slate-900 rounded-b-2xl w-full">
        <View className="mt-5 mx-6 flex-row items-center justify-between">
          <View className="flex-row space-x-2 items-center">
            <View className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                source={{
                  uri: 'https://source.unsplash.com/random',
                }}
                className="w-120 h-10"
              />
            </View>
            <View>
              <Text
                className="text-white"
                style={{
                  fontSize: hp(2.56),
                  ...GlobalStyle.textSemiBold,
                }}>
                Hello {user?.firstName}
              </Text>
              <Text
                className="text-gray-300"
                style={{
                  fontSize: hp(1.8),
                  ...GlobalStyle.textRegular,
                }}>
                Welcome Back!
              </Text>
            </View>
          </View>

          <Bars3CenterLeftIcon strokeWidth={2.5} color={'white'} />
        </View>

        <View className="mx-6 mt-6">
          <View>
            <Text
              style={{
                fontSize: hp(2.3),
                ...GlobalStyle.textSemiBold,
              }}
              className="text-white/50">
              Summary
            </Text>
            <Text
              style={{
                fontSize: hp(2.3 * 2),
                ...GlobalStyle.textSemiBold,
              }}
              className={`${total < 0 ? 'text-red-500' : 'text-green-800'}`}>
              {total.toString().slice(1)}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2 mt-6">
            <View
              className="flex-1 justify-center  bg-white rounded-lg"
              style={{
                height: hp('10%'),
              }}>
              <View className="mx-2 flex-row space-x-2 justify-between items-center">
                <View className="w-8 h-8 bg-red-400 rounded-full justify-center items-center">
                  <ArrowUpRightIcon
                    strokeWidth={2.5}
                    color={'red'}
                    height={25}
                    width={20}
                  />
                </View>

                <View className="flex-1 pl-2">
                  <Text
                    className="text-red-800 uppercase"
                    style={{
                      fontSize: hp(1.3),
                      ...GlobalStyle.textSemiBold,
                    }}>
                    outgoing
                  </Text>
                  <Text
                    style={{
                      ...GlobalStyle.textSemiBold,
                      fontSize: hp(3.5),
                    }}
                    className="text-black">
                    {outgoing}
                  </Text>
                </View>
              </View>
            </View>
            <View
              className="flex-1 justify-center  bg-white rounded-lg"
              style={{
                height: hp('10%'),
              }}>
              <View className="mx-2 flex-row space-x-2 justify-between items-center">
                <View className="w-8 h-8 bg-green-400 rounded-full justify-center items-center">
                  <ArrowDownRightIcon
                    strokeWidth={2.5}
                    color={'green'}
                    height={25}
                    width={20}
                    rotation={90}
                  />
                </View>

                <View className="flex-1 pl-2">
                  <Text
                    className="text-green-800 uppercase"
                    style={{
                      fontSize: hp(1.3),
                      ...GlobalStyle.textSemiBold,
                    }}>
                    Incoming
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(3.5),
                      ...GlobalStyle.textSemiBold,
                    }}
                    className="text-black">
                    {inComing}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="w-full mt-4 mx-4 flex-1">
        <Text
          style={[GlobalStyle.textSemiBold, {fontSize: hp(2)}]}
          className="text-slate-900">
          Pending Transaction
        </Text>

        <ScrollView
          className="mt-4"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: hp(5),
            gap: hp(2),
          }}>
          {pending?.map((payment, index) => (
            <PendingPaymentCard payment={payment} key={index} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
//   return (
//     <>
//       <Pressable
//         onPress={() => setShow(!show)}
//         className="justify-center items-center bg-white shadow-lg shadow-orange-300 rounded-lg"
//         style={{
//           height: hp('10%'),
//           width: wp('90%'),
//         }}>
//         <View className="flex-row justify-between items-center mx-4">
//           <View className="flex-1 flex-row space-x-3 items-center">
//             <View className="w-10 h-10 bg-red-300 rounded-full justify-center items-center">
//               <ArrowDownRightIcon
//                 strokeWidth={2.5}
//                 color={'red'}
//                 height={25}
//                 width={20}
//                 rotation={90}
//               />
//             </View>
//             <View>
//               <Text
//                 style={[GlobalStyle.textSemiBold, {fontSize: hp(2)}]}
//                 className="text-slate-900">
//                 Naveed Ullah Khan
//               </Text>
//               <Text>Alo Ghobi </Text>
//             </View>
//           </View>

//           <View className="items-center">
//             <Text
//               className="text-slate-900"
//               style={[GlobalStyle.textSemiBold, {fontSize: hp(2.2)}]}>
//               234
//             </Text>
//             <Text style={[GlobalStyle.textSemiBold, {fontSize: hp(1.5)}]}>
//               9/23/2022
//             </Text>
//           </View>
//         </View>
//       </Pressable>
//       {show && (
//         <View
//           className="p-3 bg-gray-300"
//           style={{
//             width: wp('90%'),
//           }}>
//           <View className="flex-row justify-between">
//             <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
//             <Text style={[GlobalStyle.textSemiBold]} className="text-red-800">
//               - 32
//             </Text>
//           </View>
//           <View className="flex-row justify-between">
//             <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
//             <Text style={[GlobalStyle.textSemiBold]} className="text-green-800">
//               + 64
//             </Text>
//           </View>
//           <View className="flex-row justify-between">
//             <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
//             <Text style={[GlobalStyle.textSemiBold]} className="text-red-800">
//               - 67
//             </Text>
//           </View>

//           <View className="w-full h-0.5 bg-white mt-5"></View>

//           <View className="flex-row justify-between mt-3">
//             <Text style={[GlobalStyle.textSemiBold, {fontSize: hp(2)}]}>
//               Total
//             </Text>
//             <Text>32</Text>
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

const addedToPendingPayment = (
  payments: Payment[],
  setPending: Dispatch<SetStateAction<PendingPayment[]>>,
  pendingList: PendingPayment[],
) => {
  payments.forEach(payment => {
    let exits: boolean = false;

    pendingList.forEach(item => {
      if (item.id === payment.createdById) {
        exits = true;
        console.log('Already exits');
      } else {
        console.log('Not exits');
        exits = false;
      }
    });

    if (!exits) {
      setPending(prev => [
        ...prev,
        {
          id: payment.createdById,
          firstName: payment.createdByName,
          lastName: payment.createdByName,
          totalAmount: payment.amount,
          karchas: [payment],
        },
      ]);
    } else {
      console.log('Already exits in pending list');
    }
  });
};

const isExits = (pendingList: PendingPayment[], id: number): boolean => {
  pendingList.forEach(payment => {
    if (payment.id === id) {
      return true;
    }
  });
  return false;
};
