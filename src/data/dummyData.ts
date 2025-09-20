export interface Contract {
    id: string;
    title: string;
    uploadDate: string;
    status: "summarized" | "pending" | "detailed";
    summary?: ContractSummary;
}

export interface ContractSummary {
    title: string;
    keyObligations: string[];
    risks: Risk[];
    suggestedEdits: string[];
    rights: string[];
}

export interface Risk {
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
}

export const demoContract: ContractSummary = {
    title: "Software License Agreement - TechCorp Pro",
    keyObligations: [
        "Pay monthly subscription fee of $99/month",
        "Maintain software confidentiality",
        "Provide 30-day notice before termination",
        "Use software only for business purposes",
    ],
    risks: [
        {
            id: "1",
            title: "Automatic Renewal Clause",
            description:
                "Contract automatically renews for 12 months unless cancelled 60 days in advance",
            severity: "high",
        },
        {
            id: "2",
            title: "Hidden Termination Fee",
            description: "Early termination incurs 3 months of remaining payments",
            severity: "high",
        },
        {
            id: "3",
            title: "Data Retention Rights",
            description:
                "Company retains rights to your data for 2 years after termination",
            severity: "medium",
        },
        {
            id: "4",
            title: "Limited Liability Cap",
            description: "Vendor liability is limited to last 3 months of payments",
            severity: "medium",
        },
    ],
    suggestedEdits: [
        "Negotiate shorter auto-renewal period (monthly vs annual)",
        "Add data deletion clause upon termination",
        "Include service level agreement (SLA) guarantees",
        "Clarify intellectual property ownership",
    ],
    rights: [
        "Access to software during subscription period",
        "Customer support during business hours",
        "Data export capabilities",
        "30-day money-back guarantee for new subscribers",
    ],
};

export const userContracts: Contract[] = [
    {
        id: "1",
        title: "Software License Agreement - TechCorp Pro",
        uploadDate: "2024-01-15",
        status: "summarized",
        summary: demoContract,
    },
    {
        id: "2",
        title: "Employment Contract - ABC Company",
        uploadDate: "2024-01-10",
        status: "detailed",
        summary: {
            title: "Employment Contract - ABC Company",
            keyObligations: [
                "Work 40 hours per week",
                "Maintain confidentiality of company information",
                "Give 2 weeks notice before resignation",
            ],
            risks: [
                {
                    id: "1",
                    title: "Non-Compete Clause",
                    description:
                        "Cannot work for competitors for 12 months after leaving",
                    severity: "high",
                },
            ],
            suggestedEdits: [
                "Negotiate non-compete duration and geographic scope",
                "Add severance pay clause",
            ],
            rights: [
                "Health insurance coverage",
                "15 days paid vacation annually",
                "Professional development budget",
            ],
        },
    },
    {
        id: "3",
        title: "Rental Agreement - Downtown Loft",
        uploadDate: "2024-01-05",
        status: "pending",
    },
];
