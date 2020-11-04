import React from "react";
import "__mocks__/axios.js";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, mockRejectedValueOnce } from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () =>{
     const { container } = render(<Application />);

     await waitForElement(() => getByText(container, "Archie Cohen"));

     const appointments = getAllByTestId(container, "appointment");
     const appointment = appointments[0];

     fireEvent.click(getByAltText(appointment, "Add"));

     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
       target: { value: "Lydia Miller-Jones" }
     });
     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

     fireEvent.click(getByText(appointment, "Save"));
     expect(getByText(appointment, "Saving")).toBeInTheDocument()
     
     await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
     
     const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
     expect(getByText(day, "no spots remaining")).toBeInTheDocument(); 
    }) 
  
  it("loads data, cancels an interview and increases the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument()
      
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument()
    
    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
    })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
      );
     expect(getByText(day, "no spots remaining")).toBeInTheDocument(); 
  })

  it("shows the save error when failing to save an appointment", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    axios.put.mockRejectedValueOnce()

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

   
    await waitForElement(() => getByText(appointment, "Error Saving"));
  })

  it("shows the save error when failing to save an appointment", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )

    axios.delete.mockRejectedValueOnce()
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument()
      
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument()
    
    
    await waitForElement(() => getByText(appointment, "Error Deleting"));
  
  })
}) 



