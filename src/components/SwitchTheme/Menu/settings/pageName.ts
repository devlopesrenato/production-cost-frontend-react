export const pageNames = {
    "": "Home",
    "home": "Home",
    "logout": "Sair",
}

export default function (key: keyof typeof pageNames) {
    return pageNames[key] || key;
}