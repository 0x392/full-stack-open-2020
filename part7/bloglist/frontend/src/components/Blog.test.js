import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

describe("test Blog component", () => {
  let mockBlog, mockIdx, mockLikeHandler, mockRemoveHandler;
  let component;

  beforeEach(() => {
    mockBlog = {
      title: "mock-title",
      author: "mock-author",
      url: "http://mockurl.io/",
      likes: 2,
    };
    mockIdx = 3;
    mockLikeHandler = jest.fn();
    mockRemoveHandler = jest.fn();
    component = render(
      <Blog
        blog={mockBlog}
        idx={mockIdx}
        like={mockLikeHandler}
        remove={mockRemoveHandler}
      />
    );
  });

  test('renders "title" and "author", but does not "url" or "likes" by default', () => {
    const blog = component.container.querySelector(".blog");

    expect(blog).toHaveTextContent(mockBlog.title);
    expect(blog).toHaveTextContent(mockBlog.author);
    expect(blog).not.toHaveTextContent(mockBlog.url);
    expect(blog).not.toHaveTextContent(mockBlog.likes);
  });

  test('"url" and "likes" are shown after the "show detail" button has been clicked', () => {
    const button = component.getByText("Show detail");
    fireEvent.click(button);

    const blog = component.container.querySelector(".blog");
    expect(blog).toHaveTextContent(mockBlog.url);
    expect(blog).toHaveTextContent(mockBlog.likes);
  });

  test("event handler is invoked twice while the like button is clicked twice", () => {
    const showDetailButton = component.getByText("Show detail");
    fireEvent.click(showDetailButton);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
