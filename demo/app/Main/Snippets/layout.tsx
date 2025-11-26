import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "@/app/Main/menuList"

export const metadata = {
    title: 'Snippets',
    description: 'Snippets',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="Snippets"
            id="Snippets" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout