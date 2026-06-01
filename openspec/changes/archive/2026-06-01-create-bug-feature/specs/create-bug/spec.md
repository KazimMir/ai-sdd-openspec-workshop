## ADDED Requirements

### Requirement: Create a bug with valid input
The system SHALL create a new bug when given a valid Title. On creation it SHALL assign a unique id, set Status to "New", record CreatedAt as the current timestamp, and store the bug in the in-memory store. Description and Severity SHALL be optional.

#### Scenario: Create bug with title only
- **WHEN** a client submits a create request with Title "Login button does nothing" and no other fields
- **THEN** the system creates a bug with a unique id, Status "New", a CreatedAt timestamp, an empty/absent Description, and an unset Severity
- **AND** returns the created bug with HTTP 201

#### Scenario: Create bug with all fields
- **WHEN** a client submits Title "Crash on save", Description "Repro: click save twice", and Severity "P2"
- **THEN** the system creates a bug with those values, Status "New", and a CreatedAt timestamp
- **AND** returns the created bug with HTTP 201

#### Scenario: Title at the 100 character boundary is accepted
- **WHEN** a client submits a Title that is exactly 100 characters long
- **THEN** the system creates the bug successfully

### Requirement: Reject invalid bug input
The system SHALL reject creation when Title is missing/empty or longer than 100 characters. It SHALL return a clear validation error and SHALL NOT create or store a bug.

#### Scenario: Missing title is rejected
- **WHEN** a client submits a create request with no Title (or an empty/whitespace-only Title)
- **THEN** the system returns HTTP 400 with a clear "Title is required" error
- **AND** no bug is added to the store

#### Scenario: Title over 100 characters is rejected
- **WHEN** a client submits a Title that is 101 characters long
- **THEN** the system returns HTTP 400 with a clear "Title must be 100 characters or fewer" error
- **AND** no bug is added to the store

#### Scenario: Invalid severity is rejected
- **WHEN** a client submits a valid Title with a Severity that is not P1, P2, or P3
- **THEN** the system returns HTTP 400 with a clear error
- **AND** no bug is added to the store

### Requirement: Create bug form surfaces validation errors
The frontend SHALL provide a minimal, clean form to create a bug and SHALL display the server's validation error to the user without losing their entered input when creation fails.

#### Scenario: User submits empty title in the UI
- **WHEN** the user submits the create form with an empty Title
- **THEN** the UI displays a clear validation error and does not clear the form

#### Scenario: Successful creation clears the form
- **WHEN** the user submits the form with a valid Title
- **THEN** the bug is created and the form resets to an empty state ready for the next entry
