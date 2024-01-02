import { Redirect } from "expo-router";
import { user } from "../store/user";
import { Observer } from "mobx-react-lite";

export default function Init() {
  return (
    <Observer>
      {() => (
        <>
          {user?.isloggedIn === true ? (
            user?.type === "admin" ? (
              <Redirect href={"/(admin)/dashboard"} />
            ) : (
              <Redirect href={"/(tabs)"} />
            )
          ) : (
            <Redirect href={"/(auth)/login"} />
          ) }
         
        </>
      )}
    </Observer>
  );
}
