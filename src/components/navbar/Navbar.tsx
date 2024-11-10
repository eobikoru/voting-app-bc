import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined, HomeOutlined, UserAddOutlined, FileAddOutlined, UnorderedListOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

const Navbar = () => {
  const account = useAccount();

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link href="/" passHref>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserAddOutlined />}>
        <Link href="/register-voter" passHref>
          Register a Voter
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FileAddOutlined />}>
        <Link href="/create-proposal" passHref>
          Create Proposal
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<UnorderedListOutlined />}>
        <Link href="/proposals" passHref>
          List of Proposals
        </Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<TeamOutlined />}>
        <Link href="/voters" passHref>
          List of Voters
        </Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<TrophyOutlined />}>
        <Link href="/winner" passHref>
          View Winner
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="font-raleway">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between h-[6rem] items-center py-2 px-4 bg-black">
        <Link
          href="/"
          className="text-3xl font-bold text-white hover:text-gray-800 focus:outline-none ml-5 dark:text-gray-200"
        >
          Chain Masters
        </Link>
        {account.address && (
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
            <Button className="flex items-center gap-x-2 text-sm font-bold text-black bg-white rounded-xl px-4 py-4 hover:bg-gray-100">
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
