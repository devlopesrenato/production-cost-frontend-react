type RouteChildren = {
    path: string;
    element: JSX.Element;
}

type RouterType = {
    path: string;
    element: JSX.Element;
    isPrivate?: boolean;
    children?: RouteChildren[];
}