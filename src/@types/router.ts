type RouterType = {
    path: string;
    element: JSX.Element;
    isPrivate?: boolean;
    children?: RouterType[];
}