export function statusMarginColor(params: {
    value: number | string;
    margin: number | string;
}) {
    const { value, margin } = params;
    if (Number(value) >= Number(margin)) {
        return "#52BE80";
    } else if (Number(value) >= Number(margin) - 10) {
        return "#D4AC0D";
    } else {
        return "#E74C3C";
    }
}
