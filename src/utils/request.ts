interface RequestOptions {
    method?: string;
    headers?: { [key: string]: string };
    body?: any;
}

async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
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
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json() as T;
        } else if (response.status === 201 || response.status === 200) {
            // Return an appropriate value to indicate successful user creation
            return { success: true } as T;
        }

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
