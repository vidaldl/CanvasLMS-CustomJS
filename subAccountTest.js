/*! // Copyright BYU-Idaho 2023 | Version Number: 2.0.8 | Last Updated: Tue Oct 24 2023 */(()=>{var e={14:()=>{},48:()=>{},434:()=>{},461:()=>{},472:(e,o,t)=>{t(14);e.exports=function(){/\/courses\/\d+\/modules\/?$/.test(window.location.pathname)||(window.DT_variables={iframeID:"",path:"https://designtools.ciditools.com/",templateCourse:"216664",hideButton:!1,limitByFormat:!1,formatArray:["online","on-campus","blended"],limitByRole:!1,roleArray:["student","teacher","admin"],limitByUser:!1,userArray:["1234","987654"],overrideAllyHeadings:!1,sortableRubrics:!1,showStudentCards:!1},DpPrimary={lms:"canvas",templateCourse:"273908",hideButton:!1,hideLti:!1,extendedCourse:"",sharedCourse:"",courseFormats:[],canvasRoles:[],canvasUsers:[],canvasCourseIds:[],plugins:[],excludedModules:[],includedModules:[],lang:"en",defaultToLegacy:!0,enableVersionSwitching:!0,hideSwitching:!1},DpConfig={...DpPrimary,...window.DpConfig??{}},$((function(){const e=location.href.includes(".beta.")?"beta.":"",o=DpConfig.toolsUri?DpConfig.toolsUri:`https://${e}designplus.ciditools.com/`;console.log("this is the tollsUri:",o),$.getScript(`${o}js/controller.js`)})))}},935:e=>{function o(e,o){e.forEach((e=>{try{e()}catch(e){console.error(`${o} Feature Error: ${e}`)}}))}e.exports=function(e,t){window.addEventListener("load",(()=>o(t,"Window"))),o(e,"Immediate")}}},o={};function t(r){var s=o[r];if(void 0!==s)return s.exports;var i=o[r]={exports:{}};return e[r](i,i.exports,t),i.exports}(()=>{t(461),t(48),t(434);t(935)([t(472)],[])})()})();


