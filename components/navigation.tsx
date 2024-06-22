'use client'

import { usePathname, useRouter } from "next/navigation"
import NavButton from "./nav-button"
import { useMedia } from "react-use"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"



const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
]

const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const isMobile = useMedia(
        "(max-width: 1024px)",
        false)

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant={'outline'}
                        size={'icon'}
                        onClick={() => setIsOpen(!isOpen)}
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white transition focus:bg-white/20"
                    >
                        <MenuIcon className="size-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent side='left' className="px-2 py-20">
                    <nav className="flex flex-col gap-y-2 pt-6">

                        {routes.map(({ href, label }) => (
                            <Button
                                key={href}
                                className="justify-start"
                                variant={pathname === href ? 'secondary' : 'outline'}
                                onClick={() => onClick(href)}
                            >
                                {label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">

            {routes.map(({ href, label }) => (
                <NavButton
                    key={href}
                    href={href}
                    label={label}
                    isActive={pathname === href}
                />

            ))}
        </nav>
    )
}

export default Navigation