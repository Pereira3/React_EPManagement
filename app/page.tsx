"use client";
// ---------- IMPORTS ----------
import { useState } from "react";
// Importing Components
import Employees from "./containers/Employees/Employees";
import Projects from "./containers/Projects/Projects";

//TODO: Explore Jester and Cypress
//TODO: CSS Support for diferent resolutions

export default function Page() {
  const [type, setType] = useState<"Employees" | "Projects">("Employees");

  return (
    <>
      <nav>
        <h1>Employees & Projects Management</h1>
      </nav>

      <main>
        <button
          className="topButton"
          disabled={type==="Employees"}
          onClick={() => {
            setType("Employees");
          }}
        >
          Employees
        </button>{" "}
        |{" "}
        <button
          className="topButton"
          disabled={type==="Projects"}
          onClick={() => {
            setType("Projects");
          }}
        >
          Projects
        </button>
        {/*Depending on the top button clicked, it will be displayed diferent tables and management buttons*/}
        {type === "Employees" ? <Employees /> : <Projects />}
      </main>
    </>
  );
}