[
    {
        "id": "basicInfomation",
        "name": "Thông tin cơ bản",
        "criteria": [
            {
                "id": "stockExchange",
                "name": "Sàn giao dịch",
                "type": "MULTI_SELECT",
                "value": [],
                "options": [
                    {
                        "label": "HOSE",
                        "value": "HOSE"
                    },
                    {
                        "label": "HNX",
                        "value": "HNX"
                    },
                    {
                        "label": "UPCOM",
                        "value": "UPCOM"
                    }
                ]
            },
            {
                "id": "marketCapVnd",
                "name": "Vốn hóa",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Lớn (> 10,000 Tỷ)",
                        "unit": 1000000000,
                        "value": "",
                        "min": "10000",
                        "max": ""
                    },
                    {
                        "label": "Vừa (1,000 Tỷ đến 10,000 Tỷ)",
                        "unit": 1000000000,
                        "value": "",
                        "min": "1000",
                        "max": "10000"
                    },
                    {
                        "label": "Nhỏ (< 1,000 Tỷ)",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "1000"
                    }
                ]
            },
            {
                "id": "beta5y",
                "name": "Beta",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1",
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "= 1",
                        "value": "1",
                        "min": "",
                        "max": ""
                    },
                    {
                        "label": "< 1",
                        "value": "",
                        "min": "",
                        "max": "1"
                    }
                ]
            }
        ]
    },
    {
        "id": "priceFluctuations",
        "name": "Giá và biến động giá",
        "criteria": [
            {
                "id": "priceClose",
                "name": "Giá cổ phiếu",
                "suffix": "K",
                "unit": 1000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 10,000 vnđ",
                        "unit": 1000,
                        "value": "",
                        "min": "",
                        "max": "10"
                    },
                    {
                        "label": "< 50,000 vnđ",
                        "unit": 1000,
                        "value": "",
                        "min": "",
                        "max": "50"
                    },
                    {
                        "label": "< 100,000 vnđ",
                        "unit": 1000,
                        "value": "",
                        "min": "",
                        "max": "100"
                    }
                ]
            },
            {
                "id": "pricePctChgIntraDay",
                "name": "% Thay đổi giá",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Tăng trên 2%",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "Tăng trên 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "Giảm trên 2%",
                        "value": "",
                        "min": "",
                        "max": "-2"
                    },
                    {
                        "label": "Giảm trên 5%",
                        "value": "",
                        "min": "",
                        "max": "-5"
                    }
                ]
            },
            {
                "id": "pricePctChg7d",
                "name": "% Thay đổi giá 1 tuần",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Tăng trên 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "Tăng trên 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "Giảm trên 5%",
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "Giảm trên 10%",
                        "value": "",
                        "min": "",
                        "max": "-10"
                    }
                ]
            },
            {
                "id": "pricePctChg30d",
                "name": "% Thay đổi giá 1 tháng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Tăng trên 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "Tăng trên 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "Giảm trên 5%",
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "Giảm trên 10%",
                        "value": "",
                        "min": "",
                        "max": "-10"
                    }
                ]
            },
            {
                "id": "priceUpStreak",
                "lock": true,
                "name": "Số phiên tăng giá liên tiếp",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Lớn hơn 2 phiên",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 3 phiên",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 4 phiên",
                        "value": "",
                        "min": "4",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 5 phiên",
                        "value": "",
                        "min": "5",
                        "max": ""
                    }
                ]
            },
            {
                "id": "priceDownStreak",
                "lock": true,
                "name": "Số phiên giảm giá liên tiếp",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Lớn hơn 2 phiên",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 3 phiên",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 4 phiên",
                        "value": "",
                        "min": "4",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 5 phiên",
                        "value": "",
                        "min": "5",
                        "max": ""
                    }
                ]
            },
            {
                "id": "priceClosePeak",
                "name": "Giá vượt đỉnh",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "1 tuần",
                        "value": "",
                        "min": "peak1week",
                        "max": ""
                    },
                    {
                        "label": "1 tháng",
                        "value": "",
                        "min": "peak4week",
                        "max": ""
                    },
                    {
                        "label": "1 năm",
                        "value": "",
                        "min": "peak1year",
                        "max": ""
                    },
                    {
                        "label": "3 năm",
                        "value": "",
                        "min": "peak3year",
                        "max": ""
                    },
                    {
                        "label": "5 năm",
                        "value": "",
                        "min": "peak5year",
                        "max": ""
                    },
                    {
                        "label": "Thời đại",
                        "value": "",
                        "min": "peakAllTime",
                        "max": ""
                    }
                ]
            },
            {
                "id": "priceCloseTrough",
                "name": "Giá phá đáy",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "1 tuần",
                        "value": "",
                        "min": "",
                        "max": "trough1week"
                    },
                    {
                        "label": "1 tháng",
                        "value": "",
                        "min": "",
                        "max": "trough4week"
                    },
                    {
                        "label": "1 năm",
                        "value": "",
                        "min": "",
                        "max": "trough1year"
                    },
                    {
                        "label": "3 năm",
                        "value": "",
                        "min": "",
                        "max": "trough3year"
                    },
                    {
                        "label": "5 năm",
                        "value": "",
                        "min": "",
                        "max": "trough5year"
                    },
                    {
                        "label": "Thời đại",
                        "value": "",
                        "min": "",
                        "max": "troughAllTime"
                    }
                ]
            }
        ]
    },
    {
        "id": "tradingVolume",
        "name": "Khối lượng giao dịch",
        "criteria": [
            {
                "id": "volume",
                "name": "Khối lượng giao dịch",
                "suffix": "K",
                "unit": 1000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100K",
                        "unit": 1000,
                        "value": "",
                        "min": "100",
                        "max": ""
                    },
                    {
                        "label": "> 400K",
                        "unit": 1000,
                        "value": "",
                        "min": "400",
                        "max": ""
                    },
                    {
                        "label": "> 700K",
                        "unit": 1000,
                        "value": "",
                        "min": "700",
                        "max": ""
                    },
                    {
                        "label": "> 1Tr",
                        "unit": 1000,
                        "value": "",
                        "min": "1000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "volume10dAvg",
                "name": "Khối lượng giao dịch trung bình 10 phiên",
                "suffix": "K",
                "unit": 1000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100K",
                        "unit": 1000,
                        "value": "",
                        "min": "100",
                        "max": ""
                    },
                    {
                        "label": "> 400K",
                        "unit": 1000,
                        "value": "",
                        "min": "400",
                        "max": ""
                    },
                    {
                        "label": "> 700K",
                        "unit": 1000,
                        "value": "",
                        "min": "700",
                        "max": ""
                    },
                    {
                        "label": "> 1Tr",
                        "unit": 1000,
                        "value": "",
                        "min": "1000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "volumeUpStreak",
                "lock": true,
                "name": "Số phiên khối lượng tăng liên tiếp",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Lớn hơn 2 phiên",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 3 phiên",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 4 phiên",
                        "value": "",
                        "min": "4",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 5 phiên",
                        "value": "",
                        "min": "5",
                        "max": ""
                    }
                ]
            },
            {
                "id": "volumeDownStreak",
                "lock": true,
                "name": "Số phiên khối lượng giảm liên tiếp",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Lớn hơn 2 phiên",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 3 phiên",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 4 phiên",
                        "value": "",
                        "min": "4",
                        "max": ""
                    },
                    {
                        "label": "Lớn hơn 5 phiên",
                        "value": "",
                        "min": "5",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "financialReportingInformation",
        "name": "Thông tin báo cáo tài chính",
        "criteria": [
            {
                "id": "financialReportPeriod",
                "name": "Kỳ báo cáo",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Mới nhất",
                        "value": "lastestFinancialReportPeriod",
                        "min": "",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "valuation",
        "name": "Định giá",
        "criteria": [
            {
                "id": "marginOfSafety",
                "lock": true,
                "name": "Biên an toàn",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netCashToMarketCap",
                "lock": true,
                "name": "Tiền mặt ròng/Vốn hóa",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    },
                    {
                        "label": "> 60%",
                        "value": "",
                        "min": "60",
                        "max": ""
                    }
                ]
            },
            {
                "id": "peRatio",
                "name": "P/E",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 10",
                        "value": "",
                        "min": "",
                        "max": "10"
                    },
                    {
                        "label": "< 15",
                        "value": "",
                        "min": "",
                        "max": "15"
                    },
                    {
                        "label": "< 20",
                        "value": "",
                        "min": "",
                        "max": "20"
                    },
                    {
                        "label": "< TB 5 năm",
                        "value": "",
                        "min": "",
                        "max": "peRatioAverage"
                    }
                ]
            },
            {
                "id": "pbRatio",
                "name": "P/B",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "<=1",
                        "value": "",
                        "min": "",
                        "max": "1"
                    },
                    {
                        "label": "<=2",
                        "value": "",
                        "min": "",
                        "max": "2"
                    },
                    {
                        "label": "<=3",
                        "value": "",
                        "min": "",
                        "max": "3"
                    },
                    {
                        "label": "< TB 5 năm",
                        "value": "",
                        "min": "",
                        "max": "pbRatioAverage"
                    }
                ]
            },
            {
                "id": "evEbitdaRatio",
                "name": "EV/EBITDA",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 10",
                        "value": "",
                        "min": "",
                        "max": "10"
                    },
                    {
                        "label": "< 15",
                        "value": "",
                        "min": "",
                        "max": "15"
                    },
                    {
                        "label": "< 20",
                        "value": "",
                        "min": "",
                        "max": "20"
                    },
                    {
                        "label": "> 20",
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "growth",
        "name": "Tăng trưởng",
        "criteria": [
            {
                "id": "revenueGrowthPreQ",
                "name": "Tăng trưởng doanh thu quý so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "revenueGrowthQoq",
                "name": "Tăng trưởng doanh thu quý so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "revenueLtmGrowth",
                "name": "Tăng trưởng doanh thu 12 tháng so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "revenue5yGrowth",
                "name": "Tăng trưởng doanh thu bình quân 5 năm",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "revenueEstGrowth",
                "lock": true,
                "name": "Tăng trưởng doanh thu bình quân 3 năm dự phóng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netIncomeGrowthPreQ",
                "name": "Tăng trưởng lợi nhuận quý so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netIncomeGrowthQoq",
                "name": "Tăng trưởng lợi nhuận quý so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netIncomeLtmGrowth",
                "name": "Tăng trưởng lợi nhuận 12 tháng so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netIncome5yGrowth",
                "name": "Tăng trưởng lợi nhuận bình quân 5 năm",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netIncomeEstGrowth",
                "lock": true,
                "name": "Tăng trưởng lợi nhuận bình quân 3 năm dự phóng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "epsGrowthPreQ",
                "name": "Tăng trưởng EPS quý so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "epsGrowthQoq",
                "name": "Tăng trưởng EPS quý so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "epsLtmGrowthPreQ",
                "name": "Tăng trưởng EPS 12 tháng so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            },
            {
                "id": "epsLtmGrowthQoq",
                "name": "Tăng trưởng EPS 12 tháng so với cùng kỳ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "operationalEfficiency",
        "name": "Hiệu quả hoạt động",
        "criteria": [
            {
                "id": "grossMarginLtm",
                "name": "Biên lợi nhuận gộp 12 tháng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "Tăng so cùng kỳ",
                        "value": "",
                        "min": "grossMarginLtmYoy",
                        "max": ""
                    }
                ]
            },
            {
                "id": "profitMarginLtm",
                "name": "Biên lợi nhuận ròng 12 tháng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "Tăng so cùng kỳ",
                        "value": "",
                        "min": "netMarginLtmYoy",
                        "max": ""
                    }
                ]
            },
            {
                "id": "returnOnEquity",
                "name": "ROE 12 tháng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    },
                    {
                        "label": "Tăng so cùng kỳ",
                        "value": "",
                        "min": "returnOnEquityYoy",
                        "max": ""
                    }
                ]
            },
            {
                "id": "returnOnAssets",
                "name": "ROA 12 tháng",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    },
                    {
                        "label": "Tăng so cùng kỳ",
                        "value": "",
                        "min": "returnOnAssetsYoy",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "financialHealth",
        "name": "Sức khỏe tài chính",
        "criteria": [
            {
                "id": "debtToEquity",
                "name": "Nợ vay/Vốn chủ sở hữu",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Không vay nợ",
                        "value": "0",
                        "min": "",
                        "max": ""
                    },
                    {
                        "label": "< 50%",
                        "value": "",
                        "min": "",
                        "max": "50"
                    },
                    {
                        "label": "< 100%",
                        "value": "",
                        "min": "",
                        "max": "100"
                    },
                    {
                        "label": "< 150%",
                        "value": "",
                        "min": "",
                        "max": "150"
                    },
                    {
                        "label": "< 200%",
                        "value": "",
                        "min": "",
                        "max": "200"
                    }
                ]
            },
            {
                "id": "assetsToEquity",
                "name": "Tổng tài sản/Vốn chủ sở hữu",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 8",
                        "value": "",
                        "min": "",
                        "max": "8"
                    },
                    {
                        "label": "< 10",
                        "value": "",
                        "min": "",
                        "max": "10"
                    },
                    {
                        "label": "< 12",
                        "value": "",
                        "min": "",
                        "max": "12"
                    }
                ]
            },
            {
                "id": "casaRatio",
                "name": "Tỷ lệ CASA",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            },
            {
                "id": "nonPerformingLoanRatioLtm",
                "name": "Tỷ lệ nợ xấu (NPL)",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 3%",
                        "value": "",
                        "min": "",
                        "max": "3"
                    },
                    {
                        "label": "< 2%",
                        "value": "",
                        "min": "",
                        "max": "2"
                    },
                    {
                        "label": "< 1%",
                        "value": "",
                        "min": "",
                        "max": "1"
                    },
                    {
                        "label": "Thấp hơn trung bình ngành",
                        "value": "",
                        "min": "",
                        "max": "nplRatioIndustry"
                    }
                ]
            },
            {
                "id": "provisionLoanRatioLtm",
                "name": "Dự phòng rủi ro tín dụng/Cho vay",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1%",
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "> 2%",
                        "value": "",
                        "min": "2",
                        "max": ""
                    },
                    {
                        "label": "> 3%",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Cao hơn trung bình ngành",
                        "value": "",
                        "min": "allowanceForBadDebtIndustry",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "dividend",
        "name": "Cổ tức",
        "criteria": [
            {
                "id": "dividendYieldCurrent",
                "name": "Tỷ suất cổ tức hiện tại",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 15%",
                        "value": "",
                        "min": "15",
                        "max": ""
                    },
                    {
                        "label": "Cao hơn lãi tiền gửi",
                        "value": "",
                        "min": "depositRate12m",
                        "max": ""
                    }
                ]
            },
            {
                "id": "countCashDiv",
                "lock": true,
                "name": "Trả cổ tức tiền liên tục",
                "suffix": "",
                "type": "ONE_SELECT",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "Từ 3 năm",
                        "value": "",
                        "min": "3",
                        "max": ""
                    },
                    {
                        "label": "Từ 5 năm",
                        "value": "",
                        "min": "5",
                        "max": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "balanceSheet",
        "name": {
            "key": null,
            "ref": null,
            "props": {
                "children": [
                    "Chỉ tiêu Bảng cân đối",
                    {
                        "type": "br",
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null
                    },
                    "kế toán (nhóm sản xuất,",
                    {
                        "type": "br",
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null
                    },
                    "dịch vụ, thương mại)"
                ]
            },
            "_owner": null
        },
        "criteria": [
            {
                "id": "constructionInProgressPct",
                "name": "Chi phí xây dựng dở dang/Tổng tài sản",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    }
                ]
            },
            {
                "id": "constructionInProgressGrowthPreQ",
                "name": "Tăng trưởng chí phí xây dựng dở dang so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netInventoriesPct",
                "name": "Hàng tồn kho/Tổng tài sản",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    }
                ]
            },
            {
                "id": "netInventoriesGrowthPreQ",
                "name": "Tăng trưởng hàng tồn kho so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    }
                ]
            },
            {
                "id": "advancesCustomerPct",
                "name": "Người mua trả tiền trước/Tổng tài sản",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    }
                ]
            },
            {
                "id": "advancesCustomerGrowthPreQ",
                "name": "Tăng trưởng người mua trả tiền trước so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fixedAssetPct",
                "name": "Tài sản cố định/Tổng tài sản",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 5%",
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fixedAssetGrowthPreQ",
                "name": "Tăng trưởng tài sản cố định so với quý trước",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 10%",
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20%",
                        "value": "",
                        "min": "20",
                        "max": ""
                    },
                    {
                        "label": "> 30%",
                        "value": "",
                        "min": "30",
                        "max": ""
                    },
                    {
                        "label": "> 40%",
                        "value": "",
                        "min": "40",
                        "max": ""
                    },
                    {
                        "label": "> 50%",
                        "value": "",
                        "min": "50",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fixedAssetGrossRatio",
                "name": "Khấu hao còn lại/Nguyên giá TSCĐ",
                "suffix": "%",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "< 30%",
                        "value": "",
                        "min": "",
                        "max": "30"
                    },
                    {
                        "label": "< 20%",
                        "value": "",
                        "min": "",
                        "max": "20"
                    },
                    {
                        "label": "< 10%",
                        "value": "",
                        "min": "",
                        "max": "10"
                    }
                ]
            }
        ]
    },
    {
        "id": "transactions",
        "name": "Giao dịch nội bộ",
        "criteria": [
            {
                "id": "insiderBuying3m",
                "lock": true,
                "name": "Nội bộ mua ròng 3 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "insiderBuying6m",
                "lock": true,
                "name": "Nội bộ mua ròng 6 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "insiderBuying",
                "lock": true,
                "name": "Nội bộ mua ròng 12 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "insiderSelling3m",
                "lock": true,
                "name": "Nội bộ bán ròng 3 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            },
            {
                "id": "insiderSelling6m",
                "lock": true,
                "name": "Nội bộ bán ròng 6 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            },
            {
                "id": "insiderSelling",
                "lock": true,
                "name": "Nội bộ bán ròng 12 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            }
        ]
    },
    {
        "id": "tradingInvestmentFunds",
        "name": "Giao dịch Quỹ đầu tư",
        "criteria": [
            {
                "id": "fundVolumeBuy1m",
                "lock": true,
                "name": "Quỹ đầu tư mua ròng 1 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fundVolumeBuy3m",
                "lock": true,
                "name": "Quỹ đầu tư mua ròng 3 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fundVolumeBuy6m",
                "lock": true,
                "name": "Quỹ đầu tư mua ròng 6 tháng",
                "suffix": "",
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "100000",
                        "max": ""
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "500000",
                        "max": ""
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "1000000",
                        "max": ""
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "2000000",
                        "max": ""
                    }
                ]
            },
            {
                "id": "fundVolumeSell1m",
                "lock": true,
                "name": "Quỹ đầu tư bán ròng 1 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            },
            {
                "id": "fundVolumeSell3m",
                "lock": true,
                "name": "Quỹ đầu tư bán ròng 3 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            },
            {
                "id": "fundVolumeSell6m",
                "lock": true,
                "name": "Quỹ đầu tư bán ròng 6 tháng",
                "suffix": "",
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 100,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-100000"
                    },
                    {
                        "label": "> 500,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-500000"
                    },
                    {
                        "label": "> 1,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-1000000"
                    },
                    {
                        "label": "> 2,000,000 cổ phiếu",
                        "value": "",
                        "min": "",
                        "max": "-2000000"
                    }
                ]
            }
        ]
    },
    {
        "id": "foreignTransactionValue",
        "name": "Giá trị giao dịch khối ngoại",
        "criteria": [
            {
                "id": "foreignBuyingValue1d",
                "lock": true,
                "name": "Khối ngoại mua ròng trong phiên",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            },
            {
                "id": "foreignBuyingValue7d",
                "lock": true,
                "name": "Khối ngoại mua ròng 7 ngày",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            },
            {
                "id": "foreignBuyingValue30d",
                "lock": true,
                "name": "Khối ngoại mua ròng 30 ngày",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            },
            {
                "id": "foreignBuyingValue90d",
                "lock": true,
                "name": "Khối ngoại mua ròng 3 tháng",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "1",
                        "max": ""
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "5",
                        "max": ""
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "10",
                        "max": ""
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "20",
                        "max": ""
                    }
                ]
            },
            {
                "id": "foreignSellingValue1d",
                "lock": true,
                "name": "Khối ngoại bán ròng trong phiên",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-1"
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-10"
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-20"
                    }
                ]
            },
            {
                "id": "foreignSellingValue7d",
                "lock": true,
                "name": "Khối ngoại bán ròng 7 ngày",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-1"
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-10"
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-20"
                    }
                ]
            },
            {
                "id": "foreignSellingValue30d",
                "lock": true,
                "name": "Khối ngoại bán ròng 30 ngày",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-1"
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-10"
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-20"
                    }
                ]
            },
            {
                "id": "foreignSellingValue90d",
                "lock": true,
                "name": "Khối ngoại bán ròng 3 tháng",
                "suffix": "Tỷ",
                "unit": 1000000000,
                "type": "RANGE_OPTION_SWITCH",
                "value": "",
                "min": "",
                "max": "",
                "options": [
                    {
                        "label": "> 1 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-1"
                    },
                    {
                        "label": "> 5 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-5"
                    },
                    {
                        "label": "> 10 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-10"
                    },
                    {
                        "label": "> 20 Tỷ",
                        "unit": 1000000000,
                        "value": "",
                        "min": "",
                        "max": "-20"
                    }
                ]
            }
        ]
    }
]