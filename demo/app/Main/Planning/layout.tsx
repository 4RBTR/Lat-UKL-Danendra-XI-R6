import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "../menuList"

export const metadata = {
    title: 'Planning',
    description: 'Planning',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Planning"
            id="Planning" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout