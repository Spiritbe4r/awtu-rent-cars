interface RequestOptions {
    method?: string;
    headers?: { [key: string]: string };
    body?: any;
}

async function apiRequest(url: string, options: RequestOptions = {}): Promise<any> {
    try {
        const defaultOptions: RequestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const requestOptions: RequestOptions = { ...defaultOptions, ...options };

        if (requestOptions.body) {
            requestOptions.body = JSON.stringify(requestOptions.body);
        }

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("An error occurred during the API request:", error);
        throw error;
    }
}

async function withErrorHandling<T>(fn: () => Promise<T>): Promise<T> {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
  

export const requestUtil = {
    apiRequest,
    withErrorHandling
};
