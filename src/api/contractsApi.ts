import { apiClient } from "./apiClient";

// --- Types based on your Flask backend responses ---
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

export interface ContractCreateResponse {
  success: boolean;
  data: Contract;
}

export interface ContractListResponse {
  success: boolean;
  data: Contract[];
}

export interface ContractUpdateResponse {
  success: boolean;
  data: {
    modifiedCount: number;
  };
}

export interface ContractDeleteResponse {
  success: boolean;
  data: {
    deletedCount: number;
  };
}

export interface ContractDetailedResponse {
  success: boolean;
  data: Contract;
}

export class ContractsAPI {
  /**
   * Upload a contract (docx/pdf/text)
   */
  static async uploadContract(
    file: File,
    title?: string,
  ): Promise<ContractCreateResponse> {
    const formData = new FormData();
    formData.append("file", file);
    if (title) {
      formData.append("title", title);
    }

    return await apiClient.post<ContractCreateResponse>(
      "/contracts/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  /**
   * List all contracts for current user
   */
  static async getUserContracts(): Promise<ContractListResponse> {
    return await apiClient.get<ContractListResponse>("/contracts");
  }

  /**
   * Get single contract by ID
   */
  static async getContract(
    contractId: string,
  ): Promise<ContractCreateResponse> {
    return await apiClient.get<ContractCreateResponse>(
      `/contracts/${contractId}`,
    );
  }

  /**
   * Update contract (title, summary, etc.)
   */
  static async updateContract(
    contractId: string,
    updates: Partial<Contract>,
  ): Promise<ContractUpdateResponse> {
    return await apiClient.put<ContractUpdateResponse>(
      `/contracts/${contractId}`,
      updates,
    );
  }

  /**
   * Delete contract
   */
  static async deleteContract(
    contractId: string,
  ): Promise<ContractDeleteResponse> {
    return await apiClient.delete<ContractDeleteResponse>(
      `/contracts/${contractId}`,
    );
  }

  /**
   * Perform detailed AI analysis on contract (requires file re-upload)
   */
  static async detailedAnalysis(
    contractId: string,
    file: File,
  ): Promise<ContractDetailedResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return await apiClient.post<ContractDetailedResponse>(
      `/contracts/${contractId}/detailed`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }
}
