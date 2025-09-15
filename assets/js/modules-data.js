// Дані модулів курсу "Інформаційні банківські технології"
// Для студентів 3 курсу спеціальності "Кібербезпека"

const MODULES_DATA = [
    {
        id: 1,
        number: 1,
        title: "Основи банківських ІТ-систем",
        icon: "🏦",
        description: "Архітектура банківських систем, центральні банківські системи (Core Banking), захист критичної інфраструктури та безпека банківських баз даних.",
        hours: {
            lectures: 6,
            practice: 30
        },
        lectures: [
            {
                title: "Лекція 1.1: Архітектура банківських ІТ-систем",
                file: "lectures/module1/lecture1_1_architecture/index.html",
                duration: "80 хв",
                subtopics: ["Еволюція банківських технологій", "Багаторівнева архітектура", "Threat modeling", "API безпека"]
            },
            {
                title: "Лекція 1.2: Центральні банківські системи (Core Banking)",
                file: "lectures/module1/lecture1_2_core_banking/index.html",
                duration: "80 хв",
                subtopics: ["Функціональність CBS", "Типи CBS", "Захист інфраструктури", "Disaster recovery"]
            },
            {
                title: "Лекція 1.3: Банківські бази даних та їх захист",
                file: "lectures/module1/lecture1_3_databases/index.html",
                duration: "80 хв",
                subtopics: ["СУБД у банкінгу", "ACID транзакції", "Database security", "Аудит доступу"]
            }
        ],
        labs: [
            {
                title: "Threat modeling банківської архітектури",
                file: "labs/module1/lab1_threat_modeling.html",
                duration: "150 хв"
            },
            {
                title: "Аналіз захищеності CBS",
                file: "labs/module1/lab2_cbs_security.html",
                duration: "150 хв"
            }
        ],
        practices: [
            {
                title: "Database security assessment",
                file: "practices/module1/practice1_db_security.html",
                duration: "120 хв"
            },
            {
                title: "API security testing",
                file: "practices/module1/practice2_api_security.html",
                duration: "120 хв"
            }
        ]
    },

    {
        id: 2,
        number: 2,
        title: "Core Banking Systems",
        icon: "🏛️",
        description: "Функціональність та компоненти CBS, інтеграція з зовнішніми системами, провайдери CBS та їх security frameworks з фокусом на кібербезпеку.",
        hours: {
            lectures: 6,
            practice: 30
        },
        lectures: [
            {
                title: "Лекція 2.1: Функціональність та компоненти CBS",
                file: "lectures/module2/lecture2_1_functionality/index.html",
                duration: "80 хв",
                subtopics: ["Customer Information File", "Account management", "Access controls", "Fraud detection"]
            },
            {
                title: "Лекція 2.2: Інтеграція CBS з зовнішніми системами",
                file: "lectures/module2/lecture2_2_integration/index.html",
                duration: "80 хв",
                subtopics: ["APIs та web services", "Event-driven architecture", "API security", "Network segmentation"]
            },
            {
                title: "Лекція 2.3: CBS провайдери та їх security frameworks",
                file: "lectures/module2/lecture2_3_providers/index.html",
                duration: "80 хв",
                subtopics: ["Огляд світових CBS", "Хмарні vs on-premise", "Vendor risk assessment", "Compliance вимоги"]
            }
        ],
        labs: [
            {
                title: "API security testing для CBS",
                file: "labs/module2/lab1_api_security.html",
                duration: "150 хв"
            },
            {
                title: "Vendor risk assessment",
                file: "labs/module2/lab2_vendor_risk.html",
                duration: "150 хв"
            }
        ],
        practices: [
            {
                title: "OAuth та JWT токени implementation",
                file: "practices/module2/practice1_oauth_jwt.html",
                duration: "120 хв"
            },
            {
                title: "Network segmentation для CBS",
                file: "practices/module2/practice2_network_segmentation.html",
                duration: "120 хв"
            }
        ]
    },

    {
        id: 3,
        number: 3,
        title: "Платіжні системи та технології",
        icon: "💳",
        description: "Картковий бізнес та платіжні мережі, електронні платежі, мобільний банкінг, криптовалюти та блокчейн з акцентом на безпеку платіжних даних.",
        hours: {
            lectures: 6,
            practice: 30
        },
        lectures: [
            {
                title: "Лекція 3.1: Картковий бізнес та платіжні мережі",
                file: "lectures/module3/lecture3_1_card_business/index.html",
                duration: "80 хв",
                subtopics: ["Visa, Mastercard архітектура", "EMV та токенізація", "Card fraud prevention", "PCI DSS compliance"]
            },
            {
                title: "Лекція 3.2: Електронні платежі та мобільний банкінг",
                file: "lectures/module3/lecture3_2_mobile_payments/index.html",
                duration: "80 хв",
                subtopics: ["Digital wallets", "Contactless платежі", "Mobile app security", "Behavioral analytics"]
            },
            {
                title: "Лекція 3.3: Криптовалюти та блокчейн у банкінгу",
                file: "lectures/module3/lecture3_3_crypto_blockchain/index.html",
                duration: "80 хв",
                subtopics: ["CBDC технології", "DeFi та банкінг", "Blockchain security", "Regulatory challenges"]
            }
        ],
        labs: [
            {
                title: "PCI DSS compliance audit",
                file: "labs/module3/lab1_pci_dss_audit.html",
                duration: "150 хв"
            },
            {
                title: "Mobile payment security testing",
                file: "labs/module3/lab2_mobile_security.html",
                duration: "150 хв"
            }
        ],
        practices: [
            {
                title: "Card fraud detection системи",
                file: "practices/module3/practice1_fraud_detection.html",
                duration: "120 хв"
            },
            {
                title: "Smart contract security audit",
                file: "practices/module3/practice2_smart_contract_audit.html",
                duration: "120 хв"
            }
        ]
    },

    {
        id: 4,
        number: 4,
        title: "Безпека банківських систем",
        icon: "🔐",
        description: "ОСНОВНИЙ МОДУЛЬ для кібербезпеки! Кіберзагрози в банківській сфері, системи захисту інфраструктури, пентестинг та vulnerability management.",
        hours: {
            lectures: 6,
            practice: 36
        },
        lectures: [
            {
                title: "Лекція 4.1: Кіберзагрози в банківській сфері",
                file: "lectures/module4/lecture4_1_cyber_threats/index.html",
                duration: "80 хв",
                subtopics: ["APT групи (Lazarus, Carbanak)", "Banking trojans", "Threat intelligence", "Kill chain analysis"]
            },
            {
                title: "Лекція 4.2: Системи захисту банківської інфраструктури",
                file: "lectures/module4/lecture4_2_protection_systems/index.html",
                duration: "80 хв",
                subtopics: ["Zero trust архітектура", "SIEM системи", "SOC операції", "Incident response"]
            },
            {
                title: "Лекція 4.3: Пентестинг та vulnerability management",
                file: "lectures/module4/lecture4_3_pentest_vuln_mgmt/index.html",
                duration: "80 хв",
                subtopics: ["Red team vs Blue team", "Automated security testing", "Bug bounty програми", "Risk scoring"]
            }
        ],
        labs: [
            {
                title: "Banking malware analysis",
                file: "labs/module4/lab1_malware_analysis.html",
                duration: "180 хв"
            },
            {
                title: "SIEM налаштування для банку",
                file: "labs/module4/lab2_siem_setup.html",
                duration: "180 хв"
            },
            {
                title: "Penetration testing банківського додатку",
                file: "labs/module4/lab3_pentest_banking_app.html",
                duration: "180 хв"
            }
        ],
        practices: [
            {
                title: "Threat hunting у банківській мережі",
                file: "practices/module4/practice1_threat_hunting.html",
                duration: "120 хв"
            },
            {
                title: "Incident response simulation",
                file: "practices/module4/practice2_incident_response.html",
                duration: "120 хв"
            },
            {
                title: "Vulnerability assessment CBS",
                file: "practices/module4/practice3_vulnerability_assessment.html",
                duration: "120 хв"
            }
        ]
    },

    {
        id: 5,
        number: 5,
        title: "Регуляторні технології (RegTech)",
        icon: "📊",
        description: "AML/KYC автоматизація з machine learning, regulatory reporting та compliance automation з фокусом на захист персональних даних.",
        hours: {
            lectures: 6,
            practice: 30
        },
        lectures: [
            {
                title: "Лекція 5.1: AML/KYC автоматизація",
                file: "lectures/module5/lecture5_1_aml_kyc/index.html",
                duration: "80 хв",
                subtopics: ["ML для fraud detection", "Transaction monitoring", "Privacy-preserving analytics", "GDPR compliance"]
            },
            {
                title: "Лекція 5.2: Regulatory reporting та compliance automation",
                file: "lectures/module5/lecture5_2_regulatory_reporting/index.html",
                duration: "80 хв",
                subtopics: ["BCBS 239 та data governance", "Automated reporting", "Data integrity", "RegTech sandbox"]
            }
        ],
        labs: [
            {
                title: "AML/KYC система налаштування",
                file: "labs/module5/lab1_aml_kyc_setup.html",
                duration: "150 хв"
            },
            {
                title: "GDPR compliance assessment",
                file: "labs/module5/lab2_gdpr_compliance.html",
                duration: "150 хв"
            }
        ],
        practices: [
            {
                title: "Machine learning fraud detection",
                file: "practices/module5/practice1_ml_fraud_detection.html",
                duration: "120 хв"
            },
            {
                title: "Data governance framework",
                file: "practices/module5/practice2_data_governance.html",
                duration: "120 хв"
            }
        ]
    },

    {
        id: 6,
        number: 6,
        title: "Кіберзагрози в банкінгу",
        icon: "🛡️",
        description: "КРИТИЧНО ВАЖЛИВИЙ МОДУЛЬ! Аналіз реальних кіберінцидентів у фінсекторі, emerging threats, міжнародна співпраця у кіберзахисті банків.",
        hours: {
            lectures: 6,
            practice: 36
        },
        lectures: [
            {
                title: "Лекція 6.1: Актуальні кіберінциденти у фінсекторі",
                file: "lectures/module6/lecture6_1_cyber_incidents/index.html",
                duration: "80 хв",
                subtopics: ["Case studies (Bangladesh Bank, Equifax)", "Lessons learned", "Digital forensics", "Breach notification"]
            },
            {
                title: "Лекція 6.2: Emerging threats та майбутнє кібербезпеки",
                file: "lectures/module6/lecture6_2_emerging_threats/index.html",
                duration: "80 хв",
                subtopics: ["AI-powered attacks", "Quantum threats", "Post-quantum cryptography", "Cyber resilience"]
            },
            {
                title: "Лекція 6.3: Міжнародна співпраця у кіберзахисті банків",
                file: "lectures/module6/lecture6_3_international_cooperation/index.html",
                duration: "80 хв",
                subtopics: ["FS-ISAC consortium", "Cross-border response", "Threat intelligence sharing", "Regulatory cooperation"]
            }
        ],
        labs: [
            {
                title: "Digital forensics банківського інциденту",
                file: "labs/module6/lab1_digital_forensics.html",
                duration: "180 хв"
            },
            {
                title: "Quantum-safe cryptography implementation",
                file: "labs/module6/lab2_quantum_safe_crypto.html",
                duration: "180 хв"
            },
            {
                title: "Cyber resilience framework розробка",
                file: "labs/module6/lab3_cyber_resilience.html",
                duration: "180 хв"
            }
        ],
        practices: [
            {
                title: "AI-powered attack simulation",
                file: "practices/module6/practice1_ai_attack_simulation.html",
                duration: "120 хв"
            },
            {
                title: "Cross-border incident response drill",
                file: "practices/module6/practice2_cross_border_incident.html",
                duration: "120 хв"
            },
            {
                title: "Threat intelligence platform setup",
                file: "practices/module6/practice3_threat_intelligence.html",
                duration: "120 хв"
            }
        ]
    }
];

// Розрахунки для статистики курсу
const getTotalStats = () => {
    let totalLectures = 0;
    let totalLabs = 0;
    let totalPractices = 0;
    let totalLectureHours = 0;
    let totalPracticeHours = 0;

    MODULES_DATA.forEach(module => {
        totalLectures += module.lectures ? module.lectures.length : 0;
        totalLabs += module.labs ? module.labs.length : 0;
        totalPractices += module.practices ? module.practices.length : 0;
        totalLectureHours += module.hours.lectures;
        totalPracticeHours += module.hours.practice;
    });

    return {
        modules: MODULES_DATA.length,
        lectures: totalLectures,
        labs: totalLabs,
        practices: totalPractices,
        lectureHours: totalLectureHours,
        practiceHours: totalPracticeHours,
        totalHours: totalLectureHours + totalPracticeHours
    };
};

// Експорт для консольного доступу
if (typeof window !== 'undefined') {
    window.COURSE_STATS = getTotalStats();
    console.log('📊 Статистика курсу:', window.COURSE_STATS);
}