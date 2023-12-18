import { Dimensions } from "react-native";

const fontScale = Dimensions.get("screen").fontScale;

export const setFontSize = (fontSize: number) => Math.round(fontScale * fontSize);
