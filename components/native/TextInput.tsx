import {
  StyleSheet,
  TextInputProps as RnTextInputProps,
  TextInput as RNTextInput,
  DimensionValue,
  View,
  Pressable,
} from "react-native";
import React, { ReactNode } from "react";
import Text from "./Text";
import Colors from "../../constants/Colors";
import { setFontSize } from "../../utils/helper";

interface TextInputProps extends RnTextInputProps {
  width?: DimensionValue;
  label?: ReactNode;
  size?: number;
  error?: string;
  flex?: number;
  type?: "press" | "input" | "dropdown";
  icon?: "date" | "time";
  onPress?: () => void;
  ricon?: "dropdown";
  leftSymbol?: string;
  rightSymbol?: string;
  rightPlaceholder?: string;
  onDropDownPress?: ({ item }: any) => void;
  dropDownData?: [];
}

const TextInput = ({
  label,
  size = 14,
  error,
  flex,
  type = "input",
  icon,
  ricon,
  onPress = () => {},
  leftSymbol,
  rightSymbol,
  rightPlaceholder,
  style,
  onDropDownPress = ({ item }) => console.warn("not implement"),
  dropDownData = [],
  ...props
}: TextInputProps) => (
  <>
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        ricon && ricon === "dropdown" ? { backgroundColor: Colors.secondary_light } : {},
      ]}
    >
      <RNTextInput
        editable={type === "input"}
        style={[styles.input, style]}
        cursorColor={Colors.primary}
        {...props}
        onPressIn={onPress}
        placeholderTextColor={Colors.secondary_placeholder}
      />
    </Pressable>
    {error ? (
      <Text size={12} color={Colors.primary} style={styles.error}>
        {error}
      </Text>
    ) : null}
  </>
);

export default TextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.secondary_border,
    overflow: "hidden",
  },
  input: {
    fontFamily: "regular",
    color: Colors.charcol_grey,
    fontSize: setFontSize(14),
    padding: 8,
  },
  icon: {
    borderRightWidth: 1,
    borderColor: Colors.secondary_border,
    backgroundColor: Colors.secondary_light,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { marginBottom: 5 },
  error: { marginTop: 8 },
});
