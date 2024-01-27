import { View, Text } from "react-native";
import React from "react";
import { Bars3Icon, BellIcon } from "react-native-heroicons/outline";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center w-full mt-2">
      <View className="flex-row space-x-2 items-center ml-2">
        <Bars3Icon strokeWidth={2.5} color={"white"} />
        <Text className="text-white font-bold text-lg uppercase">
          Expense Tracker
        </Text>
      </View>
      <View className="mr-2">
        <BellIcon strokeWidth={2.5} color={"white"} className="h-6 w-6" />
      </View>
    </View>
  );
};

export default Header;
