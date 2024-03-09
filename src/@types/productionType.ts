type ProductionType = {
    uuid: string;
    name: string;
    price: number;
    quantity: number;
    categoryId: string;
    category: string;
    createById: string;
    createBy: string;
    createDate: string;
    modifyById: string;
    modifyBy: string;
    modifyDate: string;
    cost: number;
    profit: number;
    percent: number;
    feedstocksUsed: FeedstocksUsed[];
    otherCostsUsed: OtherCostsUsed[];
}

type FeedstocksUsed = {
    uuid: string;
    feedstockId: string;
    feedstock: string;
    customMeasurementId: string;
    measurement: string;
    price: number;
    quantity: number;
    productionId: string;
}

type OtherCostsUsed = {
    uuid: string;
    name: string;
    quantity: number;
    price: number;
    active: true;
    type: string;
    createBy: string;
    createDate: string;
    modifyBy: string;
    modifyDate: string;
    used: string;
}