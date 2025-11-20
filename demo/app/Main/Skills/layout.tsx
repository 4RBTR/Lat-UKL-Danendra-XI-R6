import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "@/app/Main/menuList"

export const metadata = {
    title: 'Skills',
    description: 'Skills',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Skills"
            id="Skills" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout