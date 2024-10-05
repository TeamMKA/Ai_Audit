// src/utils/generateDocuments.js
const generateDocuments = () => {
    const documents = []
    const baseTimestamp = new Date().toISOString()

    // Define possible transaction types and their structures
    const transactionTypes = [
        {
            type: "student_fee_payment",
            getDetails: () => ({
                transaction_id: `txn_${Math.random()
                    .toString(36)
                    .substr(2, 10)}`,
                timestamp: baseTimestamp,
                transaction_type: "student_fee_payment",
                status: "completed",
                blockchain: {
                    block_id: `blk_${Math.random().toString(36).substr(2, 10)}`,
                    hash: `${Math.random().toString(36).substr(2, 10)}`,
                    previous_block_hash: `${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    blockchain_network: "Ethereum",
                    transaction_fee: {
                        amount: "0.01",
                        currency: "ETH",
                    },
                },
                institution_details: {
                    institution_id: "inst_1001",
                    institution_name: "Tech University",
                    address: "123 Main St, City, Country",
                    contact: {
                        email: "admin@techuniversity.com",
                        phone: "+1234567890",
                    },
                },
                payee_details: {
                    payee_id: `student_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    role: "student",
                    name: {
                        first_name: "John",
                        last_name: "Smith",
                    },
                    email: "johnsmith@example.com",
                    phone: "+1234567898",
                    fee_period: "2024-09",
                    fee_amount: {
                        value: 1500,
                        currency: "INR",
                    },
                    bank_details: {
                        bank_name: "Bank of Education",
                        account_number: "123456789",
                        iban: "IBAN1234567890",
                    },
                },
                payment_details: {
                    total_amount: {
                        value: 1500,
                        currency: "INR",
                    },
                    method: "blockchain",
                    payment_reference_id: `pay_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    timestamp: baseTimestamp,
                },
                ai_anomaly_detection: {
                    anomaly_flag: false,
                    anomaly_type: null,
                    anomaly_details: null,
                    anomaly_detection_timestamp: baseTimestamp,
                    ai_confidence_score: 0.99,
                },
            }),
        },
        {
            type: "teacher_salary_payment",
            getDetails: () => ({
                transaction_id: `txn_${Math.random()
                    .toString(36)
                    .substr(2, 10)}`,
                timestamp: baseTimestamp,
                transaction_type: "salary_payment",
                status: "completed",
                blockchain: {
                    block_id: `blk_${Math.random().toString(36).substr(2, 10)}`,
                    hash: `${Math.random().toString(36).substr(2, 10)}`,
                    previous_block_hash: `${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    blockchain_network: "Ethereum",
                    transaction_fee: {
                        amount: "0.02",
                        currency: "ETH",
                    },
                },
                institution_details: {
                    institution_id: "inst_1001",
                    institution_name: "Tech University",
                    address: "123 Main St, City, Country",
                    contact: {
                        email: "admin@techuniversity.com",
                        phone: "+1234567890",
                    },
                },
                payee_details: {
                    payee_id: `teacher_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    role: "teacher",
                    name: {
                        first_name: "Jane",
                        last_name: "Doe",
                    },
                    email: "janedoe@example.com",
                    phone: "+1234567899",
                    salary_period: "2024-09",
                    salary_amount: {
                        value: 3000,
                        currency: "INR",
                    },
                    bank_details: {
                        bank_name: "Bank of Education", 
                        account_number: "123456789",
                        iban: "IBAN1234567890",
                    },
                },
                payment_details: {
                    total_amount: {
                        value: 3000,
                        currency: "INR",
                    },
                    method: "blockchain",
                    payment_reference_id: `pay_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    timestamp: baseTimestamp,
                },
                ai_anomaly_detection: {
                    anomaly_flag: false,
                    anomaly_type: null,
                    anomaly_details: null,
                    anomaly_detection_timestamp: baseTimestamp,
                    ai_confidence_score: 0.99,
                },
            }),
        },
        {
            type: "logistics_payment",
            getDetails: () => ({
                transaction_id: `txn_${Math.random()
                    .toString(36)
                    .substr(2, 10)}`,
                timestamp: baseTimestamp,
                transaction_type: "logistics_payment",
                status: "completed",
                blockchain: {
                    block_id: `blk_${Math.random().toString(36).substr(2, 10)}`,
                    hash: `${Math.random().toString(36).substr(2, 10)}`,
                    previous_block_hash: `${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    blockchain_network: "Ethereum",
                    transaction_fee: {
                        amount: "0.03",
                        currency: "ETH",
                    },
                },
                institution_details: {
                    institution_id: "inst_1001",
                    institution_name: "Tech University",
                    address: "123 Main St, City, Country",
                    contact: {
                        email: "admin@techuniversity.com",
                        phone: "+1234567890",
                    },
                },
                logistics_details: {
                    logistics_id: `log_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    vendor_name: "ABC Logistics",
                    service_type: "equipment_delivery",
                    logistics_cost: {
                        value: 500,
                        currency: "INR",
                    },
                    delivery_date: "2024-09-30",
                    status: "delivered",
                },
                payment_details: {
                    total_amount: {
                        value: 500,
                        currency: "INR",
                    },
                    method: "blockchain",
                    payment_reference_id: `pay_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    timestamp: baseTimestamp,
                },
                ai_anomaly_detection: {
                    anomaly_flag: false,
                    anomaly_type: null,
                    anomaly_details: null,
                    anomaly_detection_timestamp: baseTimestamp,
                    ai_confidence_score: 0.99,
                },
            }),
        },
        {
            type: "college_rent_payment",
            getDetails: () => ({
                transaction_id: `txn_${Math.random()
                    .toString(36)
                    .substr(2, 10)}`,
                timestamp: baseTimestamp,
                transaction_type: "college_rent_payment",
                status: "completed",
                blockchain: {
                    block_id: `blk_${Math.random().toString(36).substr(2, 10)}`,
                    hash: `${Math.random().toString(36).substr(2, 10)}`,
                    previous_block_hash: `${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    blockchain_network: "Ethereum",
                    transaction_fee: {
                        amount: "0.05",
                        currency: "ETH",
                    },
                },
                institution_details: {
                    institution_id: "inst_1001",
                    institution_name: "Tech University",
                    address: "123 Main St, City, Country",
                    contact: {
                        email: "admin@techuniversity.com",
                        phone: "+1234567890",
                    },
                },
                payment_details: {
                    total_amount: {
                        value: 10000,
                        currency: "INR",
                    },
                    method: "blockchain",
                    payment_reference_id: `pay_${Math.random()
                        .toString(36)
                        .substr(2, 10)}`,
                    timestamp: baseTimestamp,
                },
                ai_anomaly_detection: {
                    anomaly_flag: false,
                    anomaly_type: null,
                    anomaly_details: null,
                    anomaly_detection_timestamp: baseTimestamp,
                    ai_confidence_score: 0.99,
                },
            }),
        },
    ]

    // Generate 10 documents with random transaction types
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * transactionTypes.length)
        const transactionType = transactionTypes[randomIndex]
        const document = transactionType.getDetails()
        documents.push(document)
    }
    console.log("")

    return documents
}

export default generateDocuments
