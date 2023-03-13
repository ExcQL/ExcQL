# ExcQL

### A software for translating excel sheets into SQL script

---

### Motivation

Many businesses use excel sheets and want to transfer data to a database, though the learning curve to setup SQL database can be a barrier of entry to many, including some developers. ExcQL is a web app that allows users to generate SQL script and a visualization of their ER diagram by submitting a file supported through excel.

---

### Current version features and bug fixes

v.1.1:

- Ability to upload excel files and specify SQL table to columns in excel file via the UI (currently only support one sheet in one file)
- Ability to process excel file in the backend, translate and determine data relationship to generate an entity relationship (ER) diagram and a SQL table creation script
- Ability to render results in UI after backend finishes processing

---

### Recommendations for next iteration:

Highly recommended:

- Ability to delete table/column mapping on the UI
  - There is ability to add additional rows, but no functionality to delete
- For ER diagrams - dynamically removing anchors from the `_id` columns that aren't serving as targets for edges/relationship connections.

Stretch Goals:

- Change the markers in the ER diagram to using Barker's notation
- Further Refactor code (especially backend) to contain logic and modularize functions
  - The parsing algorithm for receiving and processing excel file could use the most refactoring
- Add test suite; if functions are modularized enough backend unit tests should be possible
- Ability to handle multiple sheets and multiple file inputs
- Implement a database where users can store generated SQL scripts and diagram data for future rendering.
