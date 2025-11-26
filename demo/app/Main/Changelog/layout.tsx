import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "@/app/Main/menuList"

export const metadata = {
    title: 'Changelog',
    description: 'Changelog',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Changelog"
            id="Changelog" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout