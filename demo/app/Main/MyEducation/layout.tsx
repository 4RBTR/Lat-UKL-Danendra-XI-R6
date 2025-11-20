import TravelTemplate from "@/Component/travelTemplate"
import MenuList from "../menuList"

export const metadata = {
    title: 'MyEducation',
    description: 'My Education',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <><TravelTemplate
            title="My Education"
            id="MyEducation" // ID harus sesuai dengan ID di menuList.tsx
            menuList={MenuList}
        >
            {children}
        </TravelTemplate>
        </>
    )
}

export default RootLayout