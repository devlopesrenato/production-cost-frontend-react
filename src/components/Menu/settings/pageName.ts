export const pageNames = {
    "": "Home",
    "home": "Home",
    "registers": "Registers",
    "registers/categories": "Categories",
    "registers/custom-measurements": "Custom Measurements",
    "registers/feedstocks": "Feedstocks",
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