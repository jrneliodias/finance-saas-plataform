import Header from '@/components/header'



type DashboarLayoutProps = {
    children: React.ReactNode
}
const DashboarLayout = ({ children }: DashboarLayoutProps) => {
    return (
        <>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}

export default DashboarLayout