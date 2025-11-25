import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "../menuList"

export const metadata = {
    title: 'Contact',
    description: 'Contact page for getting in touch',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Contact"
            id="Contact" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout