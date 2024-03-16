import React, { useState } from "react";
import { STabs, STabsArea, STabsAreaList, SButton } from './styled'

interface TabsProps {
    defaultActiveKey?: string
    items?: {
        label: string;
        key: string | number;
        children: React.ReactNode
    }[]
}
const Tabs: React.FC<TabsProps> = ({ defaultActiveKey, items = [] }) => {
    const indexDefault = items.findIndex(({ key }) => key === defaultActiveKey)
    const [active, setActive] = useState(indexDefault !== -1 ? indexDefault : 0)

    return (
        <STabs>
            <STabsArea>
                <STabsAreaList>
                    {
                        items.map(({ label, key }, index) =>
                            <SButton active={String(active === index)}
                                key={key}
                                onClick={() => setActive(index)}
                            >
                                {label}
                            </SButton>
                        )
                    }
                </STabsAreaList>
            </STabsArea>
            {items?.length ? items[active].children : <></>}
        </STabs>
    )
}

export default Tabs;