$(document).ready(function() {
    (function() {
        console.log("Minified script and external resources are fully loaded!");

        function isAssignment() {
            const path = window.location.pathname;
            const cottQuizRegex = /^\/courses\/\d+\/quizzes\/\d+$/;
            const cottAssignmentRegex = /^\/courses\/\d+\/assignments\/\d+$/;
            const cottAssignmentList = /^\/courses\/\d+\/assignments\/?$/;
            // Test if the current path matches the pattern
            if (cottQuizRegex.test(path) || cottAssignmentRegex.test(path) || cottAssignmentList.test(path)) {
                return true;
            }
        }

        function getCourseId() {
            const path = window.location.pathname;
            const pathParts = path.split('/');
            const courseIndex = pathParts.indexOf('courses');
            if (courseIndex !== -1 && pathParts[courseIndex + 1]) {
                return pathParts[courseIndex + 1];
            }
            return null;
        }

        /**
         * Creates a modal for selecting course
         */
        function createModal() {
            // Create modal background
            const modalBg = document.createElement('div');
            modalBg.id = 'customModalBg';
            modalBg.style.position = 'fixed';
            modalBg.style.top = '0';
            modalBg.style.left = '0';
            modalBg.style.width = '100%';
            modalBg.style.height = '100%';
            modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modalBg.style.display = 'flex';
            modalBg.style.alignItems = 'center';
            modalBg.style.justifyContent = 'center';
            modalBg.style.zIndex = '9999';

            // Create modal box
            const modalBox = document.createElement('div');
            modalBox.id = 'customModalBox';
            modalBox.style.backgroundColor = 'white';
            modalBox.style.borderRadius = '8px';
            modalBox.style.width = '400px';
            modalBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            modalBox.style.padding = '20px';
            modalBox.style.textAlign = 'center';

            // Modal title
            const modalTitle = document.createElement('h2');
            modalTitle.innerText = 'Course Information';
            modalTitle.style.marginBottom = '15px';

            // Create dropdown container
            const dropdownContainer = document.createElement('div');
            dropdownContainer.style.display = 'flex';
            dropdownContainer.style.justifyContent = 'space-between';
            dropdownContainer.style.marginBottom = '15px';

            // Create "Select Course" dropdown
            const courseSelect = document.createElement('select');
            courseSelect.id = "cott-assignmentCourseList";
            courseSelect.style.width = '48%';
            courseSelect.style.padding = '8px';
            courseSelect.style.border = '1px solid #ddd';
            courseSelect.style.borderRadius = '4px';
            courseSelect.style.fontSize = '16px';
            const courseOption = document.createElement('option');
            courseOption.innerText = 'Select Course';
            courseOption.value = '';
            courseSelect.appendChild(courseOption);

            courseSelect.addEventListener('change', function() {
                // Get course modules
                populateCourseModules();
                document.getElementById('cott-moduleSelectList').disabled = false;

            });

            // Create "Module" dropdown
            const moduleSelect = document.createElement('select');
            moduleSelect.id = "cott-moduleSelectList";
            moduleSelect.style.width = '48%';
            moduleSelect.style.padding = '8px';
            moduleSelect.style.border = '1px solid #ddd';
            moduleSelect.style.borderRadius = '4px';
            moduleSelect.style.fontSize = '16px';
            moduleSelect.disabled = true;
            const moduleOption = document.createElement('option');
            moduleOption.innerText = 'Select Module';
            moduleOption.value = '';
            moduleSelect.appendChild(moduleOption);

            // Append selects to dropdown container
            dropdownContainer.appendChild(courseSelect);
            dropdownContainer.appendChild(moduleSelect);

            // Modal content (loading message)
            const modalContent = document.createElement('p');
            modalContent.id = 'modalContent';




            // Close button
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.style.backgroundColor = '#444444';
            closeButton.style.color = 'white';
            closeButton.style.border = 'none';
            closeButton.style.padding = '8px 16px';
            closeButton.style.borderRadius = '4px';
            closeButton.style.cursor = 'pointer';

            closeButton.addEventListener('click', function() {
                document.body.removeChild(modalBg);
            });


            // Import button
            const importButton = document.createElement('button');
            importButton.className = 'btn';
            importButton.innerText = 'Import';
            importButton.style.backgroundColor = '#007bff';
            importButton.style.color = 'white';
            importButton.style.marginLeft = '5px';

            importButton.addEventListener('click', function() {
                console.log("Import Assignment")
            })


            // Append all elements to modal box
            modalBox.appendChild(modalTitle);
            modalBox.appendChild(dropdownContainer); // Add the dropdowns container
            modalBox.appendChild(modalContent);
            modalBox.appendChild(closeButton);
            modalBox.appendChild(importButton);
            modalBg.appendChild(modalBox);
            document.body.appendChild(modalBg);
        }


        async function populateCourseModules() {
            let courseId = document.getElementById('cott-assignmentCourseList').value
            const apiUrl = `/api/v1/courses/${courseId}/modules`;

            let modules = await apiGetCall(apiUrl);
            let moduleslist = document.getElementById('cott-moduleSelectList');
            for (let module of modules) {
                const moduleOption = document.createElement('option');
                moduleOption.innerText = module.name;
                moduleOption.value = module.id;
                moduleslist.appendChild(moduleOption);
            }
        }

        function createCourseButton(contentWrapper) {
            const button = document.createElement('button');
            button.className = 'btn';
            button.innerText = 'Import Assignment';
            button.style.backgroundColor = '#007bff';
            button.style.color = 'white';

            button.addEventListener('click', function() {
                createModal();
                getCourseData();

                //makeApiCall();
            });

            contentWrapper.prepend(button);
        }

        async function getCourseData() {
        // Get Current User
            const user = await getCurrentUser();

            const enrolledCourses = await getTeachingCourses(user.id);


            let coursesModal = document.getElementById('cott-assignmentCourseList');
            for (let enrollment of enrolledCourses) {
                let courseOption = document.createElement('option');
                courseOption.innerText = enrollment.courseInfo.name;
                courseOption.value = enrollment.courseInfo.id;
                coursesModal.appendChild(courseOption);
            }


        }

        async function apiGetCall(apiUrl) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                return data; // Return the user data
            } catch (error) {
                console.error('Error making API call:', error);
                document.getElementById('modalContent').innerText = 'Error fetching course information.';
                return null; // Return null in case of an error
            }
        }

        async function getCurrentUser() {

            const apiUrl = `/api/v1/users/self`;

            return await apiGetCall(apiUrl);
        }

        /**
         * Gets all courses a user is enrolled in as a teacher
         * @param userId
         */
        async function getTeachingCourses(userId) {


            const apiUrl = `/api/v1/users/${userId}/enrollments?type[]=TeacherEnrollment`;

            let enrollments = await apiGetCall(apiUrl);
            for(let enrollment of enrollments) {
                let courseAPIURL = `/api/v1/courses/${enrollment.course_id}`;
                let courseInfo = await apiGetCall(courseAPIURL);
                enrollment['courseInfo'] = courseInfo;
            }

            return enrollments
        }


        // Mutation observer to detect when .buttons element is added
        function observeForButtonsElement() {
            const targetNode = document.body; // Start observing the entire document body
            const config = { childList: true, subtree: true }; // Observe all child nodes and subtrees

            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        let loadCount = 0;
                        const cottIsQuiz = document.querySelector('.header-group-right');
                        const cottIsAssignment = document.querySelector('.assignment-buttons');
                        const cottIsAssignmentList = document.querySelector('.assignment');
                        // Is Quiz
                        if (cottIsQuiz) {
                            
                            createCourseButton(cottIsQuiz);
                            observer.disconnect(); // Stop observing once we find .header-group-right
                            break;
                            
                            
                        }
                        
                        // Is Assignment
                        if (cottIsAssignment) {
                            createCourseButton(cottIsAssignment);
                            observer.disconnect(); // Stop observing once we find .assignment-buttons
                            break;
                        }

                        // Is AssignmentList
                        if (cottIsAssignmentList) {
                            createCourseButton(cottIsAssignmentList);
                            observer.disconnect();
                            break;
                        }
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        }

        function observeDomChanges() {
            const cottIsAssignmentList = document.querySelector('.ig-row__layout');
            if (!cottIsAssignmentList) return;

            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        // If .buttons is changed, re-insert the button
                        if (!document.querySelector('.api-button')) {
                            createCourseButton(cottIsAssignmentList);
                        }
                    }
                });
            });

            // Observe changes in the child elements of the contentWrapper
            observer.observe(contentWrapper, { childList: true });
        }

        // Only run if it's a course page
        if (isAssignment()) {
            observeForButtonsElement(); // Start observing the DOM for the .buttons element
        
        }
    })();
});
