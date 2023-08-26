const bills = [
	{
		billNo: "BA001",
		date: "2023-08-26",
		totalAmount: 150.5,
		details: [
			{
				productName: "Product A",
				price: 50.0,
				quantity: 2,
				netPrice: 100.0,
			},
			{
				productName: "Product B",
				price: 30.0,
				quantity: 3,
				netPrice: 90.0,
			},
		],
	},
	{
		billNo: "BA002",
		date: "2023-08-27",
		totalAmount: 200.25,
		details: [
			{
				productName: "Product C",
				price: 70.0,
				quantity: 1,
				netPrice: 70.0,
			},
			{
				productName: "Product D",
				price: 40.25,
				quantity: 2,
				netPrice: 80.5,
			},
		],
	},
	{
		billNo: "BA003",
		date: "2023-08-28",
		totalAmount: 75.0,
		details: [
			{
				productName: "Product E",
				price: 25.0,
				quantity: 3,
				netPrice: 75.0,
			},
		],
	},
	// Add more bills
	{
		billNo: "BA004",
		date: "2023-08-29",
		totalAmount: 125.75,
		details: [
			{
				productName: "Product F",
				price: 45.25,
				quantity: 1,
				netPrice: 45.25,
			},
			{
				productName: "Product G",
				price: 30.5,
				quantity: 2,
				netPrice: 61.0,
			},
		],
	},
	{
		billNo: "BA005",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA006",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA007",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA008",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA009",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA010",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA011",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA012",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA013",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA014",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA015",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA016",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	{
		billNo: "BA017",
		date: "2023-08-30",
		totalAmount: 180.0,
		details: [
			{
				productName: "Product H",
				price: 60.0,
				quantity: 1,
				netPrice: 60.0,
			},
			{
				productName: "Product I",
				price: 40.0,
				quantity: 2,
				netPrice: 80.0,
			},
		],
	},
	// ... Continue adding more bills
];

export default bills;
