# Khondwani Banda | Interactive Personal Website

ICT251 Web Technologies, Activity 3, Mulungushi University.

A responsive student portfolio built with plain HTML5, CSS and JavaScript (no frameworks, no build step), published as a static site on Render.

**Live website:** `PASTE YOUR onrender.com LINK HERE`

## What is on the website

- Introduction area with a "View My Projects" button
- About Me, My Hobbies, Projects and Skills, My Learning Plan (list and table), My Photos, My Media (video and audio) and Contact
- Responsive layout for phones and computers, with visible hover and keyboard focus states

## Folder structure

```
index.html
css/styles.css
js/script.js
images/   (photo1.jpg to photo4.jpg)
videos/   (video.mp4 and audio.mp3)
```

## The four JavaScript features

All logic is in `js/script.js`.

1. **Contact form validation and preview (compulsory).** Checks the name, email and message when the form is submitted. Empty or spaces-only names and messages and badly formatted emails are rejected with a message under the field. A valid form shows a preview on the page without reloading. The form is a browser demonstration only; nothing is sent.
2. **Theme switch.** The button in the header switches between light and dark themes. The choice is saved in the browser.
3. **Gallery viewer.** Previous and Next buttons change the photo and caption. Previous is disabled on the first photo and Next on the last.
4. **Expandable project details.** Each project card has a button that shows or hides its details and changes between "Show details" and "Hide details".

## How to test them

1. **Form:** press "Validate and Preview" with empty fields (three errors), then with only spaces in Name and Message (rejected), then with the email `abc` (rejected), then with valid details (preview appears and says the data was validated, not sent). Press "Clear" to reset.
2. **Theme:** click the header button; the page switches colours and the label changes. Refresh and the choice is kept.
3. **Gallery:** click Next to the last photo (Next becomes disabled), then Previous back to the first (Previous becomes disabled).
4. **Expandable details:** click a project's button to open it, click again to close it, and repeat on the other cards.
5. **Keyboard:** press Tab and check that every link and button shows a visible outline.

## Sources

- Photos, video and audio are my own.
- HTML, CSS and JavaScript reference: W3Schools and MDN Web Docs.
- Written with help from an AI assistant (Claude), then tested and edited by me.
