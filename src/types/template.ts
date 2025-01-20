export interface EmailSection {
    id: string;
    name: string;
    category: string;
    thumbnail: string | (() => string);
    html: string;
    editableFields: {
        id: string;
        type: 'text' | 'color' | 'image' | 'link' | 'button';
        label: string;
        selector: string; // CSS selector to target the element
        defaultValue: string;
    }[];
}

export interface EmailTemplate {
    id: string;
    name: string;
    sections: EmailSection[];
}

export interface EditableField {
    id: string;
    type: 'text' | 'color' | 'image' | 'link' | 'button';
    label: string;
    placeholder: string;
    defaultValue: string;
} 