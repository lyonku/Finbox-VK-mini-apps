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
  const [rngValue, setRngValue] = useState([50000]);
  const [user, setUser] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [activeOrganization, setActiveOrganization] = useState();

  const [activePanel, setActivePanel] = useState("home"); // Ставим начальную панель
  const [history, setHistory] = useState(["home"]); // Заносим начальную панель в массив историй.

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

  const goBack = () => {
    if (history.length === 1) {
      // Если в массиве одно значение:
      bridge.send("VKWebAppClose", { status: "success" }); // Отправляем bridge на закрытие сервиса.
    } else if (history.length > 1) {
      if (history[history.length - 1] === "comments") {
        setActiveOrganization(null);
        setCurrentGroup(null);
      }
      // Если в массиве больше одного значения:
      history.pop(); // удаляем последний элемент в массиве.
      setActivePanel(history[history.length - 1]); // Изменяем массив с иторией и меняем активную панель.
    }
  };

  function goToPage(name, group) {
    if (history.length > 1 && history[history.length - 1] == "membership") {
      setActiveOrganization(adminInfo?.chosenGroup.id);
    }
    if (group) {
      setActiveOrganization(group?.id);
    }
    // В качестве аргумента принимаем id панели для перехода
    window.history.pushState({ panel: name }, name); // Создаём новую запись в истории браузера
    setActivePanel(name); // Меняем активную панель
    history.push(name); // Добавляем панель в историю
  }

  useEffect(() => {
    window.addEventListener("popstate", () => goBack());
  }, []);

  return (
    <ConfigProvider isWebView>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View
                activePanel={activePanel}
                history={history}
                onSwipeBack={goBack}
              >
                <Home
                  id="home"
                  goToPage={goToPage}
                  onChange={handleSumChange}
                  rngValue={rngValue}
                />
                <Offers
                  id="offers"
                  goToPage={goToPage}
                  rngValue={rngValue}
                  groups={groups}
                />
                <Comments
                  id="comments"
                  goToPage={goToPage}
                  user={user}
                  currentGroup={currentGroup}
                  groups={groups}
                  setActiveOrganization={setActiveOrganization}
                  chosenGroup={adminInfo?.chosenGroup}
                />
                <Membership
                  id="membership"
                  goToPage={goToPage}
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
