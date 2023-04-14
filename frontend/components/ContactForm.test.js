import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.getByText(/contact form/i);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameElement = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameElement, "122");

  const errorMessages = await screen.findAllByTestId("error");
  expect(errorMessages).toHaveLength(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    errorMessages = screen.getAllByTestId("error");
    expect(errorMessages).toHaveLength(3);
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameElement = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameElement, "travis");

  const lastNameElement = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameElement, "Snapp");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const errormessage = await screen.findAllByTestId("error");
  expect(errormessage).toHaveLength(1);
});

test('renders "email address must be a valid email" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailElement = screen.getByLabelText(/email*/i);
  userEvent.type(emailElement, "travs@outlook");

  const errorMessage = await screen.findByText(
    /email must be a valid email address/i
  );
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const lastNameElement = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameElement, "");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  const messageError = await screen.findByText(/lastname is a required field/i);
  expect(messageError).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const firstNameField = screen.getByLabelText(/first name*/i);
  const lastNameField = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);

  userEvent.type(firstNameField, "travis");
  userEvent.type(lastNameField, "snapp");
  userEvent.type(emailField, "travis@outlook.com");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameDisplay = screen.getByText("travis");
    const lastNameDisplay = screen.getByText("snapp");
    const emailDisplay = screen.getByText("travis@outlook.com");

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const firstNameField = screen.getByLabelText(/first name*/i);
  const lastNameField = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);
  const messageField = screen.getByLabelText(/message/i);

  userEvent.type(firstNameField, "travis");
  userEvent.type(lastNameField, "snapp");
  userEvent.type(emailField, "travis@outlook.com");
  userEvent.type(messageField, "message data");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameDisplay = screen.getByText("travis");
    const lastNameDisplay = screen.getByText("snapp");
    const emailDisplay = screen.getByText("travis@outlook.com");
    const messageDisplay = screen.getByText("message data");

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
  });
});
