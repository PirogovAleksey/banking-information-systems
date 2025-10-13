# Лекція 2.3: CBS провайдери та їх security frameworks

**Модуль 2:** Core Banking Systems
**Тривалість:** 2 години
**Теми:** 4

---

## Зміст

1. [Тема 1: Огляд світових CBS провайдерів](#тема-1-огляд-світових-cbs-провайдерів)
2. [Тема 2: Хмарні vs On-Premise рішення](#тема-2-хмарні-vs-on-premise-рішення)
3. [Тема 3: Vendor Risk Assessment](#тема-3-vendor-risk-assessment)
4. [Тема 4: Compliance вимоги до CBS](#тема-4-compliance-вимоги-до-cbs)

---

# Тема 1: Огляд світових CBS провайдерів

## 1.1. Глобальний ринок CBS

### Ключові цифри (2024):
- **Розмір ринку:** $12.4B
- **CAGR до 2030:** 8.9%
- **Банків використовують топ-3:** 3000+
- **Міграція в хмару до 2026:** 75%

### Тренди:
- Масова міграція від legacy систем до cloud-native платформ
- API-first архітектури
- Real-time banking
- AI/ML інтеграція

---

## 1.2. Топ-3 CBS провайдери світу

### 🥇 #1 Temenos

**Частка ринку:** 31%
**Клієнти:** 3000+ банків у 150 країнах
**Флагманський продукт:** Temenos Transact (колишній T24)

#### Переваги:
- **Model Bank** - pre-configured templates для швидкого впровадження
- **API-first architecture** - 1200+ готових API
- **Cloud-native** - оптимізація для AWS/Azure
- **Real-time processing** - instant payments та balances
- **Multi-entity support** - підтримка банківських груп
- **Відкритий код** - Java-based, легко кастомізувати

#### Виклики:
- Висока вартість ліцензування
- Складність імплементації (12-24 місяці)
- Вимагає висококваліфікованих спеціалістів
- Vendor lock-in ризики
- Потребує потужних ресурсів

#### Security Framework:
- **Identity & Access Management:** Active Directory, LDAP, SAML 2.0, MFA, RBAC
- **Data Security:** AES-256 encryption, Tokenization, Data masking
- **Audit & Compliance:** Повний audit trail, PCI DSS, SOX, GDPR compliance
- **Certifications:** ISO 27001, SOC 2 Type II

**Використовують:** Standard Chartered, JPMorgan Chase, Lloyds Banking Group

---

### 🥈 #2 FIS (Fidelity National Information Services)

**Частка ринку:** 24%
**Клієнти:** 2000+ фінансових установ
**Флагманський продукт:** FIS Modern Banking Platform

#### Переваги:
- **End-to-end рішення** - повний банківський стек
- **Перевірена надійність** - 20+ років на ринку
- **Масштабованість** - від community до tier-1 банків
- **US compliance ready** - FFIEC, FDIC
- **Сильна підтримка** - 24/7 support
- **Екосистема** - інтеграція з FIS продуктами

#### Виклики:
- Legacy архітектура (монолітна база)
- Менш гнучка кастомізація
- Повільніша cloud адаптація
- Вищий TCO порівняно з новими гравцями
- Застарілі UI/UX компоненти

#### Security Architecture:
- **Perimeter Defense:** Next-gen Firewalls, DDoS protection, IDS/IPS
- **Threat Detection:** 24/7 SOC, SIEM (Splunk), Threat intelligence
- **Compliance:** PCI DSS Level 1, SOC 1/2/3, FFIEC aligned
- **Data Protection:** Encryption, HSM key management, Automated backups
- **SLA:** 99.99% uptime з фінансовими penalties

**Фокус:** Середні та великі банки США з консервативним підходом

---

### 🥉 #3 Oracle Financial Services

**Частка ринку:** 18%
**Клієнти:** 1500+ банків
**Флагманський продукт:** Oracle FLEXCUBE

#### Переваги:
- **Глобальна присутність** - особливо сильна в Азії/EMEA
- **Oracle екосистема** - інтеграція з Oracle DB, Cloud
- **Модульна архітектура** - вибіркове впровадження
- **Regulatory agility** - швидка адаптація до змін
- **Corporate banking** - сильні B2B можливості
- **Multi-currency** - підтримка 150+ валют

#### Виклики:
- Oracle vendor lock-in
- Висока вартість Oracle інфраструктури
- Складна архітектура
- Менш modern UI/UX
- Повільна інновація vs конкурентів

#### Security Framework:
- **Database Security:** Oracle Advanced Security (TDE, Data Redaction), Database Vault, Label Security
- **Application Security:** Oracle Identity Management (OIM), Oracle Access Manager (OAM), PAM
- **Infrastructure Security:** OCI security, Virtual Cloud Network isolation, WAF
- **Certifications:** ISO 27001, SOC 2, PCI DSS

**Ideal для:** Великі корпоративні банки з комплексними міжнародними операціями

---

## 1.3. Порівняльний аналіз

| Критерій | Temenos | FIS | Oracle |
|----------|---------|-----|--------|
| Частка ринку | 31% 🥇 | 24% 🥈 | 18% 🥉 |
| Cloud-готовність | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Час впровадження | 12-24 міс | 18-36 міс | 18-30 міс |
| TCO (5 років) | $$$$ | $$$$$ | $$$$$ |
| API-first підхід | ✅ Так | ⚠️ Частково | ✅ Так |
| Security certifications | ISO 27001, SOC 2 | PCI DSS L1, SOC 1/2/3 | ISO 27001, SOC 2 |
| Кращий для | Інноваційні банки | US regional banks | Global corporates |

---

## 1.4. Інші помітні гравці

### Нові гравці (Challengers):
- **Mambu** - SaaS-only, cloud-native, швидке впровадження
- **Thought Machine (Vault)** - Google Cloud partnership, modern stack
- **Finastra (Fusion)** - open platform підхід
- **nCino** - Salesforce-based, CRM-first

### Регіональні лідери:
- **TCS BaNCS** (Індія) - insurance + banking
- **SAP Banking Services** (Європа)
- **Infosys Finacle** (Азія, Африка)
- **Avaloq** (Швейцарія) - wealth management focus

**Тренд:** Challengers відбирають 15-20% нових проектів від traditional vendors

---

## 1.5. Критерії вибору CBS платформи

### Бізнес фактори:
- Business model fit
- Географія операцій
- Регуляторні вимоги
- Розмір банку
- Time-to-market

### Технічні фактори:
- Cloud vs on-premise
- API capabilities
- Інтеграційна гнучкість
- Масштабованість
- Tech stack сумісність

### Security фактори:
- Certifications (ISO, SOC)
- Data residency
- Incident response
- Vendor security posture
- Compliance capabilities

---

## 1.6. Кейс: ПриватБанк

### Міграція 2019-2021

**Обрана платформа:** Власна розробка на базі microservices (React + Java + Kubernetes)

**Причина:** Унікальні бізнес-вимоги, масштаб (25M клієнтів)

**Параметри проекту:**
- Бюджет: $500M+ over 3 роки
- Команда: 500+ розробників
- Тривалість: 3 роки

**Результати:**
- **3x** швидкість розробки
- **50%** зниження TCO
- **99.99%** availability
- **Zero** vendor lock-in

**Висновок:** Великі банки можуть обирати між ready-made CBS та custom development

---

## 1.7. Майбутнє CBS платформ (2025-2030)

### AI-Native Banking
- Вбудований AI для fraud detection, персоналізації, автоматизації
- Predictive analytics в real-time

### Composable Banking
- Модульні компоненти замість монолітних платформ
- Mix-and-match від різних vendors

### Blockchain Integration
- DLT для cross-border payments, trade finance
- Smart contracts для автоматизації

### Quantum-Ready Security
- Post-quantum cryptography adoption
- Підготовка до квантових загроз

### Sustainability Features
- Green banking функціональність
- ESG reporting вбудований

---

# Тема 2: Хмарні vs On-Premise рішення

## 2.1. Моделі розгортання CBS

### Спектр deployment моделей:

1. **🏢 On-Premise** - Повний контроль
2. **🔧 Private Cloud** - Dedicated infrastructure
3. **⚡ Hybrid Cloud** - Найкраще з двох світів
4. **☁️ Public Cloud** - Максимальна гнучкість

### Розподіл у 2024:
- **On-Premise:** 25%
- **Hybrid Cloud:** 35%
- **Public/Private Cloud:** 40%

---

## 2.2. On-Premise CBS

### Традиційна модель розгортання

#### ✅ Переваги:
- **Повний контроль** - над даними, інфраструктурою, security
- **Data residency** - дані фізично в країні (НБУ вимоги)
- **Кастомізація** - повна свобода налаштувань
- **Немає vendor lock-in** - на рівні infrastructure
- **Predictable costs** - CAPEX модель, немає surprises
- **Network latency** - мінімальна для локальних операцій

#### ❌ Недоліки:
- **Високі початкові витрати** - hardware, datacenter, setup
- **Тривалий TTM** - 6-12+ місяців до production
- **Масштабування складне** - потребує планування та закупівлі
- **Operational burden** - власна команда DevOps/Infrastructure
- **Disaster recovery складний** - потребує другого DC
- **Updates повільні** - потребують downtime

**Ідеально для:** Великі банки з регуляторними вимогами та існуючою infrastructure

---

## 2.3. Public Cloud CBS

### AWS / Azure / Google Cloud

#### ✅ Переваги:
- **Швидкий старт** - production ready за 2-4 місяці
- **OPEX модель** - pay-as-you-go, немає великих CAPEX
- **Auto-scaling** - elastic resources по потребі
- **Global reach** - multi-region deployment за хвилини
- **Managed services** - DB, security, monitoring вже є
- **Innovation швидка** - нові features регулярно
- **DR вбудований** - multi-AZ, cross-region replication

#### ❌ Недоліки:
- **Compliance виклики** - не всі регулятори дозволяють
- **Vendor lock-in** - залежність від cloud provider
- **Cost unpredictability** - може зрости несподівано
- **Data sovereignty** - контроль над даними обмежений
- **Internet dependency** - вразливість до мережевих проблем
- **Shared responsibility** - не все контролює vendor

**Ідеально для:** Нові цифрові банки, challenger banks, швидке зростання

---

## 2.4. Hybrid Cloud: Найкраще з обох світів

### Типовий розподіл workloads:

#### 🏢 On-Premise:
- Core transaction processing (критичні операції)
- Sensitive data (PII, PCI data)
- Legacy integrations (старі системи)
- Compliance-critical (регуляторні дані)

#### ☁️ Public Cloud:
- Digital channels (mobile, web apps)
- Analytics & ML (big data processing)
- Dev/Test environments
- Customer engagement (CRM, marketing)

**Реальність:** 60% банків рухаються до hybrid моделі до 2026 року

---

## 2.5. Security: Cloud vs On-Premise

| Аспект | On-Premise | Public Cloud |
|--------|------------|--------------|
| **Physical Security** | Залежить від банку | ⭐⭐⭐⭐⭐ Military-grade |
| **DDoS Protection** | Вимагає інвестицій | ⭐⭐⭐⭐⭐ Вбудована |
| **Patch Management** | Ваша відповідальність | ⭐⭐⭐⭐ Автоматичні |
| **Data Control** | ⭐⭐⭐⭐⭐ Повний | ⭐⭐⭐ Shared |
| **Compliance** | ⭐⭐⭐⭐ Легше довести | ⭐⭐⭐ Вимагає перевірки |
| **Incident Response** | Ваша команда | ⭐⭐⭐⭐⭐ 24/7 SOC |
| **Disaster Recovery** | Costly to implement | ⭐⭐⭐⭐⭐ Вбудоване |

**Вердикт:** Cloud providers мають кращу infrastructure security, але ви втрачаєте частину контролю

---

## 2.6. Shared Responsibility Model

### 🏦 ВАША ВІДПОВІДАЛЬНІСТЬ (Security IN the Cloud):
- Дані клієнтів та їх encryption
- Application security (code, APIs)
- Identity and Access Management (IAM)
- Network configuration (security groups, VPCs)
- Operating system patches (EC2, VMs)
- Compliance з банківськими регуляціями

### ☁️ VENDOR ВІДПОВІДАЛЬНІСТЬ (Security OF the Cloud):
- Physical datacenter security
- Hardware and network infrastructure
- Hypervisor та virtualization layer
- Managed service infrastructure (RDS, S3, etc.)

**Важливо:** 90% cloud breaches спричинені помилками клієнта, не cloud provider!

---

## 2.7. Total Cost of Ownership (5 років)

### Сценарій: Середній банк, 500K клієнтів

| Компонент | On-Premise | Public Cloud |
|-----------|------------|--------------|
| Initial Setup | $2.5M (hardware, DC) | $50K (setup) |
| Software Licenses | $3M (perpetual) | $4M (subscription) |
| Infrastructure (5y) | $1.5M (power, cooling) | $3M (compute, storage) |
| Staff (5y) | $2M (12 FTE) | $800K (5 FTE) |
| DR/Backup | $1M (2nd DC) | $300K (managed) |
| **TOTAL (5 years)** | **$10M** | **$8.15M** |

**Але:** Cloud може коштувати більше при неефективному використанні ресурсів!

---

## 2.8. Cloud Migration Journey

### Етапи міграції CBS в cloud:

1. **Assessment (2-3 місяці)**
   - Аудит існуючих систем
   - Dependency mapping
   - Cost modeling
   - Risk assessment

2. **Planning (3-4 місяці)**
   - Cloud strategy
   - Architecture design
   - Security framework
   - Compliance validation

3. **Pilot (4-6 місяців)**
   - Міграція non-critical workload
   - Testing
   - Monitoring
   - Refinement

4. **Core Migration (6-12 місяців)**
   - Міграція core banking
   - Phased approach
   - Parallel run
   - Cutover

5. **Optimization (ongoing)**
   - Cost optimization
   - Performance tuning
   - Security hardening
   - Innovation

**Загальний час:** 18-24 місяці для повної міграції

---

## 2.9. Cloud Security Best Practices для CBS

### Must-have security контролі:

#### Zero Trust Architecture
- Never trust, always verify
- Micro-segmentation network
- Least privilege access

#### Data Protection
- Encryption at rest (AES-256) and in transit (TLS 1.3)
- Customer-managed encryption keys (BYOK)
- Data classification та DLP policies

#### Identity & Access
- Multi-factor authentication обов'язкова
- Privileged Access Management (PAM)
- Just-in-time access provisioning

#### Monitoring & Response
- SIEM integration (Splunk, QRadar)
- Cloud Security Posture Management (CSPM)
- Automated incident response playbooks

---

## 2.10. Регуляторні виклики

### 🇺🇦 Україна (НБУ):
- Постанова 95 про кібербезпеку
- Дані мають зберігатися в Україні
- Але: cloud дозволений з proper controls
- Обов'язковий audit trail
- Incident notification < 24h

### 🇪🇺 Європа (EBA):
- EBA Guidelines on Outsourcing
- GDPR compliance критичний
- Data residency в ЄС
- Right to audit cloud provider
- Exit strategy обов'язкова

### Глобальні вимоги:
- **Data sovereignty** - де фізично зберігаються дані
- **Vendor due diligence** - регулярна оцінка cloud provider
- **Contractual safeguards** - SLA, liability, termination права
- **Business continuity** - план виходу з cloud (exit strategy)

---

## 2.11. Кейс: Monzo Bank

### 🇬🇧 Повністю cloud-based CBS (AWS)

**Архітектурні рішення:**
- 100% AWS - жодного власного datacenter
- Microservices - 1500+ сервісів на Go
- Kubernetes - container orchestration
- PostgreSQL на RDS - managed database
- Kafka - event streaming

**Результати:**
- **9M+** клієнтів за 8 років
- **99.99%** uptime SLA
- **<100ms** API response time
- **£0** infrastructure CAPEX

**Урок:** Cloud-native підхід дозволяє швидко масштабуватися без інфраструктурних обмежень

---

# Тема 3: Vendor Risk Assessment

## 3.1. Чому Vendor Risk критичний?

### Статистика:
- **60%** breaches через third-party
- **$4.5M** середня вартість vendor breach
- **73%** банків мали vendor incident
- **200+** днів до виявлення

### Відомі кейси:
- **Target (2013)** - через HVAC vendor, 40M карт
- **Capital One (2019)** - через AWS misconfiguration, 100M клієнтів
- **SolarWinds (2020)** - supply chain attack, 18K організацій
- **MOVEit (2023)** - zero-day, сотні банків

**CBS vendor має доступ до найчутливіших даних банку!**

---

## 3.2. Vendor Risk Management Lifecycle

### 🔄 Безперервний процес:

1. **IDENTIFY - Ідентифікація**
   - Визначення критичних vendors
   - Класифікація за рівнем ризику (Tier 1/2/3)

2. **ASSESS - Оцінка**
   - Due diligence
   - Security questionnaires
   - Certifications перевірка
   - Фінансовий аналіз

3. **MITIGATE - Мітигація**
   - Контрактні safeguards
   - SLA визначення
   - Insurance requirements

4. **MONITOR - Моніторинг**
   - Continuous monitoring
   - Periodic reassessments
   - Incident tracking

5. **REPORT - Звітність**
   - Executive dashboards
   - Регуляторна звітність
   - Board reporting

---

## 3.3. Vendor Risk Tiering

| Tier | Опис | Приклади CBS | Частота перевірки |
|------|------|--------------|-------------------|
| **Tier 1 - Critical** | Критичні системи, доступ до core data | CBS platform, Core DB, Payment systems | Щоквартально |
| **Tier 2 - High** | Важливі системи, sensitive data | Digital channels, CRM, Fraud detection | Щопівроку |
| **Tier 3 - Medium** | Некритичні системи | Marketing tools, Analytics, Reporting | Щорічно |
| **Tier 4 - Low** | Мінімальний вплив | Office supplies, Non-IT services | За потреби |

**CBS Vendors - ЗАВЖДИ Tier 1!**

---

## 3.4. Security Questionnaire

### Ключові категорії питань:

#### Організаційна безпека:
- Організаційна структура security
- CISO позиція та reporting line
- Security policies та procedures
- Security awareness training
- Background checks співробітників

#### Access Control:
- Identity & Access Management
- MFA implementation
- Privileged access management
- Access review process
- Segregation of duties

#### Data Protection:
- Encryption at rest/in transit
- Key management practices
- Data classification scheme
- Data retention policies
- Secure data disposal

#### Incident Response:
- IR plan і playbooks
- SOC capabilities
- Incident notification process
- Recent incidents history
- Forensics capabilities

**Стандартні frameworks:** SIG Questionnaire, CAIQ (Cloud), VSAQ

---

## 3.5. Required Certifications

### Must-have для CBS Vendor:

#### ISO 27001
- ISMS certification
- Scope має покривати CBS platform
- Certificate validity, scope document

#### SOC 2 Type II
- Controls audit
- Criteria: Security, Availability, Confidentiality
- Type II (не Type I) - over time

#### PCI DSS
- Card data security
- Level 1 бажано
- Attestation of Compliance поточна

### Nice-to-have:
- ISO 27017 - Cloud security
- ISO 27018 - Privacy в cloud
- ISO 22301 - Business Continuity
- TISAX - Для європейських банків
- FedRAMP - Для US government

---

## 3.6. Due Diligence Process

### Phase 1: Initial Assessment (2-3 тижні)
- Security questionnaire (200+ питань)
- Certifications verification
- Public information review (breaches, news)
- Financial stability check
- References від існуючих клієнтів

### Phase 2: Deep Dive (3-4 тижні)
- On-site або virtual security audit
- Architecture review
- Code review (якщо можливо)
- Penetration testing review
- DR/BCP plan review
- Зустрічі з CISO, CTO, Compliance

### Phase 3: Contract Negotiation (2-3 тижні)
- SLA визначення (uptime, response times)
- Security obligations у контракті
- Right to audit clause
- Incident notification timelines
- Liability та insurance requirements
- Exit strategy та data return

**Загальний час:** 6-8 тижнів

---

## 3.7. On-site Security Audit

### Що перевіряти:

#### Physical Security:
- Datacenter tier level (3 or 4)
- Access control (biometric, badge)
- Video surveillance
- Environmental controls
- Fire suppression systems

#### Technical Controls:
- Network segmentation
- Firewall rules review
- IDS/IPS configuration
- Patch management process
- Vulnerability scanning

#### Operational Security:
- SOC tour (якщо є)
- Change management process
- Incident response procedures
- Backup та recovery testing
- Security monitoring tools

#### Compliance Evidence:
- Audit reports (останні)
- Penetration test results
- Security metrics dashboard
- Training records
- Policy documents

**Red flags:** Відмова показати критичні зони, застарілі сертифікати, відсутність SOC

---

## 3.8. Contract Security Clauses

### Must-have contractual safeguards:

#### Right to Audit
- Можливість проводити security audits (announced та unannounced)
- Доступ до SOC reports та certifications
- Third-party audit rights

#### Security Incident Notification
- Notification timeline: < 24 години для критичних incidents
- Формат та зміст notification
- Root cause analysis обов'язковий

#### Data Protection
- Data encryption standards (AES-256)
- Data location та residency
- Data retention та deletion procedures
- Subprocessor approval process

#### Service Level Agreements
- Uptime guarantee (99.9%+ для production)
- Response time commitments
- Financial penalties за порушення SLA

#### Exit Strategy
- Data return format та timeline
- Transition assistance period
- Data deletion certification

---

## 3.9. Continuous Monitoring

### Automated Monitoring:
- **Threat Intelligence Feeds** - alerting на mentions vendor в breach databases
- **Financial Monitoring** - credit ratings, financial news
- **Certification Tracking** - expiry dates, renewal reminders
- **Security Posture** - external scans, SSL/TLS config, exposed assets
- **Compliance Changes** - regulatory changes affecting vendor

### Periodic Reviews (Tier 1):

| Активність | Частота |
|------------|---------|
| Security Questionnaire Update | Щоквартально |
| SOC Report Review | При оновленні (≥ annual) |
| On-site Audit | Щорічно |
| Business Review Meeting | Щоквартально |
| DR Test Participation | Щорічно |

---

## 3.10. Risk Scoring Model

### Формула:
**Risk Score = (Inherent Risk × Likelihood) - (Controls Effectiveness)**

#### Inherent Risk (1-10):
- Criticality of service (CBS = 10)
- Data sensitivity (customer PII/PCI = 10)
- Business impact if unavailable (high = 9-10)

#### Likelihood (1-10):
- Vendor security posture (certifications, incidents)
- Threat landscape (targeted industry)
- Geographic location (high-risk countries)

#### Controls Effectiveness (1-10):
- Contractual protections
- Insurance coverage
- Monitoring capabilities
- Compensating controls

### Приклад:
**CBS Vendor:**
Inherent Risk: 10 × Likelihood: 6 = 60
Minus Controls: 8 = **52 (HIGH RISK)**

**Action:** Quarterly reviews, continuous monitoring, DR tests

---

## 3.11. Кейс: Capital One Breach (2019)

### Що сталося:
- **Vendor:** Amazon Web Services (AWS)
- **Breach:** 100M клієнтів, 140K SSN номерів
- **Root cause:** Misconfigured AWS WAF firewall
- **Attacker:** Former AWS employee (знала архітектуру)
- **Вартість:** $270M у settlements + reputational damage

### Уроки:
- ❌ Недостатній cloud expertise
- ❌ Слабкий configuration management
- ❌ Відсутність continuous monitoring
- ❌ Недооцінка shared responsibility

**Висновок:** Навіть з top-tier vendor (AWS) - ваша відповідальність за secure configuration!

---

# Тема 4: Compliance вимоги до CBS

## 4.1. Compliance Landscape

### Багатошаровий регуляторний ландшафт:

#### 🌍 Міжнародні стандарти:
- PCI DSS
- ISO 27001
- SOC 2
- SWIFT CSP

#### 🇪🇺 Європейські регуляції:
- GDPR
- PSD2
- EBA Guidelines
- MiCA
- DORA

#### 🇺🇸 US Regulations:
- SOX
- GLBA
- FFIEC
- FDIC
- OCC Guidelines

#### 🇺🇦 Українські вимоги:
- Постанови НБУ (№95, №128)
- Закон про платіжні системи
- Кіберзахист

**CBS має відповідати ВСІМ applicable регуляціям одночасно!**

---

## 4.2. PCI DSS (Payment Card Industry Data Security Standard)

### Що таке PCI DSS:
- Обов'язковий стандарт для всіх, хто обробляє карткові дані
- Розроблений Visa, Mastercard, Amex, Discover, JCB
- Поточна версія: **PCI DSS v4.0** (2022)
- 4 рівні відповідності

### Compliance Levels:

| Level | Обсяг транзакцій/рік | Вимоги |
|-------|---------------------|--------|
| **Level 1** | > 6M Visa transactions | Annual on-site audit by QSA |
| **Level 2** | 1M - 6M | Annual Self-Assessment (SAQ) |
| **Level 3** | 20K - 1M (e-commerce) | Annual SAQ |
| **Level 4** | < 20K (e-commerce) | Annual SAQ |

**Більшість банків - Level 1**

---

## 4.3. PCI DSS: 12 Core Requirements

### Build and Maintain a Secure Network:
1. **Firewall Configuration** - Захист cardholder data network
2. **No Default Passwords** - Зміна всіх defaults

### Protect Cardholder Data:
3. **Protect Stored Data** - Encryption cardholder data
4. **Encrypt Transmission** - TLS для передачі даних

### Maintain a Vulnerability Management Program:
5. **Antivirus/Malware** - Захист від зловредів
6. **Secure Systems** - Patch management, secure config

### Implement Strong Access Control Measures:
7. **Restrict Access** - Need-to-know basis
8. **Unique IDs** - Унікальні облікові записи
9. **Physical Access** - Контроль фізичного доступу

### Regularly Monitor and Test Networks:
10. **Track Access** - Logging та monitoring
11. **Test Security** - Регулярне тестування

### Maintain an Information Security Policy:
12. **Security Policy** - Документовані політики

**NON-COMPLIANCE:** штрафи до $500K/місяць + заборона processing

---

## 4.4. PCI DSS Implementation в CBS

### Tokenization (Req. 3)
- Заміна PAN на токени
- Реальні номери тільки в secure vault
- CBS працює з tokens

### Encryption at Rest (Req. 3)
- AES-256 для cardholder data
- Separate keys per segment
- HSM для key management

### Network Segmentation (Req. 1)
- CDE ізольована
- Firewall rules
- Minimal ports/protocols

### Access Control (Req. 7-8)
- RBAC з granular permissions
- MFA для admins
- Quarterly access reviews

### Logging (Req. 10)
- Всі операції логуються
- Logs immutable (WORM)
- Retention: 1 рік active + 3 архів

---

## 4.5. SOX (Sarbanes-Oxley Act)

### Що таке SOX:
- US закон 2002 року після Enron, WorldCom
- Публічні компанії (US exchanges)
- Фокус: фінансова звітність, запобігання fraud
- IT системи критичні

### Ключові секції:

#### Section 302 - CEO/CFO Certification
- Підтвердження точності фінансових звітів
- IT має забезпечити data integrity

#### Section 404 - Internal Controls
- Оцінка ефективності internal controls
- IT general controls (ITGC) обов'язкові

**Penalties:** До $5M + 20 років тюрми

---

## 4.6. SOX IT General Controls (ITGC)

### 1. Access Controls:
#### User Access Management
- Формальний процес provisioning/deprovisioning
- Approval workflows
- Quarterly access reviews

#### Privileged Access
- Segregation of duties
- Admin access обмежений
- Just-in-time access

### 2. Change Management:
- Documented change process
- Testing before production
- Approval від бізнесу та IT
- Rollback procedures

### 3. System Development:
- SDLC methodology
- UAT (User Acceptance Testing)
- Code review process
- Separate DEV/TEST/PROD

### 4. Computer Operations:
- Backup та recovery testing
- Job scheduling controls
- Batch processing monitoring
- Incident management

### 5. Business Continuity:
- DR plan documented
- Annual DR testing
- RTO/RPO defined

---

## 4.7. GDPR (General Data Protection Regulation)

### Що таке GDPR:
- EU регуляція з 25 травня 2018
- Захист персональних даних EU резидентів
- Екстратериторіальність
- Штрафи: до €20M або 4% global revenue

### Ключові принципи:
- **Lawfulness** - Legal basis для обробки
- **Purpose Limitation** - Specific purposes
- **Data Minimization** - Мінімум даних
- **Accuracy** - Актуальність
- **Storage Limitation** - Не зберігати довше потрібного
- **Security** - Appropriate measures

**Приклади штрафів:** Amazon €746M, Google €90M, H&M €35M

---

## 4.8. GDPR: Права суб'єктів даних

### Right to Access (Art. 15)
- Клієнт може запросити копію даних
- Machine-readable формат
- Відповідь протягом 1 місяця

### Right to Rectification (Art. 16)
- Виправлення неточних даних
- Self-service updates

### Right to Erasure (Art. 17)
- Видалення даних за запитом
- Exceptions для фінансових records
- Data anonymization

### Right to Data Portability (Art. 20)
- Експорт у structured format
- Передача іншому provider
- Open Banking API

### Right to Object (Art. 21)
- Opt-out з automated decision-making
- Credit scoring, fraud detection

---

## 4.9. GDPR: Technical & Organizational Measures

### Security Measures (Art. 32):

#### Pseudonymization
- Заміна identifiers
- Можливість de-identification

#### Encryption
- At rest та in transit
- State-of-the-art algorithms

#### Access Controls
- Need-to-know principle
- Logging всіх доступів

#### Testing
- Regular security testing
- Vulnerability assessments

### Organizational Measures:

#### Data Protection by Design
- Privacy з початку
- DPIA (Data Protection Impact Assessment)

#### Data Processing Agreements
- Contracts з processors
- Sub-processor management

#### Breach Notification (Art. 33)
- < 72 години до DPA
- Incident response automation

#### Records of Processing (Art. 30)
- Документація processing activities
- Data flow maps

---

## 4.10. Українські регуляторні вимоги

### Постанова №95 (2017) - Кібербезпека:
- Комплексна система кіберзахисту
- Incident response plan
- Звітність до НБУ < 24h
- Penetration testing щорічно

### Постанова №128 (2020) - Звітність:
- Регулярна звітність про tech ризики
- Оцінка критичних IT систем

### Закон "Про платіжні системи":
- Operational resilience вимоги
- 99.5% uptime мінімум
- RTO < 4 години

### Data Residency:
- Дані українців в Україні
- Backup можуть бути за кордоном (EU)
- Cloud providers з presence в Україні

---

## 4.11. Compliance Mapping

| CBS Function | PCI DSS | SOX | GDPR | НБУ |
|--------------|---------|-----|------|-----|
| Data Encryption | ✅ Req 3,4 | ✅ ITGC | ✅ Art 32 | ✅ №95 |
| Access Control | ✅ Req 7,8 | ✅ ITGC | ✅ Art 32 | ✅ №95 |
| Audit Logging | ✅ Req 10 | ✅ ITGC | ✅ Art 30 | ✅ №95 |
| Change Management | ✅ Req 6 | ✅ ITGC | - | ✅ №95 |
| Incident Response | ✅ Req 12 | ✅ ITGC | ✅ Art 33 | ✅ №95 |
| DR/BCP | - | ✅ ITGC | ✅ Art 32 | ✅ Закон ПС |
| Data Retention | ✅ Req 10 | ✅ 7 years | ✅ Art 5 | ✅ 3-5 years |

**Overlap дозволяє:** Один контроль може задовольнити multiple regulations

---

## 4.12. Compliance Automation

### Tools та Technologies:

#### GRC Platforms
- ServiceNow GRC, RSA Archer, MetricStream
- Centralized compliance management
- Policy management, control testing

#### Continuous Compliance Monitoring
- Automated control testing (daily)
- Real-time dashboards
- Deviation alerts

#### Compliance as Code
- Policy-as-code (OPA, Sentinel)
- Infrastructure-as-code checks
- CI/CD compliance gates

#### RegTech Solutions
- AML/KYC automation
- Transaction monitoring
- Regulatory reporting

**ROI:** Automation зменшує compliance costs на 30-50%

---

## Підсумки лекції 2.3

### Ключові висновки:

1. **CBS провайдери:**
   - Топ-3 домінують: Temenos (31%), FIS (24%), Oracle (18%)
   - Challengers відбирають 15-20% нових проектів
   - Security certifications (ISO 27001, SOC 2) must-have

2. **Cloud vs On-Premise:**
   - Hybrid cloud - найпопулярніше (35%)
   - Cloud TCO нижчий, але потребує governance
   - Shared responsibility критична

3. **Vendor Risk:**
   - 60% breaches через third-party
   - Due diligence 6-8 тижнів обов'язковий
   - Continuous monitoring після onboarding

4. **Compliance:**
   - Багатошаровий landscape (PCI DSS, SOX, GDPR, НБУ)
   - Overlap frameworks дозволяє ефективність
   - Automation зменшує costs на 30-50%

---

## Рекомендована література

1. Temenos Platform Architecture Guide
2. FIS Modern Banking Security Framework
3. Oracle FLEXCUBE Security Reference
4. Vendor Risk Management Best Practices
5. PCI DSS v4.0 Requirements
6. GDPR Implementation Guide for Financial Services
7. НБУ Постанова №95 про Кібербезпеку

---

## Додаткові ресурси

- [Temenos Products](https://www.temenos.com/products/banking-software/)
- [FIS Core Banking](https://www.fisglobal.com/en/solutions/core-banking)
- [Oracle FLEXCUBE](https://www.oracle.com/industries/financial-services/banking/flexcube/)
- [PCI Security Standards](https://www.pcisecuritystandards.org/)
- [НБУ Нормативи](https://bank.gov.ua/ua/legislation)

---

**Кінець лекції 2.3**

© 2024 Banking Information Systems Course
