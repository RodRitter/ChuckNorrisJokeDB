import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import Router from "../Router";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  const mockCategories = { data: ["animal", "career", "celebrity"] };
  mockedAxios.get.mockImplementation(() => Promise.resolve(mockCategories));
});

afterEach(cleanup);

test("fetches categories", async () => {
  render(<Router />);

  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});

test("renders search input", async () => {
  render(<Router />);

  const searchElement = await screen.findByPlaceholderText(
    "Search for a joke by keyword"
  );

  expect(searchElement).toBeInTheDocument();
});
