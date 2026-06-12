    // Strikethrough on lower tables
    document.querySelectorAll('.ClickandStrike').forEach(function(table) {
        table.querySelector('tbody').addEventListener("click", function(event) {
            const clickedRow = event.target.closest("tr");
            if (clickedRow && clickedRow.tagName === "TR") {
                clickedRow.classList.toggle("strikethrough");
            }
        });
    });

    /**
     * Checks all courses to see if their prerequisites are met.
     * If all 'preq' courses are struck through, it adds a class to show the tick mark.
     */
    function updatePrereqStatus() {
        // Get all course cells that have a 'preq' attribute
        document.querySelectorAll('td.course[preq]').forEach(courseCell => {
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

    function toggleStrikethrough(cell) {
        cell.classList.toggle('strikethrough');
        updatePrereqStatus(); // Re-check all prerequisites after any change
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

    document.addEventListener('DOMContentLoaded', updatePrereqStatus);