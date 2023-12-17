import { useWindowDimensions } from "react-native";

const { fontScale } = useWindowDimensions();

export const setFontSize = (fontSize: number) => Math.round(fontScale * fontSize);
