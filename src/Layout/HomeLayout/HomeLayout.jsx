import React from "react";
import TabGroup from "../../components/Organisams/TabGroup/TabGroup";
import { Outlet } from "react-router-dom";
import { OutletStyle } from "./HomeLayout.styled";
import { TabWrapper } from "../RootLayout/Layout.styled";

const HomeLayout = () => {
  return (
    <>
      <TabWrapper>
        <TabGroup types={["Resources", "Requests", "Users"]} />
      </TabWrapper>
      <OutletStyle>
        <Outlet />
      </OutletStyle>
    </>
  );
};

export default HomeLayout;
