# ExcQL

### A software for translating excel sheets into SQL script

---

### Motivation

Many businesses use excel sheets and want to transfer data to a database, though the learning curve to setup SQL database can be a barrier of entry to many, including some developers. ExcQL is a web app that allows users to generate SQL script and a visualization of their ER diagram by submitting a file supported through excel.

---

### Current version features and bug fixes

v.1.0:

- Ability to upload excel files and specify SQL table to columns in excel file via the UI
- Mockup of output SQL script and ER diagram from backend
- Ability to process excel file in the backend
- Ability to translate excel file to an object that contains SQL table structure and relationship
- Ability to translate the SQL table structure and relationship into a SQL script

---

### Recommendations for next iteration:

Priority:

- Connect middleware to achieve a working router
  - v.1.0 contains all the individual pieces, but the middlewares have not been connected. **This should be a priority for next iteration** so the app can be fully functional
- Connect backend to frontend
  - Remove usage of dummy data in front end and achieve a fully functional end-to-end product

Highly recommended:

- Ability to delete table/column mapping on the UI
  - There is ability to add additional rows, but no functionality to delete
- For sorting table/column mapping by column letter, ensure column AA occurs after Z, etc.
  - Excel adds one additional (of the same) letter to any column beyond Z. Currently, the app uses default sort method to sort user input regarding table to column mapping. The sorting approach should be revisited to ensure the application can put say, column AA after Z and column BBB after AA.
- For ER diagrams - dynamically removing anchors from the `_id` columns that aren't serving as targets for edges/relationship connections.

Stretch Goals:

- Change the markers in the ER diagram to using Barker's notation
- Refactor code (especially backend) to contain logic and modularize functions
  - The parsing algorithm for receiving and processing excel file could use the most refactoring
- Add test suite; if functions are modularized enough backend unit tests should be possible
- Ability to handle multiple file inputs (currently only support uploading one file at a time)
