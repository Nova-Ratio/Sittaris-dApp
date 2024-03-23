import Swal from "sweetalert2";
import Chains from "@/data/chain.json"
export const ToastError = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    container: "items-center !w-full md:!w-1/3  pt-20",
    title:
      "!text-xs md:!text-sm font-medium shrink-0 !flex items-center justify-start font-sans",
    htmlContainer: "!h-16 items-center flex",
    popup:
      "alertCustom  !border-orange-600 ",
    timerProgressBar: "!bg-red-500",
  },
  icon: "error",

  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const ToastSuccess = ({ tHashLink }: { tHashLink?: string }) =>
  Swal.mixin({
    toast: true,
    position: "top-end",
    iconHtml: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6585 6.24744C20.0742 6.61112 20.1163 7.24288 19.7526 7.65852L11.0026 17.6585C10.6403 18.0726 10.0114 18.1162 9.59546 17.756L4.34546 13.2106C3.92792 12.8491 3.8825 12.2175 4.244 11.8C4.6055 11.3825 5.23704 11.337 5.65457 11.6985L10.1525 15.5929L18.2474 6.34151C18.6111 5.92587 19.2429 5.88375 19.6585 6.24744Z" fill="white"/>
    </svg>
    `,
    customClass: {
      container: "items-center !w-full md:!w-1/3 pt-20",
      title:
        `!text-xs ${tHashLink &&'!m-0'} md:!text-sm font-medium shrink-0 !flex items-center justify-start font-sans`,
      htmlContainer: "items-center flex !m-0",
      popup:
        "alertCustom !border-green-600 ",
      timerProgressBar: "!bg-green-800",
      icon: "border-0",
    },
    html: tHashLink
      ? `
  <a href="https://testnet.bscscan.com/tx/${tHashLink}" class="flex gap-2 items-center text-xs justify-end" target="_blank" rel="noopener">
  View explorer
  <svg
	width="9"
	height="9"
	viewBox="0 0 9 9"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
  >
	<path
	  fillRule="evenodd"
	  clipRule="evenodd"
	  d="M2.75 1.5C2.75 1.08579 3.08579 0.75 3.5 0.75H8C8.41421 0.75 8.75 1.08579 8.75 1.5V6C8.75 6.41421 8.41421 6.75 8 6.75C7.58579 6.75 7.25 6.41421 7.25 6V2.25H3.5C3.08579 2.25 2.75 1.91421 2.75 1.5Z"
	  fill="white"
	/>
	<path
	  fillRule="evenodd"
	  clipRule="evenodd"
	  d="M8.53033 0.96967C8.82322 1.26256 8.82322 1.73744 8.53033 2.03033L1.78033 8.78033C1.48744 9.07322 1.01256 9.07322 0.71967 8.78033C0.426777 8.48744 0.426777 8.01256 0.71967 7.71967L7.46967 0.96967C7.76256 0.676777 8.23744 0.676777 8.53033 0.96967Z"
	  fill="white"
	/>
  </svg>
</a>
  `: "",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  customClass: {
    container: "items-center !w-full md:!w-1/3 ",
    title: "!text-xs md:!text-sm font-medium !flex items-center justify-start",
    htmlContainer: "items-center !h-16",
    popup:
      "!h-fit !p-0 !pl-3 items-center flex items-center !w-fit !border-red-500 !border-2 rounded-lg bg-white !border-solid",
  },

  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
