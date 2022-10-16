import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Offers from "./panels/Offers";
import Comments from "./panels/Comments";
import Rating from "@material-ui/lab/Rating";

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [rngValue, setRngValue] = useState([50000]);
  const [value, setValue] = useState(2);

  const handleSumChange = (rngValue) => {
    setRngValue(+rngValue);
  };

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });

    // async function fetchUser() {
    //   const token = await bridge.send("VKWebAppGetAuthToken", {
    //     app_id: 51435408,
    //     scope: "status,groups,stats,video ",
    //   });
    //   const userGroup = await bridge.send("VKWebAppCallAPIMethod", {
    //     method: "groups.get",
    //     request_id: "getGroups",
    //     params: {
    //       // filter: "admin",
    //       extended: "1",
    //       fields: "is_admin",
    //       v: "5.131",
    //       access_token: token.access_token,
    //     },
    //   });
    //   setGroups(userGroup.response.items);
    // }
    // fetchUser();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id="home"
                  go={go}
                  onChange={handleSumChange}
                  rngValue={rngValue}
                />
                <Offers id="offers" go={go} rngValue={rngValue} />
                <Comments id="comments" go={go}>
                  <Rating />
                </Comments>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
