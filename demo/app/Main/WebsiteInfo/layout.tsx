import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "@/app/Main/menuList"

export const metadata = {
    title: 'Website Info',
    description: 'Website Info',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Website Info"
            id="WebsiteInfo" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout