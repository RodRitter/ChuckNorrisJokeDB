import React from "react";
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import axios from "axios";
import Router from "../Router";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(cleanup);

test("navigates to category page", async () => {
  const mockCategories = { data: ["animal", "career", "celebrity"] };
  const mockJoke = { data: { value: "Lorem ipsum" } };
  mockedAxios.get
    .mockImplementationOnce(() => Promise.resolve(mockCategories))
    .mockImplementationOnce(() => Promise.resolve(mockJoke));

  render(<Router />);

  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  const animalLink = await screen.findByText("animal");
  expect(animalLink).toBeInTheDocument();

  act(() => {
    fireEvent.click(animalLink);
  });

  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(window.location.pathname).toEqual("/category/animal");
  });
});
