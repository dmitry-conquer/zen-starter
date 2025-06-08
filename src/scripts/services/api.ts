const get = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

const post = async <T, R = unknown>(url: string, data: T): Promise<R> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export { get, post };
