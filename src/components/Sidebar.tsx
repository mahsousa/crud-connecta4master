"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiUserSmileLine } from "react-icons/ri";
import { FaChessBoard } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GoGear } from "react-icons/go";

import "./../app/globals.css";


interface SubItem {
  name: string;
  href: string | undefined;
}

interface SidebarItem {
  name: string;
  icon: JSX.Element;
  subItems?: SubItem[];
  href?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: "ITEMS DA LOJA",
    icon: <RiUserSmileLine />,
    subItems: [
      {
        name: "CADASTRAR",
        href: "/cadastrar-produtos",
      },
      {
        name: "CONSULTAR",
        href: "/listar-produtos",
      },
    ],
  },
  {
    name: "MOEDAS DA LOJA",
    icon: <FaChessBoard />,
    subItems: [
      {
        name: "CADASTRAR",
        href: "/cadastrar-moedas",
      },
      {
        name: "CONSULTAR",
        href: "/listar-moedas",
      },
    ],
  },
  {
    name: "CATEGORIAS",
    icon: <RiUserSmileLine />,
    subItems: [
      {
        name: "CADASTRAR",
        href: "/cadastrar-categoria",
      },
      {
        name: "CONSULTAR",
        href: "/listar-categoria",
      },
    ],
  },
  {
    name: "CONFIGURAÇÕES DA PARTIDA",
    icon: <GoGear/>,
    href: "/configuracoes-partida",
  },
  {
    name: "SAIR",
    icon: <FaArrowLeft />,
    href: "/logout",
  },
  
];

export default function Sidebar() {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(
    false
  );
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const toggleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (isCollapsedSidebar) {
      setActiveSubMenu(null);
    }
  }, [isCollapsedSidebar]);

  const toggleSubMenuHandler = (name: string) => {
    if (isCollapsedSidebar) {
      setIsCollapsedSidebar(false);
    }
    setActiveSubMenu((prev) => (prev === name ? null : name));
  };


  return (
    <div className="sidebar-wrapper min-h-screen">
      <button className="btn" onClick={toggleSidebarCollapseHandler}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <aside className="sidebar rounded-r-lg" data-collapse={isCollapsedSidebar}>
        <div className="sidebar-top">
          <Image
            src="/logo.png"
            alt="Vercel Logo"
            width={60}
            height={60}
            priority
          />
          <p className="sidebar-logo-name">Connect4Master</p>
        </div>
        <ul className="sidebar-list">
          {sidebarItems.map(({ name, href, icon, subItems }) => (
            <li className="sidebar-item" key={name}>
              {name !== "SAIR" && (subItems && subItems.length > 0) ? (
                <div>
                  <button
                    className="sidebar-link"
                    onClick={() => toggleSubMenuHandler(name)}
                  >
                    <span className="sidebar-icon">{icon}</span>
                    <span className="sidebar-name">{name}</span>
                  </button>
                  {(activeSubMenu === name || href) && (
                    <ul className="sidebar-sublist">
                      {(subItems || []).map((subItem) => (
                        <li key={subItem.name} className="sidebar-subitem">
                          <Link href={subItem.href || ""} className="sidebar-link">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                      {href && (
                        <li className="sidebar-subitem">
                          <Link href={href} className="sidebar-link">
                            {name}
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ) : (
                <Link href={href || ""} className="sidebar-link">
                  <span className="sidebar-icon">{icon}</span>
                  <span className="sidebar-name">{name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
