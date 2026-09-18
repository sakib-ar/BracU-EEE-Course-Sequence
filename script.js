// Strikethrough on lower tables
document.querySelectorAll('.ClickandStrike').forEach(function(table) {
    table.querySelector('tbody').addEventListener("click", function(event) {
        const clickedRow = event.target.closest("tr");
        if (clickedRow && clickedRow.tagName === "TR") {
            clickedRow.classList.toggle("strikethrough");
        }
    });
});

/* Checks all courses to see if their prerequisites are met. Then, if all 'preq' courses are struck through -> it adds a class to show the tick mark.*/
function updatePrereqStatus() {
    // Get all course elements that have a 'preq' attribute
    document.querySelectorAll('.course[preq]').forEach(courseCell => {
        const prereqIds = courseCell.getAttribute('preq').split(',');

        // Check if EVERY prerequisite course has the 'strikethrough' class
        const allPrereqsMet = prereqIds.every(prereqId => {
            const prereqElement = document.getElementById(prereqId.trim());
            return prereqElement && prereqElement.classList.contains('strikethrough');
        });

        // Add or remove the 'prereqs-met' class based on the check
        if (allPrereqsMet) {
            courseCell.classList.add('prereqs-met');
        } else {
            courseCell.classList.remove('prereqs-met');
        }
    });
}

/* Helper function to generate smooth, self-destructing toast warnings */
function showToast(message) {
    
    // 1. Get or create the master toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Create the individual toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;

    // 3. Append to container
    container.appendChild(toast);

    // 4. Automatically garbage collect the element after exit animation completes (4000ms)
    setTimeout(() => {
        toast.remove();
        // Clean container from DOM if empty
        if (container.children.length === 0) {
            container.remove();
        }
    }, 4000);
}

/* Toggles course completion with strict prerequisite validation */
function toggleStrikethrough(element) {
    const getCourseCode = (el) => el.innerHTML.split('<')[0].trim();
    const courseCode = getCourseCode(element);

    // Case 1: Checking prerequisites when trying to mark complete
    if (!element.classList.contains('strikethrough')) {
        const preqAttr = element.getAttribute('preq');
        
        if (preqAttr) {
            const prereqIds = preqAttr.split(',');
            const missingPrereqs = [];

            prereqIds.forEach(id => {
                const prereqElement = document.getElementById(id.trim());
                if (prereqElement && !prereqElement.classList.contains('strikethrough')) {
                    missingPrereqs.push(getCourseCode(prereqElement));
                }
            });

            // Trigger non-blocking error toast with comma-separated list
            if (missingPrereqs.length > 0) {
                showToast(`⚠️ <b>Prerequisite Error:</b> Complete ${missingPrereqs.join(', ')} first.`);
                return; 
            }
        }
    } 
    
    // Case 2: Checking dependent courses when trying to un-complete
    else {
        const poreqAttr = element.getAttribute('poreq');
        
        if (poreqAttr) {
            const postreqIds = poreqAttr.split(',');
            const activePostreqs = [];

            postreqIds.forEach(id => {
                const postreqElement = document.getElementById(id.trim());
                if (postreqElement && postreqElement.classList.contains('strikethrough')) {
                    activePostreqs.push(getCourseCode(postreqElement));
                }
            });

            // Trigger warning toast
            if (activePostreqs.length > 0) {
                showToast(`⚠️ <b>Dependency Warning:</b> Cannot undo ${courseCode}. Please un-check ${activePostreqs.join(', ')} first.`);
                return; 
            }
        }
    }

    // Toggle completion status if validation passes
    element.classList.toggle('strikethrough');
    updatePrereqStatus();

    // Trigger auto-save whenever a cell is successfully toggled
    saveProgress();
}

    //  Mouse hover highlighting
    document.querySelectorAll('.course').forEach(course => {
        course.addEventListener('mouseover', function() {
            const hardPrereqs = this.getAttribute('preq');
            const softPrereqs = this.getAttribute('poreq');

            if (hardPrereqs) {
                hardPrereqs.split(',').forEach(prereqId => {
                    const el = document.getElementById(prereqId.trim());
                    if (el) el.classList.add('highlight');
                });
            }

            if (softPrereqs) {
                softPrereqs.split(',').forEach(prereqId => {
                    const el = document.getElementById(prereqId.trim());
                    if (el) el.classList.add('soft-highlight');
                });
            }
        });

        course.addEventListener('mouseout', function() {
            const hardPrereqs = this.getAttribute('preq');
            const softPrereqs = this.getAttribute('poreq');

            if (hardPrereqs) {
                hardPrereqs.split(',').forEach(prereqId => {
                    const el = document.getElementById(prereqId.trim());
                    if (el) el.classList.remove('highlight');
                });
            }

            if (softPrereqs) {
                softPrereqs.split(',').forEach(prereqId => {
                    const el = document.getElementById(prereqId.trim());
                    if (el) el.classList.remove('soft-highlight');
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', loadProgress); // before: document.addEventListener('DOMContentLoaded', updatePrereqStatus);
	
	document.addEventListener('DOMContentLoaded', () => {
        const icons = document.querySelectorAll('.icon-link');

    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('pulse');
        });

        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('pulse');
        });
    });

    const footer = document.querySelector('.site-footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.querySelectorAll('.footer-text, .icon-link').forEach(el => {
                        el.style.animationPlayState = 'running';
                    });
                    
                    observer.unobserve(footer);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(footer);
    }
});

/* Seamless Scrolling Ticker Duplicator */
document.addEventListener('DOMContentLoaded', () => {
    const tickerContent = document.getElementById('ticker-content');
    if (tickerContent) {
        // Clone the original text span
        const originalSpan = tickerContent.innerHTML;
        // Inject the clone right next to the original
        tickerContent.innerHTML = originalSpan + originalSpan; 
    }
    // Close the modal when clicking outside the modal content box
    document.getElementById('reset-modal').addEventListener('click', function(event) {
        // Check if the actual element clicked was the dark overlay itself
        if (event.target === this) {
            closeResetModal();
        }
});
});

/* Auto-Save, Load & Reset */
function saveProgress() {
    const completedCourses = [];
    // Find all elements with the strikethrough class
    document.querySelectorAll('.course.strikethrough').forEach(course => {
        completedCourses.push(course.id);
    });
    // Save to local storage
    localStorage.setItem('bracu_eee_progress', JSON.stringify(completedCourses));
}

function loadProgress() {
    const savedData = localStorage.getItem('bracu_eee_progress');
    if (savedData) {
        const completedCourseIds = JSON.parse(savedData);
        completedCourseIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('strikethrough');
        });
    }
    // Update UI tick marks based on loaded data
    updatePrereqStatus(); 
}

// Opens the custom modal
function resetProgress() {
    document.getElementById('reset-modal').classList.add('active');
}

// Closes the custom modal without doing anything
function closeResetModal() {
    document.getElementById('reset-modal').classList.remove('active');
}

// Executes the reset when "Yes" is clicked
function confirmReset() {
    localStorage.removeItem('bracu_eee_progress'); // Clear local storage
    
    document.querySelectorAll('.course.strikethrough').forEach(course => {
        course.classList.remove('strikethrough'); // Remove visual strikethroughs
    });
    
    updatePrereqStatus(); // Update the UI logic
    closeResetModal(); // Close the modal and notify the user
    
    showToast("🔄 Progress reset successfully.");
}