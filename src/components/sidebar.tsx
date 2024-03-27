import Link from "next/link";
import { DropdowIcon, LogOutIcon, MoonIcon, SunIcon } from "@/components/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useAppDispatch, useAppSelector } from "@/hook/redux/hooks";
import { darkModeTogle, selectData, toggleMenu } from "@/redux/auth/auth";
import { Zones } from "@/data/zones";
import Modal from "./tailwind/Modal";
import useMetamask from "@/hook/useMetamask";
import useDisconnect from "@/hook/useDisconnect";
export default function Sidebar({ show }: { show: boolean }) {
  const router = useRouter();
  const { currentMenu, darkMode, address, chainId } =
    useAppSelector(selectData);
  const dispatch = useAppDispatch();
  //console.log("address", address);
  const { disconnect } = useDisconnect();
  const [modal, setModal] = useState(false);
  const { connecWallet } = useMetamask({
    modal: modal,
    Close: () => setModal(false),
    address: address,
    chainId,
  });
  //console.log("connecWallet");

  const pathname = router.pathname;
  const { id } = router.query as { id: string };
  useEffect(() => {
    //dispatch(toggleMenu(localStorage.getItem("currentMenu") || ""));
    const local = localStorage.getItem("darkMode");
    if (local) {
      darkModeToggle(local === "true" ? true : false);
    }
  }, []);
  function darkModeToggle(status: boolean) {
    const html = document.querySelector("html");
    dispatch(darkModeTogle(status));
    localStorage.setItem("darkMode", status ? "true" : "false");
    if (status) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }

  const sidebar = [
    {
      id: 0,
      title: "Dashboard",
      icon: "",
      path: "/",
    },
    /* {
      id: 1,
      title: "Personal Information",
      icon: "",
      path: "/personel-info",
    }, */
    {
      id: 2,
      title: "Stake",
      icon: "",
      path: "/stake",
      children: /* Zones.map((zone, index) => ({
        id: index,
        title: zone.name,
        pathName: (index + 1).toString(),
      })) */ [],
    },
    {
      id: 3,
      title: "Leaderboard",
      icon: "",
      path: "/leaderboard",
    },
    {
      id: 4,
      title: "Buy SIT Token",
      icon: "",
      path: "/buy-sit",
    },
  ];
  //console.log(pathname);
  //console.log(currentMenu);
  const isCurrentMenu = (item: any) => {
    return (
      pathname === item.path ||
      (item?.children &&
        item?.children?.filter((item: any) => item.pathName === id).length > 0)
    );
  };
  return (
    <nav
      className={` ${
        show
          ? " absolute left-0 top-14 md:top-0 z-50 w-full  "
          : " hidden md:flex"
      } font-fontspring w-full bg-black/40 bgGradientLight  dark:bgGradient md:!bgClear  md:w-72 flex pt-12 border-r border-sittaris-300/10 px-3 md:px-4`}
    >
      {
        <ul className="flex flex-col items-center md:items-start gap-8  z-10 text-black/70 dark:text-white/70 h-[85vh] overflow-y-auto w-full pb-12 py-2">
          <li
            key={"connectwallet"}
            className=" flex items-center font-manrope gap-3 text-xs xl:text-sm dark:text-white"
          >
            {address ? (
              <>
                <img
                  src="/assets/img/metamask.svg"
                  alt="metamask"
                  className="w-4 h-4"
                />
                {address.slice(0, 6) + "..." + address.slice(-6)}
                <button onClick={disconnect} className="p-2">
                  <LogOutIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setModal(true)}
                className="flex justify-center items-center gap-0 hover:text-black transition-colors dark:hover:text-white border-4 w-full px-2 py-4 rounded-lg border-sittaris-800"
              >
                Connect Wallet
              </button>
            )}
          </li>
          <li className="md:hidden">
            <Link
              href="/public-sale"
              className={`flex items-center text-[10px] md:text-sm 2xl:text-base font-fontspringBold font-bold gap-3 pb-1 textStyle ${
                pathname === "/public-sale"
                  ? "   font-medium border-b-2 border-sittaris-300"
                  : " "
              } `}
            >
              <span>Public Sale</span>
            </Link>
          </li>
          {sidebar.map((item) => (
            <li key={item.id}>
              <div className="flex gap-0 items-center">
                <Link
                  onClick={() => {
                    dispatch(toggleMenu(item.title));
                  }}
                  className={`flex items-center border-b-2 border-transparent transition-colors font-normal gap-3 ${
                    isCurrentMenu(item)
                      ? " !border-sittaris-300 text-black dark:text-white  font-medium"
                      : " dark:hover:text-white hover:text-black hover:border-sittaris-300"
                  } `}
                  href={`/${item.path}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
                {item?.children && item?.children.length > 0 && (
                  <button
                    onClick={() => dispatch(toggleMenu(item?.title))}
                    className="flex h-full w-6 items-center justify-end"
                  >
                    <DropdowIcon
                      className={`${
                        currentMenu === item.title
                          ? "transform rotate-180"
                          : "transform rotate-0"
                      } transition-all w-4 h-fit`}
                    />
                  </button>
                )}
              </div>
              {item?.children && (
                <AnimateHeight height={currentMenu === item.title ? "auto" : 0}>
                  <ul className="flex md:list-disc flex-col w-full gap-2 pt-3 font-satoshi text-xs md:text-base ">
                    {item?.children &&
                      item?.children?.length > 0 &&
                      item?.children.map((child: any) => {
                        return (
                          <li key={child.id}>
                            <Link
                              href={`${item.path}/${child.pathName}`}
                              className={
                                id === `${child.id + 1}`
                                  ? "text-sittaris-700 font-medium"
                                  : "dark:text-white/60 text-black/60  hover:text-sittaris-700 dark:hover:text-sittaris-700"
                              }
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </AnimateHeight>
              )}
            </li>
          ))}
          <li>
            <button className="w-full darkmode">
              <input
                type="checkbox"
                id="darkmode-toggle"
                checked={darkMode}
                onChange={(e) => darkModeToggle(e.target.checked)}
              />
              {
                //Todo: darkmode responsive en son yapılacak
              }
              <label htmlFor="darkmode-toggle">
                <MoonIcon />
                <SunIcon />
              </label>
            </button>
          </li>
        </ul>
      }
      <ConnectionModal
        setModal={setModal}
        connecWallet={connecWallet}
        modal={modal}
      />
    </nav>
  );
}

const ConnectionModal = ({
  setModal,
  modal,
  connecWallet,
}: {
  setModal: (modal: boolean) => void;
  modal: boolean;
  connecWallet: () => void;
}) => {
  return (
    <Modal title="" setModal={setModal} modal={modal}>
      <div className="flex  gap-4 w-[60vw] h-[60vh] dark:text-white">
        <div className="flex w-1/4 h-full flex-col justify-start items-start border-r border-black/20 dark:border-white/20  px-6 gap-6">
          <h4>Wallets</h4>
          <button
            onClick={connecWallet}
            className="flex w-full  justify-center items-center gap-2"
          >
            <img
              src="/assets/img/metamask.svg"
              alt="metamask"
              className="w-6 h-6"
            />
            <span>Metamask</span>
          </button>
        </div>
        <div className=" w-full text-justify flex flex-col text-xs md:text-sm 2xl:text-base justify-center items-center gap-10 py-10 px-32  ">
          <h3 className="font-medium">How do I connect my wallet?</h3>
          <img
            src="/assets/img/metamask.svg"
            alt="metamask"
            className="w-8 h-8"
          />
          <p className="text-black/60 dark:text-white/60 ">
            If you want to connect to your wallet through your browser, you can
            select the "Metamask" option from the menu on the left and connect
            to your wallet using the browser extension.
          </p>
          <p className="text-black/60 dark:text-white/60 ">
            If you want to connect to your mobile wallet, you can select
            "Metamask Mobile" from the menu on the left and follow the
            instructions on the screen.
          </p>
        </div>
      </div>
    </Modal>
  );
};
