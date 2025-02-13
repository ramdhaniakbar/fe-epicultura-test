import { Tally3 } from "lucide-react"

export default function Navbar({
  openNav,
  onOpenSideNav,
  isMobile,
}) {
  return (
    <div className={`sticky flex justify-end top-0 z-40 bg-[#101212] py-3`}>
      <div
        className={`bg-[#FFFFFF] flex flex-col xl:hidden px-[10px] py-[12px] md:px-3 md:py-[14px] sm:me-3 justify-center items-center border rounded-full flex-shrink-0 cursor-pointer w-fit`}
        onClick={onOpenSideNav}
      >
        iMeeting
      </div>
    </div>
  )
}
