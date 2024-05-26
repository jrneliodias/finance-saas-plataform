import Image from "next/image"
import Link from "next/link"

const
    HeaderLogo = () => {
        return (
            <Link href={"/"} className="hidden lg:flex items-center">
                <div className="flex items-center">
                    <Image src="/logoipsum-226.svg" alt="login" width={30} height={30} />
                    <h3 className="font-semibold text-white text-2xl ml-2.5">Cloud Cash</h3>
                </div>
            </Link>
        )
    }

export default
    HeaderLogo