import React, { useState, useEffect, useContext } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  Panel,
  Group,
  CellButton,
  PanelHeader,
  Placeholder,
  Div,
  Platform,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Offers from "./panels/Offers";
import Comments from "./panels/Comments";
import Membership from "./panels/Membership";

import cardLogoZaimer from "img/zaimer.png";
import cardLogoMoneyMan from "img/moneyman.jpg";
import cardLogoWebBankir from "img/webbankir-logo.jpg";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from ".";

const App = () => {
  // const [activePanel, setActivePanel] = useState("home");

  const [rngValue, setRngValue] = useState([50000]);
  const [user, setUser] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [activeOrganization, setActiveOrganization] = useState();

  const [adminInfo, setAdminInfo] = useState({ userRights: false });

  const { firestore } = useContext(Context);

  const groupsReviews = [];
  const groups = [
    {
      id: 129542706,
      imgSrc: cardLogoZaimer,
      actionSrc: "https://www.zaymer.ru/",
    },
    {
      id: 55652521,
      imgSrc: cardLogoMoneyMan,
      actionSrc: "https://moneyman.ru/",
    },
    {
      id: 42172377,
      imgSrc: cardLogoWebBankir,
      actionSrc: "https://webbankir.com/",
    },
    {
      id: 139111941,
      imgSrc: "",
      actionSrc: "",
    },
  ];

  // Price change function
  const handleSumChange = (rngValue) => {
    setRngValue(+rngValue);
  };

  // Initialization of all reviews, for further processing
  const initReviews = async () => {
    for (let i = 0; i < groups.length; i++) {
      groupsReviews.push(
        useCollectionData(firestore.collection(groups[i].id + ""))
      );
    }
  };
  initReviews();

  // Adding fields to groups, average rating and total number of reviews
  const createRate = async () => {
    for (let i = 0; i < groupsReviews?.length; i++) {
      let summ = 0;
      groups[i].reviewsCount = groupsReviews[i][0]?.length;
      for (let j = 0; j < groupsReviews[i][0]?.length; j++) {
        summ += groupsReviews[i][0][j]?.rating;
        if (j == groupsReviews[i]?.length - 1) {
          groups[i].averageRating = (summ / groupsReviews[i]?.length).toFixed(
            1
          );
        }
      }
    }
  };
  createRate();

  const [history, setHistory] = useState(["main"]);
  const activePanel = history[history.length - 1];
  const isFirst = history.length === 1;

  useEffect(() => {
    bridge
      .send("VKWebAppSetSwipeSettings", {
        history: isFirst,
      })
      .then((data) => {
        if (data.result) {
          // Настройка применилась
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }, [isFirst]);

  // User initialization
  useEffect(() => {
    async function fetchUser() {
      const user = await bridge.send("VKWebAppGetUserInfo").then((data) => {
        if (data.id) {
          setUser(data);
        }
      });
    }
    fetchUser();
  }, []);

  // Finding group admin rights for a user
  useEffect(() => {
    if (adminInfo.userRights) {
      async function fetchGroup() {
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
          for (let j = 0; j < groups.length; j++) {
            if (userGroup.response.items[i].id == groups[j].id) {
              adminsGroups.push(userGroup.response.items[i]);
            }
          }
        }
        if (adminsGroups.length >= 1) {
          setAdminInfo({
            ...adminInfo,
            trueUser: true,
            adminsGroups: adminsGroups,
          });
        } else {
          setAdminInfo({ ...adminInfo, trueUser: false });
        }
      }
      fetchGroup();
    }
  }, [adminInfo.userRights]);

  // Group initialization
  useEffect(() => {
    async function fetchGroupInfo() {
      const groups = await bridge
        .send("VKWebAppGetGroupInfo", {
          group_id: +activeOrganization,
        })
        .then((data) => {
          if (data.id) {
            setCurrentGroup(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (activeOrganization) {
      fetchGroupInfo();
    }
  }, [activeOrganization]);

  // Page navigation function
  // const go = (e) => {
  //   if (e.target.id) {
  //     setActiveOrganization(e.target.id);
  //   }

  //   if (e.currentTarget.dataset.page === "comments") {
  //     setActiveOrganization(null);
  //     setCurrentGroup(null);
  //   }
  //   if (e.currentTarget.dataset.page === "membership") {
  //     setActiveOrganization(adminInfo?.chosenGroup.id);
  //   }
  //   setActivePanel(e.currentTarget.dataset.to);
  // };

  const goBack = () => setHistory(history.slice(0, -1));
  const go = (panel) => {
    setHistory([...history, panel]);
  };

  return (
    <ConfigProvider isWebView={true}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View
                activePanel={activePanel}
                history={history}
                onSwipeBack={goBack}
              >
                <Panel id="main">
                  <PanelHeader>Main</PanelHeader>
                  <Group>
                    <div style={{ height: 200 }} />
                    <CellButton onClick={() => go("profile")}>
                      profile
                    </CellButton>
                    <div style={{ height: 600 }} />
                  </Group>
                </Panel>
                <Panel id="profile">
                  <PanelHeader>Профиль</PanelHeader>
                  <Group>
                    <Placeholder>
                      Теперь свайпните от левого края направо, чтобы вернуться
                    </Placeholder>
                    <Div
                      style={{ height: 50, background: "#eee" }}
                      data-vkui-swipe-back={false}
                    >
                      Здесь свайпбек отключен
                    </Div>
                  </Group>
                </Panel>
                <Home
                  id="home"
                  go={go}
                  onChange={handleSumChange}
                  rngValue={rngValue}
                />
                <Offers
                  id="offers"
                  go={go}
                  rngValue={rngValue}
                  groups={groups}
                />
                <Comments
                  id="comments"
                  go={go}
                  user={user}
                  currentGroup={currentGroup}
                  groups={groups}
                  setActiveOrganization={setActiveOrganization}
                  chosenGroup={adminInfo?.chosenGroup}
                />
                <Membership
                  id="membership"
                  go={go}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
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
