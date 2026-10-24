// Baseline structural database mock data records configuration arrays
let studentsDatabase = [
    { id: "STU1082", name: "Alexander Wright", email: "alex.w@university.edu", major: "Computer Science", gpa: "3.92" },
    { id: "STU2041", name: "Sophia Martinez", email: "s.martinez@university.edu", major: "Data Science", gpa: "3.78" },
    { id: "STU3109", name: "Marcus Johnson", email: "marcus.j@university.edu", major: "Business Administration", gpa: "3.45" }
];

// Document Object Model element node target assignment captures
const tableBody = document.getElementById('student-table-body');
const studentForm = document.getElementById('student-form');
const searchInput = document.getElementById('global-search');
const totalStudentsText = document.getElementById('total-students-count');
const directoryBadge = document.getElementById('directory-badge');

// Function rendering records array matching current query context properties
function renderStudentDirectory(recordsArray) {
    tableBody.innerHTML = '';
    
    if (recordsArray.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #64748b; padding: 30px;">
                    No matching student records found in current directory.
                </td>
            </tr>
        `;
        return;
    }

    recordsArray.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600; color: #3b82f6;">#${student.id}</td>
            <td style="font-weight: 500;">${student.name}</td>
            <td>${student.email}</td>
            <td><span class="badge" style="background:#eff6ff; color:#3b82f6;">${student.major}</span></td>
            <td style="font-weight: 600;">${student.gpa}</td>
            <td>
                <button class="btn btn-danger delete-btn" data-id="${student.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Wire operational event hooks to newly loaded buttons
    attachDeleteHooks();
}

// Function checking tracking stats indicators values metrics summary row 
function updateSystemMetrics() {
    totalStudentsText.innerText = studentsDatabase.length;
}

// Action form execution data mapping transformations setup hooks
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve input data values
    const name = document.getElementById('student-name').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const major = document.getElementById('student-major').value;
    const gpa = parseFloat(document.getElementById('student-gpa').value).toFixed(2);
    
    // Generate a unique incremental mock student ID code value string
    const newId = `STU${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Construct new dynamic entry payload data object configurations
    const newStudent = { id: newId, name, email, major, gpa };
    
    // Push configuration parameters array shifts setup actions
    studentsDatabase.push(newStudent);
    
    // Refresh interfaces UI engine arrays targets states views definitions
    studentForm.reset();
    updateSystemMetrics();
    renderStudentDirectory(studentsDatabase);
    
    // If active query value filtering exists, update directory context cleanly
    if (searchInput.value) filterDirectoryEngine();
});

// Structural operational element data mutation execution methods
function attachDeleteHooks() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-id');
            
            // Re-evaluate model array dataset mapping exclusions targets elements 
            studentsDatabase = studentsDatabase.filter(student => student.id !== targetId);
            
            // Re-render matching current active data layout engine parameters
            updateSystemMetrics();
            filterDirectoryEngine();
        });
    });
}

// Filtering search handler system configuration execution functions
function filterDirectoryEngine() {
    const query = searchInput.value.toLowerCase().trim();
    
    const matchedRecords = studentsDatabase.filter(student => {
        return student.id.toLowerCase().includes(query) || 
               student.name.toLowerCase().includes(query) || 
               student.major.toLowerCase().includes(query) ||
               student.email.toLowerCase().includes(query);
    });

    // Toggle descriptive textual interface contextual dynamic badge indicators
    if(query) {
        directoryBadge.innerText = `Found ${matchedRecords.length} Results`;
        directoryBadge.style.background = '#dbeafe';
        directoryBadge.style.color = '#2563eb';
    } else {
        directoryBadge.innerText = `Showing All Records`;
        directoryBadge.style.background = '#f1f5f9';
        directoryBadge.style.color = '#64748b';
    }

    renderStudentDirectory(matchedRecords);
}

// Dynamic input hook mapping execution calls variables binds listeners
searchInput.addEventListener('input', filterDirectoryEngine);

// First execution setup baseline view on screen load rendering logic arrays
document.addEventListener('DOMContentLoaded', () => {
    updateSystemMetrics();
    renderStudentDirectory(studentsDatabase);
});
