import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "../menuList"

export const metadata = {
    title: 'My Profile ',
    description: 'Profile Saya',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="My Profile"
            id="My Profile" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout