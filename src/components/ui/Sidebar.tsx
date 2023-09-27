"use client";
import { useState } from "react";

import { Layout, Menu } from "antd";
import { sidebarItems } from "@/app/constants/sidebarItems";
import { USER_ROLE } from "@/app/constants/role";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const role = USER_ROLE.SUPER_ADMIN;
  const role = USER_ROLE.ADMIN;
  // const role = USER_ROLE.FACULTY;
  // const role = USER_ROLE.STUDENT;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        ph hero
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
