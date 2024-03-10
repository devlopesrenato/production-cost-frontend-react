
type OtherCostType = {
    uuid: string;
    name: string;
    quantity: number;
    price: number;
    active: boolean;
    type: "manual" | "distributed";
    createById: string;
    createBy: string;
    createDate: string;
    modifyById: string;
    modifyBy: string;
    modifyDate: string;
}