export const pageNames = {
    "": "Home",
    "home": "Home",
    "registers": "Registers",
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