"use client";
// ---------- IMPORTS ----------
import { useState } from "react";
// Importing Components
import NavBar from "./components/NavBar";
import Employees from "./containers/Employees/Employees";
import Projects from "./containers/Projects/Projects";

//TODO: Explore Jester and Cypress
//TODO: Husky recommended avoiding useSates in useEffects (EmployeesButton and ProjectsButton)
//TODO: CSS Support for diferent resolutions

export default function Page() {
  const [type, setType] = useState<"Employees" | "Projects">("Employees");
  const [disabled, setDisable] = useState(0);
  const handleDisablement = (button: number) => setDisable(button);

  return (
    <>
      <NavBar />

      <main>
        <button
          className="topButton"
          disabled={disabled === 0}
          onClick={() => {
            handleDisablement(0);
            setType("Employees");
          }}
        >
          Employees
        </button>{" "}
        |{" "}
        <button
          className="topButton"
          disabled={disabled === 1}
          onClick={() => {
            handleDisablement(1);
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
