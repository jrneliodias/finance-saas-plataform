import HeaderLogo from "@/components/header-logo"
import Navigation from "@/components/navigation"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import WelcomeMsg from "./welcome-msg"


const Header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-700  to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="mx-auto max-w-7xl">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex w-full items-center justify-between  lg:gap-x-16">

                        <HeaderLogo />
                        <Navigation />
                        <ClerkLoaded>
                            <UserButton afterSignOutUrl="/" />
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </ClerkLoading>
                    </div>
                </div>
            </div>
            <WelcomeMsg />

        </header>
    )
}

export default Header