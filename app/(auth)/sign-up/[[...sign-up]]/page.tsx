import { SignUp } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
export default function Page() {
    return <div className=" min-h-screen grid grid-cols-1 lg:grid-cols-2">

        <div className="h-full bg-slate-900  flex flex-col items-center justify-center px-4">
            <ClerkLoaded>
                <SignUp path="/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
                <Loader2 className="w-6 h-6 animate-spin" />
            </ClerkLoading>
        </div>

        <div className="h-full bg-slate-600 hidden lg:flex items-center justify-center">
            <Image src="/logoipsum-226.svg" alt="login" width={500} height={500} />
        </div>
    </div>;
}