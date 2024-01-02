import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { FormModal } from "../components/modal/FormModal";

export function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="create_document" options={{ headerTitle: "Create Documents" }} />
        <Stack.Screen name="helpline" options={{ headerTitle: "helpline" }} />
      </Stack>

      <FormModal />
      <Toast />
    </>
  );
}
