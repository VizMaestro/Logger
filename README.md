
# Logger

LoggerUI is a Figma plugin designed to help users log changes made to pages and frames within their Figma projects. The plugin provides an easy-to-use interface with two tabs: "Page log" and "Frame log".

## Features

1. **Page Log Tab**:
   - A text area box with the placeholder "Describe the change" where users can enter the change made to the page (mandatory field).
   - A smaller text box with the placeholder "Change requested by" where users can enter the name of the person who requested the change (optional field).
   - A "Log change" button that is enabled only when the mandatory fields are filled.

2. **Frame Log Tab**:
   - A drop-down menu with the default value "Select frame" that shows the list of frames on the current page. Users can also select a frame directly on the page, and the frame name will be populated in the drop-down (mandatory field).
   - A text area box with the placeholder "Describe the change" where users can enter the change made to the frame (mandatory field).
   - A smaller text box with the placeholder "Change requested by" where users can enter the name of the person who requested the change (optional field).
   - A "Log change" button that is enabled only when the mandatory fields are filled.

## Usage Instructions

1. **Page Log**:
   - Navigate to the "Page log" tab.
   - Enter the description of the change in the "Describe the change" text area.
   - (Optional) Enter the name of the person who requested the change in the "Change requested by" text box.
   - Click the "Log change" button (enabled only when the mandatory fields are filled).

2. **Frame Log**:
   - Navigate to the "Frame log" tab.
   - Select a frame from the "Select frame" drop-down menu or directly select a frame on the page.
   - Enter the description of the change in the "Describe the change" text area.
   - (Optional) Enter the name of the person who requested the change in the "Change requested by" text box.
   - Click the "Log change" button (enabled only when the mandatory fields are filled).

## Logic

1. **Page Log**:
   - When the user clicks the "Log change" button, the plugin checks if there is a page named "Change log" in Figma. If not, it creates one.
   - The plugin then creates a text field with the name of the page for which the log is created within the "Change log" page and adds the following values:
     - Date and time of the log
     - User's name requesting the change
     - Change description
   - If the page and text already exist, the plugin appends the new values to the existing text.

2. **Frame Log**:
   - When the user clicks the "Log change" button, the plugin checks if there is a text field on the frame with the name "Frame log". If not, it creates the text field within the selected frame (top left corner) and adds the following values:
     - Date and time of the log
     - User's name requesting the change
     - Change description
   - If the text field already exists, the plugin appends the new values to the existing text within the frame.

## Conclusion

Logger is a powerful plugin for tracking changes in Figma projects, making it easier to manage and document modifications to pages and frames. With its intuitive interface and robust logging capabilities, Logger is an essential plugin for any Figma user.
