export const pageNames = {
    "": "Home",
    "home": "Home",
    "registers": "Registers",
    "productions": "Productions",
    "registers/categories": "Categories",
    "registers/custom-measurements": "Custom Measurements",
    "registers/feedstocks": "Feedstocks",
    "registers/other-costs": "Other Costs",
}

export const systemPageNames = {
    "logout": "Logout",
    "version": ""
}

export const getSystemPageNames = (key: keyof typeof systemPageNames) => {
    return systemPageNames[key] || key;
}

export default function (key: keyof typeof pageNames) {
    return pageNames[key] || "";
}