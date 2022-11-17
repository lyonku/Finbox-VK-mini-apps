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
import Membership from "./panels/Membership";

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [rngValue, setRngValue] = useState([50000]);
  const [user, setUser] = useState([]);
  const [group, setGroup] = useState();
  const [checkUser, setCheckUser] = useState(false);
  const [trueUser, setTrueUser] = useState();
  const [activeOrganization, setActiveOrganization] = useState();
  const [adminsGroup, setAdminsGroup] = useState([]);
  let comments = [];
  const members = [139111941, 217184645, 129542706, 55652521, 42172377];

  const handleSumChange = (rngValue) => {
    setRngValue(+rngValue);
  };

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });

    async function fetchUser() {
      const user = await bridge.send("VKWebAppGetUserInfo").then((data) => {
        if (data.id) {
          setUser(data);
        }
      });
    }
    fetchUser();

    async function fetchGroupInfo() {
      const group = await bridge
        .send("VKWebAppGetGroupInfo", {
          group_id: +activeOrganization,
        })
        .then((data) => {
          if (data.id) {
            setGroup(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchGroupInfo();

    if (checkUser) {
      async function fetchUser() {
        const token = await bridge.send("VKWebAppGetAuthToken", {
          app_id: 51435408,
          scope: "groups",
        });
        const userGroup = await bridge.send("VKWebAppCallAPIMethod", {
          method: "groups.get",
          request_id: "getGroups",
          params: {
            filter: "admin",
            extended: "1",
            fields: "is_admin",
            v: "5.131",
            access_token: token.access_token,
          },
        });
        let adminsGroups = [];

        for (let i = 0; i < userGroup.response.items.length; i++) {
          for (let j = 0; j < members.length; j++) {
            if (userGroup.response.items[i].id == members[j]) {
              adminsGroups.push(userGroup.response.items[i]);
            }
          }
        }
        if (adminsGroups.length >= 1) {
          setTrueUser(true);
          setAdminsGroup(adminsGroups);
        } else {
          setTrueUser(false);
        }
      }
      fetchUser();
    }
  }, [activeOrganization, checkUser]);

  const go = (e) => {
    if (e.target.id) {
      setActiveOrganization(e.target.id);
    }
    setActivePanel(e.currentTarget.dataset.to);
  };

  // const messageRef = firestore.collection("messages");
  // const query = messageRef.orderBy("createdBy").limit(25);
  // const [messages] = useCollectionData(query);
  // console.log(query);

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
                <Comments
                  id="comments"
                  go={go}
                  comments={comments}
                  user={user}
                  group={group}
                />
                <Membership
                  id="membership"
                  go={go}
                  setCheckUser={setCheckUser}
                  trueUser={trueUser}
                  adminsGroup={adminsGroup}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
