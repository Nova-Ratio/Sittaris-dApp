import Header from "@/components/header";
import { LogoTextIcon } from "@/components/icons/logo";
import Sidebar from "@/components/sidebar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
  title,
  bgStatus = true,
}: {
  children: React.ReactNode;
  title: string;
  bgStatus?: boolean;
}) {
  const titleRender = `${title} | Sittaris dApp`;
  return (
    <>
      <Head>
        <title>{titleRender}</title>
      </Head>
      <main
        className={`flex min-h-[100dvh] h-full w-full flex-col items-center justify-end  relative   dark:text-white text-black pt-28 ${""} font-satoshi max-w-[100vw] 2xl:max-w-[1920px]  mx-auto`}
      >
        <Header />
        <div className="flex w-full min-h-[80vh] z-10 ">
          <Sidebar />
          <div className="px-3 py-3 md:py-4 md:px-6 w-full flex flex-col gap-6">
            {children}
          </div>
        </div>
        <footer className="w-full  flex flex-col items-start gap-6 justify-center z-20 pb-6 px-6">
          <Link href="/" className="shrink-0 flex flex-col items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={60}
              className="mr-4 h-24 w-fit dark:text-white text-black"
            />
            <LogoTextIcon className="h-4 w-fit" />
          </Link>
          <div className="grid grid-cols-3 w-full px-6">
            {footerData.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                <h3>{item.title}</h3>
                <div className="flex gap-2 flex-col ">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={child.link}
                      target="_blank"
                      rel="noreferrer" 
                      className="hover:text-sittaris-800 transition-colors w-fit"
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}

const footerData = [
  {
    id: 1,
    title: "Product",
    children: [
      {
        id: 1,
        title: "FAQ",
        link: "/faq",
      },
      {
        id: 2,
        title: "Whitepaper",
        link: "/whitepaper",
      },
      {
        id: 3,
        title: "Brand Identity",
        link: "/brand-identity",
      },
    ],
  },
  {
    id: 2,
    title: "Social",
    children: [
      {
        id: 1,
        title: "X",
        link: "https://twitter.com/sittaris",
      },
      {
        id: 2,
        title: "Telegram",
        link: "https://t.me/sittaris",
      },
      {
        id: 3,
        title: "Linkedin",
        link: "https://www.linkedin.com/company/sittaris",
      },
      {
        id: 4,
        title: "Discord",
        link: "https://discord.com/sittaris",
      },
      {
        id: 5,
        title: "Instagram",
        link: "https://instagram.com/sittaris",
      },
      {
        id: 6,
        title: "Medium",
        link: "https://medium.com/sittaris",
      },
    ],
  },
  {
    id: 3,
    title: "Contact",
    children: [
      {
        id: 1,
        title: "company@mail.com",
        link: "mailto:company@mail.com",
      },
    ],
  },
];
