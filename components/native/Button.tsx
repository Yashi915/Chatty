import {
  Pressable,
  StyleSheet,
  PressableProps,
  DimensionValue,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode } from "react";
import Text, { TextProps } from "./Text";
import Colors from "../../constants/Colors";

interface ButtonProps extends PressableProps {
  width?: DimensionValue;
  text?: TextProps;
  type?: "outline" | "flat";
  size?: number;
  title: string;
  rightIcon?: ReactNode;
}

const PressAction: any = Platform.OS === "ios" ? TouchableOpacity : Pressable;

const Button = ({
  width = undefined,
  text,
  title,
  type = "flat",
  size = 14,
  rightIcon = null,
  style,
  ...props
}: ButtonProps) => (
  <PressAction
    style={[{ width }, styles.view, styles[type], style]}
    android_ripple={{
      color: Colors.border,
    }}
    {...props}
  >
    <Text
      color={type === "flat" ? Colors.white : Colors.primary}
      fn={type === "flat" ? "bold" : "medium"}
      size={size}
      {...text}
    >
      {title}
    </Text>
    {rightIcon}
  </PressAction>
);

export default Button;

const styles = StyleSheet.create({
  view: {
    borderRadius: 3,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  flat: {
    backgroundColor: Colors.primary,
  },
});
