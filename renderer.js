
const courseList = document.getElementById('courseList');

const totalCoursesDisplay = document.getElementById('totalCourses');
const totalCreditsDisplay = document.getElementById('totalCredits');
const gpaDisplay = document.getElementById('gpa');

const addCourseBtn = document.getElementById('addCourseBtn');
const resetBtn = document.getElementById('resetBtn');

// Grade point system
const gradePoints = {
    'A+': 4.00,
    'A': 3.75,
    'A-': 3.50,
    'B+': 3.25,
    'B': 3.00,
    'B-': 2.75,
    'C+': 2.50,
    'C': 2.25,
    'C-': 2.00,
    'D': 1.75,
    'F': 0.00
};

// Add new course
function addCourse() {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <input
                type="text"
                class="course-input"
                placeholder="Course name"
            >
        </td>

        <td>
            <input
                type="number"
                class="credit-input"
                placeholder="3.0"
                min="0"
                step="0.25"
                value="3"
            >
        </td>

        <td>
            <select class="grade-select">
                ${Object.keys(gradePoints).map(grade =>
                    `<option value="${grade}">${grade}</option>`
                ).join('')}
            </select>
        </td>

        <td class="point">4.00</td>

        <td>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    courseList.appendChild(row);

    // Update when credit or grade changes
    row.querySelector('.credit-input').addEventListener('input', calculateGPA);
    row.querySelector('.grade-select').addEventListener('change', calculateGPA);

    // Delete course
    row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
        calculateGPA();
    });

    calculateGPA();
}

// Calculate GPA
function calculateGPA() {
    const rows = courseList.querySelectorAll('tr');

    let totalCredits = 0;
    let totalGradePoints = 0;

    rows.forEach(row => {
        const creditInput = row.querySelector('.credit-input');
        const gradeSelect = row.querySelector('.grade-select');
        const pointCell = row.querySelector('.point');

        const credit = parseFloat(creditInput.value) || 0;
        const grade = gradeSelect.value;
        const point = gradePoints[grade];

        pointCell.textContent = point.toFixed(2);

        totalCredits += credit;
        totalGradePoints += credit * point;
    });

    const gpa = totalCredits > 0
        ? totalGradePoints / totalCredits
        : 0;

    totalCoursesDisplay.textContent = rows.length;
    totalCreditsDisplay.textContent = totalCredits.toFixed(2);
    gpaDisplay.textContent = gpa.toFixed(2);
}

// Reset everything
function resetCalculator() {
    courseList.innerHTML = '';
    calculateGPA();
}

// Button events
addCourseBtn.addEventListener('click', addCourse);
resetBtn.addEventListener('click', resetCalculator);

// Start with 3 courses
addCourse();
addCourse();
addCourse();
