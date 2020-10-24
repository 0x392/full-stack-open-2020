import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";

test("the form calls the event handler it received as props with the right details when a new blog is created", () => {
  const mockBlogToAdd = {
    title: "newBlogTitle",
    author: "newBlogAuthor",
    url: "newBlogUrl",
  };
  const mockAddBlogHandler = jest.fn();

  const component = render(<NewBlogForm addBlog={mockAddBlogHandler} />);

  const inputTitle = component.container.querySelector("#new-blog-title");
  const inputAuthor = component.container.querySelector("#new-blog-author");
  const inputUrl = component.container.querySelector("#new-blog-url");
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: mockBlogToAdd.title },
  });

  fireEvent.change(inputAuthor, {
    target: { value: mockBlogToAdd.author },
  });

  fireEvent.change(inputUrl, {
    target: { value: mockBlogToAdd.url },
  });

  fireEvent.submit(form);

  expect(mockAddBlogHandler.mock.calls).toHaveLength(1);
  expect(mockAddBlogHandler.mock.calls[0][0]).toEqual(mockBlogToAdd);
});
