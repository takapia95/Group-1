const axios = require("axios");
const { search } = require("./searchController");

jest.mock("axios");

describe("search function", () => {
  test("should return data from TripAdvisor API", async () => {
    const mockData = { };
    const mockResponse = { data: mockData };

    axios.get.mockResolvedValue(mockResponse);

    const req = {
      query: {
        searchQuery: "New York",
        category: "attractions"
      }
    };
    const res = {
      json: jest.fn()
    };

    await search(req, res);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("searchQuery=New York"));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("category=attractions"));
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("should handle errors properly", async () => {
    const errorMessage = "Error fetching data";
    const mockError = new Error(errorMessage);

    axios.get.mockRejectedValue(mockError);

    const req = {
      query: {
        searchQuery: "London"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await search(req, res);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("searchQuery=London"));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage, error: mockError.response });
  });
});
