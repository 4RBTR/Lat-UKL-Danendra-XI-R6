import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "../menuList"

export const metadata = {
    title: 'Home',
    description: 'Halaman Utama',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Home"
            id="Home" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout