import { EmailSection } from "../types/template";
import { generateThumbnail } from '../utils/thumbnailGenerator';

export const sectionTemplates: EmailSection[] = [
    {
        id: "header-section",
        name: "Header with Logo",
        category: "header",
        thumbnail: generateThumbnail(""),
        html: `
      <table class="section-wrapper" width="100%" border="0" cellpadding="0" cellspacing="0" 
             style="width:100%;max-width:100%;background-color:#FFFFFF">
        <tr>
          <td align="center" valign="top" style="padding:30px 0">
            <table width="600" border="0" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
              <tr>
                <td align="left">
                  <img src="https://i.postimg.cc/4xq9FB9P/logo.png" alt="Company Logo" style="max-width:160px;height:auto" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
        editableFields: [
            {
                id: "logo",
                type: "image",
                label: "Logo",
                placeholder: "https://i.postimg.cc/4xq9FB9P/logo.png",
                defaultValue: "https://i.postimg.cc/4xq9FB9P/logo.png"
            },
            {
                id: "logo_alt",
                type: "text",
                label: "Logo Alt Text",
                placeholder: "Company Logo",
                defaultValue: "Company Logo"
            },
            {
                id: "background_color",
                type: "color",
                label: "Background Color",
                placeholder: "#FFFFFF",
                defaultValue: "#FFFFFF"
            }
        ]
    },
    {
        id: "hero-banner",
        name: "Hero Banner",
        category: "header",
        thumbnail: generateThumbnail(""),
        html: `
      <table class="section-wrapper" width="100%" border="0" cellpadding="0" cellspacing="0" 
             style="width:100%;max-width:100%;background-color:#F7F7F7">
        <tr>
          <td align="center" valign="top" background="https://i.postimg.cc/522mCDKd/cover.png" 
              style="background-size:cover;background-position:center;padding:80px 0">
            <table width="600" border="0" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
              <tr>
                <td align="center" style="padding:0 20px">
                  <h1 style="font-family:Inter,Arial;color:#ffffff;font-size:40px;line-height:45px;
                            font-weight:700;margin:0 0 20px 0">
                    Looking to take your camp's soundtrack to the next level?
                  </h1>
                  <p style="font-family:Inter,Arial;color:#ffffff;font-size:17px;line-height:24px;
                           font-weight:400;margin:0 0 30px 0">
                    At TSM Studios, we're dedicated to providing exceptional music recording services to enhance your camp's experience.
                  </p>
                  <a href="mailto:hello@tsmstudiosny.com" style="display:inline-block;padding:15px 50px;
                           background-color:#ffffff;color:#161616;font-family:Inter,Arial;
                           font-size:14px;font-weight:600;text-decoration:none;border-radius:25px">
                    CONTACT US
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
        editableFields: [
            {
                id: "title",
                type: "text",
                label: "Title",
                placeholder: "Looking to take your camp's soundtrack to the next level?",
                defaultValue: "Looking to take your camp's soundtrack to the next level?"
            },
            {
                id: "description",
                type: "text",
                label: "Description",
                placeholder: "At TSM Studios, we're dedicated to providing exceptional music recording services to enhance your camp's experience.",
                defaultValue: "At TSM Studios, we're dedicated to providing exceptional music recording services to enhance your camp's experience."
            },
            {
                id: "background_image",
                type: "image",
                label: "Background Image",
                placeholder: "https://i.postimg.cc/522mCDKd/cover.png",
                defaultValue: "https://i.postimg.cc/522mCDKd/cover.png"
            },
            {
                id: "button_text",
                type: "text",
                label: "Button Text",
                placeholder: "CONTACT US",
                defaultValue: "CONTACT US"
            },
            {
                id: "button_url",
                type: "link",
                label: "Button URL",
                placeholder: "mailto:hello@tsmstudiosny.com",
                defaultValue: "mailto:hello@tsmstudiosny.com"
            },
            {
                id: "title_color",
                type: "color",
                label: "Title Color",
                placeholder: "#ffffff",
                defaultValue: "#ffffff"
            },
            {
                id: "text_color",
                type: "color",
                label: "Text Color",
                placeholder: "#ffffff",
                defaultValue: "#ffffff"
            },
            {
                id: "button_bg",
                type: "color",
                label: "Button Background",
                placeholder: "#ffffff",
                defaultValue: "#ffffff"
            },
            {
                id: "button_color",
                type: "color",
                label: "Button Text Color",
                placeholder: "#161616",
                defaultValue: "#161616"
            }
        ]
    }
]; 