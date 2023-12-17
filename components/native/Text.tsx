import { Text as RNText, TextProps as RNTextProps, ColorValue } from "react-native";

import Colors from "../../constants/Colors";
import { setFontSize } from "../../utils/helper";

export interface TextProps extends RNTextProps {
  size?: number;
  fn?: "bold" | "medium" | "regular" | "semibold" | "black";
  color?: ColorValue;
}
//
// const fontFamily = {
//   medium: Fonts.MEDIUM,
//   bold: Fonts.BOLD,
//   regular: Fonts.REGULAR,
//   semibold: Fonts.SEMIBOLD,
//   black: Fonts.BLACK
// };

const Text = ({
  size = 14,
  fn = "regular",
  color = Colors.charcol_grey,
  style,
  children,
  ...otherProps
}: TextProps) => (
  <RNText style={[{ fontSize: setFontSize(size), color: color }, style]} {...otherProps}>
    {children}
  </RNText>
);

export default Text;
