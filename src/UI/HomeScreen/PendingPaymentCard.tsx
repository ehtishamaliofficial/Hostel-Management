import {View, Text, Pressable} from 'react-native';
import {useState} from 'react';
import GlobalStyle from '../../utils/constants/GlobalStyle';
import {ArrowDownRightIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type Props = {
  payment: PendingPayment;
};

const PendingPaymentCard: React.FC<Props> = ({payment}) => {
  const [show, setShow] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    // <>
    <Pressable
      onPress={() => setShow(!show)}
      className="justify-center items-center bg-white shadow-lg shadow-orange-300 rounded-lg border border-slate-900"
      style={{
        height: hp('10%'),
        width: wp('90%'),
      }}>
      <View className="flex-row justify-between items-center mx-4">
        <View className="flex-1 flex-row space-x-3 items-center">
          <View
            className={`w-10 h-10 ${
              user?.id == payment.id ? 'bg-green-300' : 'bg-red-300'
            } rounded-full justify-center items-center`}>
            <ArrowDownRightIcon
              strokeWidth={2.5}
              color={'red'}
              height={25}
              width={20}
              rotation={90}
            />
          </View>
          <View>
            <Text
              style={[GlobalStyle.textSemiBold, {fontSize: hp(2)}]}
              className="text-slate-900">
              {payment.firstName}
            </Text>
            <Text>{payment.id}</Text>
          </View>
        </View>

        <View className="items-center">
          <Text
            className="text-slate-900"
            style={[GlobalStyle.textSemiBold, {fontSize: hp(2.2)}]}>
            {payment.totalAmount}
          </Text>
          <Text style={[GlobalStyle.textSemiBold, {fontSize: hp(1.5)}]}>
            {'7/78/90'}
          </Text>
        </View>
      </View>
    </Pressable>
    /* {show && (
        <View
          className="p-3 bg-gray-300"
          style={{
            width: wp('90%'),
          }}>
          <View className="flex-row justify-between">
            <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
            <Text style={[GlobalStyle.textSemiBold]} className="text-red-800">
              - 32
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
            <Text style={[GlobalStyle.textSemiBold]} className="text-green-800">
              + 64
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={[GlobalStyle.textSemiBold]}>Alo Ghobi</Text>
            <Text style={[GlobalStyle.textSemiBold]} className="text-red-800">
              - 67
            </Text>
          </View>

          <View className="w-full h-0.5 bg-white mt-5"></View>

          <View className="flex-row justify-between mt-3">
            <Text style={[GlobalStyle.textSemiBold, {fontSize: hp(2)}]}>
              Total
            </Text>
            <Text>32</Text>
          </View>
        </View>
      // )} */
    // </>
  );
};

export default PendingPaymentCard;
