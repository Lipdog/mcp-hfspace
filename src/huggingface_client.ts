import fetch from 'node-fetch';

export class HuggingFaceClient {
  private baseUrl = 'https://huggingface.co';
  private apiUrl = 'https://api-inference.huggingface.co';
  
  constructor(private token: string) {}

  async searchModels(query: string, limit: number = 10) {
    const response = await fetch(
      `${this.baseUrl}/api/models?search=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    return await response.json();
  }

  async getModelInfo(modelId: string) {
    const response = await fetch(
      `${this.baseUrl}/api/models/${modelId}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    return await response.json();
  }

  async getModelReadme(modelId: string) {
    const response = await fetch(
      `${this.baseUrl}/api/models/${modelId}/readme`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    return await response.json();
  }

  async runInference(modelId: string, inputs: any, parameters?: any) {
    const response = await fetch(
      `${this.apiUrl}/models/${modelId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs, parameters })
      }
    );
    return await response.json();
  }

  async searchDocs(query: string) {
    const response = await fetch(
      `${this.baseUrl}/api/docs/search?q=${encodeURIComponent(query)}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    return await response.json();
  }
}
