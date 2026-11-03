/* =========================================================
   SIVA INTERNATIONAL SCHOOL
   SCHOOL MANAGEMENT SYSTEM
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Siva International School website loaded.");

    setCurrentPage();

    addScrollAnimation();

    addTableEffects();

    checkImages();

    addAttendanceColor();

});


/* =========================================================
   2. CURRENT PAGE HIGHLIGHT
   =========================================================
   
   This code checks which page is currently open.
   Then it adds the "active" class to that navigation link.
*/

function setCurrentPage() {

    const currentPage =
        window.location.pathname.split("/").pop();

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   3. NAVIGATION CLICK MESSAGE
   =========================================================
   
   This is only a simple console message.
   The target="_blank" in HTML opens the page in a new tab.
*/

const navigationLinks =
    document.querySelectorAll("nav a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log(
            "Opening page: " +
            link.getAttribute("href")
        );

    });

});


/* =========================================================
   4. CONTACT FORM
   =========================================================
   
   The contact form does not actually send an email because
   this is a frontend-only project.

   Instead, JavaScript checks the form and displays
   a success message.
*/

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            // Stop the browser from refreshing the page
            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value.trim();


            const email =
                document.getElementById("email")
                    .value.trim();


            const phone =
                document.getElementById("phone")
                    .value.trim();


            const subject =
                document.getElementById("subject")
                    .value.trim();


            const message =
                document.getElementById("message")
                    .value.trim();


            /* -----------------------------------------
               CHECK EMPTY FIELDS
               ----------------------------------------- */

            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                subject === "" ||
                message === ""
            ) {

                alert(
                    "Please fill in all the fields."
                );

                return;

            }


            /* -----------------------------------------
               EMAIL VALIDATION
               ----------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            /* -----------------------------------------
               PHONE VALIDATION
               ----------------------------------------- */

            const phonePattern =
                /^[0-9]{10}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            /* -----------------------------------------
               SUCCESS MESSAGE
               ----------------------------------------- */

            alert(
                "Thank you, " +
                name +
                "!\n\n" +
                "Your message has been submitted successfully.\n" +
                "Our school office will contact you soon."
            );


            /* Clear the form */

            contactForm.reset();

        }
    );

}


/* =========================================================
   5. SCROLL REVEAL ANIMATION
   =========================================================
   
   Cards and sections appear smoothly when the user
   scrolls down the page.
*/

function addScrollAnimation() {

    const elements =
        document.querySelectorAll(
            ".feature-card, " +
            ".value-card, " +
            ".facility-card, " +
            ".teacher-card, " +
            ".attendance-card, " +
            ".number-card"
        );


    if (elements.length === 0) {

        return;

    }


    elements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   6. TABLE ROW EFFECT
   =========================================================
   
   When the user clicks a student row, it gets highlighted.
*/

function addTableEffects() {

    const rows =
        document.querySelectorAll(
            "tbody tr"
        );


    rows.forEach(function (row) {

        row.addEventListener(
            "click",
            function () {

                rows.forEach(function (otherRow) {

                    otherRow.classList.remove(
                        "selected-row"
                    );

                });


                row.classList.add(
                    "selected-row"
                );


                console.log(
                    "Selected student record."
                );

            }
        );

    });

}


/* =========================================================
   7. ATTENDANCE COLOR
   =========================================================
   
   This checks attendance percentage.

   90% and above = Excellent
   75% to 89% = Good
   Below 75% = Low
*/

function addAttendanceColor() {

    const attendanceValues =
        document.querySelectorAll(
            ".good, .excellent"
        );


    attendanceValues.forEach(
        function (item) {

            const percentageText =
                item.textContent.trim();


            const percentage =
                parseInt(
                    percentageText
                );


            if (isNaN(percentage)) {

                return;

            }


            if (percentage >= 90) {

                item.classList.add(
                    "excellent"
                );

            }
            else if (percentage >= 75) {

                item.classList.add(
                    "good"
                );

            }

        }
    );

}


/* =========================================================
   8. IMAGE ERROR CHECK
   =========================================================
   
   If an image cannot load, JavaScript prints its
   source in the browser console.
*/

function checkImages() {

    const images =
        document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                console.log(
                    "Image could not be loaded: " +
                    image.src
                );

            }
        );


        image.addEventListener(
            "load",
            function () {

                console.log(
                    "Image loaded successfully."
                );

            }
        );

    });

}


/* =========================================================
   9. ATTENDANCE CALCULATOR
   =========================================================
   
   This function calculates attendance percentage.

   Example:

   calculateAttendance(165, 180)

   Result:
   91.67%
*/

function calculateAttendance(
    presentDays,
    totalDays
) {

    if (totalDays <= 0) {

        return 0;

    }


    const percentage =
        (presentDays / totalDays) * 100;


    return percentage.toFixed(2);

}


/* =========================================================
   10. STUDENT SEARCH FUNCTION
   =========================================================
   
   If later you add an input with:

   id="studentSearch"

   this function can be used to search student names
   inside the table.
*/

const studentSearch =
    document.getElementById(
        "studentSearch"
    );


if (studentSearch) {

    studentSearch.addEventListener(
        "keyup",
        function () {

            const searchValue =
                studentSearch.value
                    .toLowerCase();


            const rows =
                document.querySelectorAll(
                    "tbody tr"
                );


            rows.forEach(function (row) {

                const rowText =
                    row.textContent
                        .toLowerCase();


                if (
                    rowText.includes(
                        searchValue
                    )
                ) {

                    row.style.display =
                        "";

                }
                else {

                    row.style.display =
                        "none";

                }

            });

        }
    );

}


/* =========================================================
   11. SIMPLE WELCOME FUNCTION
   =========================================================
   
   This function can be used from any button.

   Example:

   <button onclick="showWelcomeMessage()">
       Welcome
   </button>
*/

function showWelcomeMessage() {

    alert(
        "Welcome to Siva International School!"
    );

}


/* =========================================================
   12. PHONE NUMBER CHECK
   ========================================================= */

function isValidPhone(phoneNumber) {

    const phonePattern =
        /^[0-9]{10}$/;


    return phonePattern.test(
        phoneNumber
    );

}


/* =========================================================
   13. EMAIL CHECK
   ========================================================= */

function isValidEmail(emailAddress) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        emailAddress
    );

}


/* =========================================================
   14. CURRENT YEAR
   =========================================================
   
   If a footer contains:

   <span id="currentYear"></span>

   JavaScript automatically puts the current year there.
*/

const yearElement =
    document.getElementById(
        "currentYear"
    );


if (yearElement) {

    const currentYear =
        new Date().getFullYear();


    yearElement.textContent =
        currentYear;

}


/* =========================================================
   15. PAGE TITLE CONSOLE MESSAGE
   ========================================================= */

console.log(
    "Current page: " +
    document.title
);


/* =========================================================
   16. SCHOOL WEBSITE READY
   ========================================================= */

console.log(
    "Siva International School School Management System is ready."
);