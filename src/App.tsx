import { useState } from "react";
import { EmailSection } from "./types/template";
import { sectionTemplates } from "./data/sectionTemplates";

function App() {
  const [selectedSections, setSelectedSections] = useState<EmailSection[]>([]);
  const [editingSection, setEditingSection] = useState<EmailSection | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"split" | "preview" | "code">(
    "split"
  );
  const [draggedSection, setDraggedSection] = useState<EmailSection | null>(
    null
  );

  const getThumbnail = (section: EmailSection): string => {
    if (typeof section.thumbnail === "function") {
      return section.thumbnail.call(section);
    }
    return section.thumbnail as string;
  };

  // Handle starting to drag a section from the library
  const handleDragStart = (section: EmailSection) => (e: React.DragEvent) => {
    setDraggedSection(section);
    e.dataTransfer.setData("application/json", JSON.stringify(section));
    e.dataTransfer.effectAllowed = "copy";
  };

  // Handle dropping a section into the canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedSection) return;

    const newSection = {
      ...draggedSection,
      id: `${draggedSection.id}-${Date.now()}`, // Ensure unique ID
    };

    setSelectedSections([...selectedSections, newSection]);
    setDraggedSection(null);
  };

  // Handle dragging over the canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Handle section reordering within the canvas
  const handleSectionDragStart =
    (section: EmailSection) => (e: React.DragEvent) => {
      setDraggedSection(section);
      e.dataTransfer.setData("application/json", JSON.stringify(section));
      e.dataTransfer.effectAllowed = "move";
    };

  const handleSectionDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedSection) return;

    const sections = [...selectedSections];
    const draggedIndex = sections.findIndex((s) => s.id === draggedSection.id);
    if (draggedIndex === -1) return;

    // Reorder sections
    sections.splice(draggedIndex, 1);
    sections.splice(index, 0, draggedSection);
    setSelectedSections(sections);
  };

  // Function to get the complete HTML of the email
  const getCompleteHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
            ${selectedSections.map((section) => section.html).join("\n")}
        </body>
      </html>
    `;
  };

  const handleFieldChange = (field: EditableField, value: string) => {
    if (!editingSection) return;

    const updatedHtml = editingSection.html.replace(
      new RegExp(field.placeholder, "g"),
      value
    );

    const updatedSection = {
      ...editingSection,
      html: updatedHtml,
      editableFields: editingSection.editableFields.map((f) =>
        f.id === field.id ? { ...f, placeholder: value } : f
      ),
    };

    setSelectedSections(
      selectedSections.map((s) =>
        s.id === editingSection.id ? updatedSection : s
      )
    );
    setEditingSection(updatedSection);
  };

  const handleInlineEdit = (
    section: EmailSection,
    event: React.FocusEvent<HTMLElement>
  ) => {
    const element = event.target;
    const field = section.editableFields.find((f) =>
      element.matches(f.selector)
    );

    if (field && field.type === "text") {
      handleFieldChange(field, element.textContent || "");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Section Library Sidebar */}
      <div className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <div className="grid gap-4">
            {sectionTemplates.map((section) => (
              <div
                key={section.id}
                draggable
                onDragStart={handleDragStart(section)}
                className="border rounded-lg p-2 cursor-move hover:border-blue-500"
              >
                <img
                  src={getThumbnail(section)}
                  alt={section.name}
                  className="w-full h-24 object-cover rounded"
                />
                <p className="mt-2 text-sm font-medium">{section.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b bg-white px-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("split")}
              className={`px-3 py-1 rounded ${
                viewMode === "split" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1 rounded ${
                viewMode === "preview"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-3 py-1 rounded ${
                viewMode === "code" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              Code
            </button>
          </div>
          <button
            onClick={() => {
              /* Add export functionality */
            }}
            className="px-4 py-1 bg-green-500 text-white rounded"
          >
            Export
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Visual Preview */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div
              className={`${
                viewMode === "split" ? "w-1/2" : "w-full"
              } bg-gray-50 overflow-y-auto`}
            >
              <div
                className="max-w-[600px] mx-auto my-8 bg-white shadow-lg min-h-[800px]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedSections.map((section, index) => (
                  <div
                    key={section.id}
                    draggable
                    onDragStart={handleSectionDragStart(section)}
                    onDragOver={handleSectionDragOver(index)}
                    className="relative group cursor-move"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: section.html }}
                      onBlur={(e) => handleInlineEdit(section, e)}
                      onClick={(e) => {
                        // Make text elements editable on click
                        const element = e.target as HTMLElement;
                        const field = section.editableFields.find((f) =>
                          element.matches(f.selector)
                        );
                        if (field && field.type === "text") {
                          element.contentEditable = "true";
                          element.focus();
                        }
                      }}
                      className="email-section"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white rounded shadow p-1">
                      <button
                        onClick={() => setEditingSection(section)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setSelectedSections(
                            selectedSections.filter((s) => s.id !== section.id)
                          )
                        }
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code View */}
          {(viewMode === "split" || viewMode === "code") && (
            <div
              className={`${
                viewMode === "split" ? "w-1/2" : "w-full"
              } bg-gray-900 text-gray-100 overflow-y-auto`}
            >
              <pre className="p-4">
                <code>{getCompleteHtml()}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {editingSection && (
        <div className="w-72 bg-white border-l overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Edit Section</h3>
            {editingSection.editableFields.map((field) => (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    defaultValue={field.defaultValue}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="w-full border rounded p-2 text-gray-900 bg-white"
                  />
                )}

                {field.type === "color" && (
                  <div className="flex gap-2">
                    <input
                      type="color"
                      defaultValue={field.defaultValue}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="w-10 h-10"
                    />
                    <input
                      type="text"
                      defaultValue={field.defaultValue}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="flex-1 border rounded p-2 text-gray-900 bg-white"
                    />
                  </div>
                )}

                {field.type === "link" && (
                  <input
                    type="url"
                    defaultValue={field.defaultValue}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="w-full border rounded p-2 text-gray-900 bg-white"
                  />
                )}

                {field.type === "image" && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            handleFieldChange(
                              field,
                              event.target?.result as string
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-gray-900"
                    />
                    <input
                      type="text"
                      defaultValue={field.defaultValue}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className="w-full border rounded p-2 text-gray-900 bg-white"
                      placeholder="Or enter image URL"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
