import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface NavButtonProps {

    href: string
    label: string
    isActive?: boolean

}
const NavButton = ({ href, label, isActive }: NavButtonProps) => {
    return (
        <Button className={cn(
            "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white transition focus:bg-white/20",
            isActive ? "bg-white/10 text-white " : "bg-transparent text-slate-400"
        )}
            asChild>
            <Link href={href} className="rounded-md px-3 py-1.5 text-sm font-medium">
                {label}
            </Link>
        </Button>
    )
}

export default NavButton