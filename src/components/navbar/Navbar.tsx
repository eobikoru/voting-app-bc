import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  DownOutlined,
  HomeOutlined,
  UserAddOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

const Navbar = () => {
  const account = useAccount();

  const menu = (
    <Menu className="p-2">
      <Menu.Item
        key="1"
        icon={<HomeOutlined />}
        className="px-9 py-4 hover:bg-gray-100 rounded-md"
      >
        <Link href="/" passHref>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserAddOutlined />}
        className="px-9 py-4 w-60 h-10 hover:bg-gray-100 rounded-md"
      >
        <Link href="/register-voter" passHref>
          Register a Voter
        </Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<FileAddOutlined />}
        className="px-9 py-4 hover:bg-gray-100 rounded-md"
      >
        <Link href="/create-proposal" passHref>
          Create Proposal
        </Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<UnorderedListOutlined />}
        className="px-9 w-30 py-4 hover:bg-gray-100 rounded-md"
      >
        <Link href="/proposals" passHref>
          List of Proposals
        </Link>
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={<TeamOutlined />}
        className="px-9 py-4 hover:bg-gray-100 rounded-md"
      >
        <Link href="/voters" passHref>
          List of Voters
        </Link>
      </Menu.Item>
      <Menu.Item
        key="6"
        icon={<TrophyOutlined />}
        className="px-9 py-4 hover:bg-gray-100 rounded-md"
      >
        <Link href="/winner" passHref>
          View Winner
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="font-raleway">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-[6rem] px-6 py-2 bg-gradient-to-r from-gray-900 to-black shadow-lg">
        <Link
          href="/"
          className="text-3xl font-bold text-white hover:text-indigo-400 transition-colors duration-300 ml-5 dark:text-gray-200"
        >
          Chain Masters
        </Link>
        {account.address && (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
            <Button className="flex items-center gap-x-2 text-sm font-bold text-black bg-white rounded-xl px-6 py-5 shadow-md hover:bg-gray-200 transition-all duration-300">
              Features <DownOutlined />
            </Button>
          </Dropdown>
        )}
        <ConnectButton />
      </nav>
    </section>
  );
};

export default Navbar;
