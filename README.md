# BRACU-EEE-Course-Sequence
Made using BRACU BSEEE Version V3 Recommended Course Sequence (Student Intake from Spring 2020 and onwards)<br>

> [!WARNING]
> Prerequisites are set as per the BRACU-CONNECT requirements, NOT as per BRACU Website. <br> (Prerequisites on the BRACU Website is Outdated!)

---

## 🌐 Live Website
> [!NOTE]
> View the live website on [BRACU EEE - Course PreRequisites](https://bracu-eee-prereq.vercel.app/).

---

### 🔑 Key Features

- **🖱️ Hover Effect :**  
  - **Prerequisites (Yellow) :** When you hover your mouse over a course cell, any required prerequisite courses automatically light up in **Yellow** to show what you need to take first.
  - **Unlocking Next (Green) :** Hovering also instantly highlights future immediate courses in **Green**, showing you what this specific course will unlock (fully or partially) in later semesters.

- **👆🏼 Click to Mark Complete (Strikethrough) :**
  - Click on any course cell within the main sequence table to toggle a clean completion strikethrough line and reduce its opacity.
  - Click on any row within the lower course lists to toggle a matching completion effect.
  - *Note: Table section headers remain entirely unaffected.*

- **✔️ Tick Mark Status (Completion) :**
  - Once you successfully complete **all** the required prerequisites for a course cell, a visual tick mark will automatically appear in its top right corner. This lets you know at a glance that the course is officially unlocked and ready to be taken.

- **⚠️ Intelligent Prerequisite Warnings (Toast Engine) :**
  - If you attempt to mark a course as completed before taking its prerequisites, the system will block the action and trigger a non-blocking toast notification at the top of the screen.
  - The notification acts as a helpful warning, showing you a clean, comma-separated list of all the missing prerequisite courses you need to complete first.
  - It also blocks you from breaking the path backward by warning you if you try to undo a foundational course that a completed future course depends on.

---

### 📂 Course List Organization
Below the interactive sequence grid, courses are divided into distinct categories to make syllabus tracking simpler:
- **Program Core Courses (EEE) :** The must-take EEE courses that form the core of the program.
- **General Education (Gen-Ed) :** Foundational institutional courses.
- **Courses Outside Departments (COD) :** Additional courses available outside the department, known as COD (unofficially), mainly from 3 steams:
  - **[Stream 3]** - Arts and Humanities
  - **[Stream 4]** - Social Sciences
  - **[Stream 5]** - CST (Communities, Seeking Transformation)
- **Program Elective Courses (EEE) :** Department-approved EEE electives that let students specialize in advanced topics aligned with their interests and career goals. There are mainly 4 majors and one Interdisciplinary Field:
  - **Area 1** - Power ⚡
  - **Area 2** - Electronics 💻
  - **Area 3** - Communication and Network 📡
  - **Area 4** - Robotics and Intelligent System 🤖
  - **Interdisciplinary / Emerging Topics 🔗** - Not a Major

---

### 📱 Mobile UX
No more horizontal scrolling required on phones! The layout scales dynamically when viewed on smaller mobile viewports:
- Fixed columns (like Years and Semesters) compress down aggressively to maximize screen landscape.
- Over **80% of your screen width** on mobile is dedicated explicitly to rendering the interactive course boxes cleanly.
- Course titles auto-wrap seamlessly within their grids to avoid breaking bounds or overlapping labels.

---

## ⚖️ License
[MIT LICENSE](LICENSE)