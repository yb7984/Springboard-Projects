import React from "react";
import { render, fireEvent, asFragment } from "@testing-library/react";
import Carousel from "./Carousel";

const carouselData = [
  "Photo by Richard Pasquarella on Unsplash",
  "Photo by Pratik Patel on Unsplash",
  "Photo by Josh Post on Unsplash"
];

it("renders without crashing", function () {
  render(<Carousel />);
});


it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // expect the first image to show, but not the second
  expect(queryByAltText(carouselData[0])).toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).not.toBeInTheDocument();
  expect(leftArrow).not.toBeVisible();
  expect(rightArrow).toBeVisible();

  // move forward in the carousel

  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText(carouselData[0])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).not.toBeInTheDocument();
  expect(leftArrow).toBeVisible();
  expect(rightArrow).toBeVisible();

  fireEvent.click(rightArrow);

  // expect the last image to show, hide the right arrow
  expect(queryByAltText(carouselData[0])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).toBeInTheDocument();
  expect(leftArrow).toBeVisible();
  expect(rightArrow).not.toBeVisible();
});


it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // expect the first image to show, but not the second
  expect(queryByAltText(carouselData[0])).toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).not.toBeInTheDocument();
  expect(leftArrow).not.toBeVisible();
  expect(rightArrow).toBeVisible();

  // move to last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the third image to show, but not the first
  expect(queryByAltText(carouselData[0])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).toBeInTheDocument();
  expect(leftArrow).toBeVisible();
  expect(rightArrow).not.toBeVisible();

  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the second image to show
  expect(queryByAltText(carouselData[0])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).not.toBeInTheDocument();
  expect(leftArrow).toBeVisible();
  expect(rightArrow).toBeVisible();


  fireEvent.click(leftArrow);

  // expect the first image to show
  expect(queryByAltText(carouselData[0])).toBeInTheDocument();
  expect(queryByAltText(carouselData[1])).not.toBeInTheDocument();
  expect(queryByAltText(carouselData[2])).not.toBeInTheDocument();
  expect(leftArrow).not.toBeVisible();
  expect(rightArrow).toBeVisible();
});
