/*! // Copyright BYU-Idaho 2023 | Version Number: 2.0.8 | Last Updated: Tue Oct 24 2023 */(()=>{var e={14:()=>{},48:()=>{},434:()=>{},461:()=>{},472:(e,o,t)=>{t(14);e.exports=function(){/\/courses\/\d+\/modules\/?$/.test(window.location.pathname)||(window.DT_variables={iframeID:"",path:"https://designtools.ciditools.com/",templateCourse:"216664",hideButton:!1,limitByFormat:!1,formatArray:["online","on-campus","blended"],limitByRole:!1,roleArray:["student","teacher","admin"],limitByUser:!1,userArray:["1234","987654"],overrideAllyHeadings:!1,sortableRubrics:!1,showStudentCards:!1},DpPrimary={lms:"canvas",templateCourse:"273908",hideButton:!1,hideLti:!1,extendedCourse:"",sharedCourse:"",courseFormats:[],canvasRoles:[],canvasUsers:[],canvasCourseIds:[],plugins:[],excludedModules:[],includedModules:[],lang:"en",defaultToLegacy:!0,enableVersionSwitching:!0,hideSwitching:!1},DpConfig={...DpPrimary,...window.DpConfig??{}},$((function(){const e=location.href.includes(".beta.")?"beta.":"",o=DpConfig.toolsUri?DpConfig.toolsUri:`https://${e}designplus.ciditools.com/`;console.log("this is the tollsUri:",o),$.getScript(`${o}js/controller.js`)})))}},935:e=>{function o(e,o){e.forEach((e=>{try{e()}catch(e){console.error(`${o} Feature Error: ${e}`)}}))}e.exports=function(e,t){window.addEventListener("load",(()=>o(t,"Window"))),o(e,"Immediate")}}},o={};function t(r){var s=o[r];if(void 0!==s)return s.exports;var i=o[r]={exports:{}};return e[r](i,i.exports,t),i.exports}(()=>{t(461),t(48),t(434);t(935)([t(472)],[])})()})();


$(document).ready(function() {
    (function() {

        const APIHandler = {
            async apiGetCall(apiUrl) {
                try {
                    let allData = [];
                    let nextUrl = apiUrl;

                    while (nextUrl) {
                        const response = await fetch(nextUrl, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response.ok) {
                            throw new Error('API request failed');
                        }

                        const data = await response.json();
                        if (Array.isArray(data)) {
                            allData = allData.concat(data);
                        } else {
                            return data;
                        }
                        

                        // Check for pagination link
                        const linkHeader = response.headers.get('Link');
                        if (linkHeader) {
                            const links = linkHeader.split(',').reduce((acc, link) => {
                                const match = link.match(/<(.*)>; rel="(.*)"/);
                                if (match) {
                                    acc[match[2]] = match[1];
                                }
                                return acc;
                            }, {});
                            nextUrl = links.next || null;
                        } else {
                            nextUrl = null;
                        }
                    }

                    return allData;
                } catch (error) {
                    console.error('Error making API GET call:', error);
                    document.getElementById('modalContent').innerText = 'Error fetching course information.';
                    return null;
                }
            },

            async apiPostCall(apiUrl, payload) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-CSRF-Token': UtilityFunctions.CSRFtoken()
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        throw new Error('API request failed');
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error making API POST call:', error);
                    document.getElementById('modalContent').innerText = 'Error on Post Call.';
                    return null;
                }
            },

            async apiPutCall(apiUrl, payload) {
                try {
                    const formData = new URLSearchParams();
                    for (const key in payload) {
                        formData.append(key, payload[key]);
                    }
                    const response = await fetch(apiUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRF-Token': UtilityFunctions.CSRFtoken()
                        },
                        body: formData.toString()
                    });

                    if (!response.ok) {
                        throw new Error('API request failed');
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error making API PUT call:', error);
                    document.getElementById('modalContent').innerText = 'Error on Post Call.';
                    return null;
                }
            }
        };

        const UtilityFunctions = {
            CSRFtoken() {
                return decodeURIComponent((document.cookie.match('(^|;) *_csrf_token=([^;]*)') || '')[2])
            },
            getCourseId() {
                const path = window.location.pathname;
                const pathParts = path.split('/');
                const courseIndex = pathParts.indexOf('courses');
                if (courseIndex !== -1 && pathParts[courseIndex + 1]) {
                    return pathParts[courseIndex + 1];
                }
                return null;
            },
            isAssignment() {
                const path = window.location.pathname;

                const cottAssignmentRegex = /^\/courses\/\d+\/assignments\/\d+$/;
                // Check if the current path matches the pattern
                if (cottAssignmentRegex.test(path)) {
                    return true;
                }
            },
            isQuiz() {
                const path = window.location.pathname;
                const cottQuizRegex = /^\/courses\/\d+\/quizzes\/\d+$/;
                if (cottQuizRegex.test(path) ) {
                    return true;
                }
            },
            isDiscussion() {
                const path = window.location.pathname;
                const cottDiscussionRegex = /^\/courses\/\d+\/discussion_topics\/\d+$/;
                if (cottDiscussionRegex.test(path)) {
                    return  true;
                }
            },
            isPage() {
                const path = window.location.pathname;
                const cottPageRegex = /^\/courses\/\d+\/pages\/[\w\W]+$/
                ;
                if (cottPageRegex.test(path)) {
                    return  true;
                }
            },
            isRubric() {
                const path = window.location.pathname;
                const cottRubricRegex = /^\/courses\/\d+\/rubrics$/
                ;
                if (cottRubricRegex.test(path)) {
                    return  true;
                }
            }
        };
        console.log("Minified script and external resources are fully loaded!");


        /**
         * Creates a modal for selecting course
         */
        function createModal(isRubricImport, rubricButtonId) {
            // Create modal background
            const modalBg = document.createElement('div');
            modalBg.id = 'importModalBg';
            modalBg.style.position = 'fixed';
            modalBg.style.top = '0';
            modalBg.style.left = '0';
            modalBg.style.width = '100%';
            modalBg.style.height = '100%';
            modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            modalBg.style.display = 'flex';
            modalBg.style.alignItems = 'center';
            modalBg.style.justifyContent = 'center';
            modalBg.style.zIndex = '9999';

            // Create modal box
            const modalBox = document.createElement('div');
            modalBox.id = 'customModalBox';
            modalBox.style.backgroundColor = 'white';
            modalBox.style.borderRadius = '8px';
            modalBox.style.width = '600px';
            modalBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            modalBox.style.padding = '20px';
            modalBox.style.textAlign = 'left';

            // Modal title
            const modalTitle = document.createElement('h2');
            modalTitle.innerText = isRubricImport ? 'Copy Rubric to My Course' : 'Copy to My Course';
            modalTitle.style.marginBottom = '15px';
            modalTitle.style.fontSize = '24px';
            modalTitle.style.color = '#2d3b45';

            // Create dropdown container
            const dropdownContainer = document.createElement('div');
            dropdownContainer.style.display = 'flex';
            dropdownContainer.style.flexDirection = 'column';
            dropdownContainer.style.gap = '15px';
            dropdownContainer.style.marginBottom = '15px';

            // Create custom searchable dropdown
            const searchableDropdownContainer = document.createElement('div');
            searchableDropdownContainer.style.position = 'relative';
            searchableDropdownContainer.style.width = '90%'; // Adjusted width

            const dropdownButton = document.createElement('div');
            dropdownButton.id = 'cott-assignmentCourseList';
            dropdownButton.style.width = '100%';
            dropdownButton.style.padding = '10px';
            dropdownButton.style.border = '1px solid #ccc';
            dropdownButton.style.borderRadius = '4px';
            dropdownButton.style.cursor = 'pointer';
            dropdownButton.style.backgroundColor = '#fff';
            dropdownButton.style.position = 'relative';
            dropdownButton.textContent = 'Select Term First';
            dropdownButton.id = 'cott-dropdown-button';

            const dropdownArrow = document.createElement('span');
            dropdownArrow.style.position = 'absolute';
            dropdownArrow.style.right = '10px';
            dropdownArrow.style.top = '50%';
            dropdownArrow.style.transform = 'translateY(-50%)';
            dropdownArrow.innerText = '▼';
            dropdownArrow.id = 'cott-dropdown-arrow';
            dropdownButton.appendChild(dropdownArrow);

            const dropdownList = document.createElement('div');
            dropdownList.style.position = 'absolute';
            dropdownList.style.top = '100%';
            dropdownList.style.left = '0';
            dropdownList.style.width = '100%';
            dropdownList.style.border = '1px solid #ccc';
            dropdownList.style.borderTop = 'none';
            dropdownList.style.backgroundColor = '#fff';
            dropdownList.style.maxHeight = '150px';
            dropdownList.style.overflowY = 'auto';
            dropdownList.style.display = 'none';
            dropdownList.style.zIndex = '1000';
            dropdownList.id = 'cott-dropdown-list';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search Course...';
            searchInput.style.width = '100%';
            searchInput.style.padding = '10px';
            searchInput.style.border = '1px solid #ccc';
            searchInput.style.boxSizing = 'border-box';
            searchInput.id = 'cott-search-input';
            dropdownList.appendChild(searchInput);

            const option = document.createElement('div');
            option.textContent = "Select a Term";
            option.style.padding = '10px';
            option.style.cursor = 'pointer';
            option.style.borderBottom = '1px solid #ccc';

            dropdownList.appendChild(option);

            searchInput.addEventListener('input', function () {
                const filter = searchInput.value.toLowerCase();
                Array.from(dropdownList.children).forEach(child => {
                    if (child === searchInput) return;
                    const text = child.textContent.toLowerCase();
                    child.style.display = text.includes(filter) ? '' : 'none';
                });
            });

            dropdownButton.addEventListener('click', function () {
                dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
            });

            searchableDropdownContainer.appendChild(dropdownButton);
            searchableDropdownContainer.appendChild(dropdownList);

            // Create "Module" dropdown
            const moduleSelect = document.createElement('select');
            moduleSelect.id = "cott-moduleSelectList";
            moduleSelect.style.width = '100%';
            moduleSelect.style.padding = '10px';
            moduleSelect.style.border = '1px solid #ccc';
            moduleSelect.style.borderRadius = '4px';
            moduleSelect.style.fontSize = '16px';
            moduleSelect.disabled = true;
            const moduleOption = document.createElement('option');
            moduleOption.innerText = isRubricImport ? 'Select Assignment' : 'Select Module';
            moduleOption.value = '';
            moduleSelect.appendChild(moduleOption);

            moduleSelect.addEventListener('change', function () {
                document.getElementById('cott-importButton').disabled = false;
            });

            // Select 
            const termSelect = document.createElement('select');
            termSelect.id = "cott-term-select-list";
            termSelect.style.width = '100%';
            termSelect.style.padding = '10px';
            termSelect.style.border = '1px solid #ccc';
            termSelect.style.borderRadius = '4px';
            termSelect.style.fontSize = '16px';

            const termOption = document.createElement('option');
            termOption.innerText = 'Select Term';
            termOption.value = '';
            termSelect.appendChild(termOption);

            const termLoadingOption = document.createElement('option');
            termLoadingOption.innerText = 'Loading...';
            termLoadingOption.value = '';
            termSelect.appendChild(termLoadingOption);

            termSelect.addEventListener('change', function () {
                getCourseData(isRubricImport, termSelect.value);
            });

            // Append selects to dropdown container
            dropdownContainer.appendChild(termSelect);
            dropdownContainer.appendChild(searchableDropdownContainer);
            dropdownContainer.appendChild(moduleSelect);

            // Modal content (loading message)
            const modalContent = document.createElement('p');
            modalContent.id = 'modalContent';

            // Close button
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.style.backgroundColor = '#ccc';
            closeButton.style.color = '#333';
            closeButton.style.border = 'none';
            closeButton.style.padding = '10px 20px';
            closeButton.style.borderRadius = '4px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.marginRight = '10px';

            closeButton.addEventListener('click', function () {
                document.body.removeChild(modalBg);
            });

            // Import button
            const importButton = document.createElement('button');
            importButton.id = 'cott-importButton';
            importButton.disabled = true;
            importButton.className = 'btn';
            importButton.innerText = 'Import';
            importButton.style.backgroundColor = '#007bff';
            importButton.style.color = 'white';
            importButton.style.border = 'none';
            importButton.style.padding = '10px 20px';
            importButton.style.borderRadius = '4px';
            importButton.style.cursor = 'pointer';

            importButton.addEventListener('click', function () {
                if (UtilityFunctions.isPage()) {
                    exportSelectedPage();
                } else {
                    if (isRubricImport) {
                        exportSelectedRubric(rubricButtonId);
                    } else {
                        exportSelectedAssingment();
                    }
                }
                importButton.disabled = true;
            });

            // Append all elements to modal box
            modalBox.appendChild(modalTitle);
            modalBox.appendChild(dropdownContainer);
            modalBox.appendChild(modalContent);
            modalBox.appendChild(closeButton);
            modalBox.appendChild(importButton);
            modalBg.appendChild(modalBox);
            document.body.appendChild(modalBg);

            // Populate Course DropDown
            getTerms(isRubricImport);
        }

        async function getTerms(isRubricImport) {
            let termList = document.getElementById('cott-term-select-list');
            termList.removeChild(termList.children[1]);
            let terms = await APIHandler.apiGetCall(`/api/v1/accounts/1/terms?per_page=100`);
            

            for (let term of terms.enrollment_terms) {
                const moduleOption = document.createElement('option');
                moduleOption.innerText = term.name;
                moduleOption.value = term.id;
                termList.appendChild(moduleOption);
            }


        }

        async function exportSelectedPage() {
            let targetCourseId = document.getElementById('cott-dropdown-button').getAttribute('data-course-id');
            let targetModuleId = document.getElementById('cott-moduleSelectList').value;

            let sourcePageUrl = ''
            // Get source Course information
            const path = window.location.pathname;
            const courseMatch = path.match(/\/courses\/(\d+)/);
            let sourceCourseId = courseMatch ? courseMatch[1] : null;


            const pageMatch = path.match(/\/pages\/([A-Za-z-]+)/);
            sourcePageUrl = pageMatch ? pageMatch[1] : null;




            const sourcePage = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/pages/${sourcePageUrl}`);


            const startMigration = await APIHandler.apiPostCall(
                `/api/v1/courses/${targetCourseId}/content_migrations`,
                {
                    migration_type: 'course_copy_importer',
                    settings: {
                        source_course_id: parseInt(sourceCourseId),
                        insert_into_module_id: parseInt(targetModuleId) // Optional, if you want to place in module
                    },
                    selective_import: true
                }
            );


            const coursePages = await APIHandler.apiGetCall(`/api/v1/courses/${targetCourseId}/content_migrations/${startMigration.id}/selective_data?type=wiki_pages`);
            let pageFound = null;

            // Flatten assignments and find the matching assignment
            for(let page of coursePages) {
                if (page.title === sourcePage.title) {
                    pageFound = page.property;
                    break;
                }
            }

            if (pageFound) {
                let payload = {};

                // Only include the assignment you want to import
                payload[pageFound] = 1;
                // Include module insertion if needed
                payload['settings[insert_into_module_id]'] = targetModuleId;


                const completeMigration = await APIHandler.apiPutCall(
                    `/api/v1/courses/${targetCourseId}/content_migrations/${startMigration.id}`,
                    payload
                );

                if(completeMigration) {
                    document.getElementById('modalContent').innerHTML = `<p>Copied ${sourcePage.title} into  course <a target="_blank" href="https://byui.instructure.com/courses/${targetCourseId}/modules#module_${targetModuleId}">${targetCourseId}</a></p>`
                    let importButton = document.getElementById('cott-importButton');
                    document.getElementById('customModalBox').removeChild(importButton);


                }


            } else {
                console.error('Assignment not found in migration content.');
            }
        }
        async function exportSelectedAssingment() {
            let targetCourseId = document.getElementById('cott-dropdown-button').getAttribute('data-course-id');
            let targetModuleId = document.getElementById('cott-moduleSelectList').value;

            let sourceAssignmentId = ''
            // Get source Course information
            const path = window.location.pathname;
            const courseMatch = path.match(/\/courses\/(\d+)/);
            let sourceCourseId = courseMatch ? courseMatch[1] : null;

            if(UtilityFunctions.isQuiz()) {
                let quizMatch = path.match(/\/quizzes\/(\d+)/);
                let quizId = quizMatch ? quizMatch[1]: null;
                if (quizId) {
                    let quiz = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/quizzes/${quizId}`);
                    sourceAssignmentId = quiz.assignment_id;
                }
            } else if(UtilityFunctions.isDiscussion()) {
                let discussionMatch = path.match(/\/discussion_topics\/(\d+)/);
                let discussionId = discussionMatch ? discussionMatch[1]: null;
                if (discussionId) {
                    let discussion = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/discussion_topics/${discussionId}`)
                    sourceAssignmentId = discussion.assignment.id;
                }
            } else {
                const assignmentMatch = path.match(/\/assignments\/(\d+)/);
                sourceAssignmentId = assignmentMatch ? assignmentMatch[1] : null;
            }


            const sourceAssignment = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/assignments/${sourceAssignmentId}`);


            const startMigration = await APIHandler.apiPostCall(
                `/api/v1/courses/${targetCourseId}/content_migrations`,
                {
                    migration_type: 'course_copy_importer',
                    settings: {
                        source_course_id: parseInt(sourceCourseId),
                        insert_into_module_id: parseInt(targetModuleId), // Optional, if you want to place in module
                        insert_into_module_type: "assignment"
                    },
                    // selective_import: true,
                    select: {
                        assignments: [sourceAssignmentId]
                    }
                }
            );

            if(startMigration) {
                document.getElementById('modalContent').innerHTML = `<p>Copied ${sourceAssignment.name} into  course <a target="_blank" href="https://byui.instructure.com/courses/${targetCourseId}/modules#module_${targetModuleId}">${targetCourseId}</a></p>`
                let importButton = document.getElementById('cott-importButton');
                document.getElementById('customModalBox').removeChild(importButton);

            }


        }

        async function exportSelectedRubric(rubricButtonId) {
            let targetCourseId = document.getElementById('cott-dropdown-button').getAttribute('data-course-id');
            let targetAssignmentId = parseInt(document.getElementById('cott-moduleSelectList').value);

            const path = window.location.pathname;
            const courseMatch = path.match(/\/courses\/(\d+)/);
            let sourceCourseId = courseMatch ? courseMatch[1] : null;

            let rubricId = '';
            if(UtilityFunctions.isQuiz()) {
                let quizMatch = path.match(/\/quizzes\/(\d+)/);
                let quizId = quizMatch ? quizMatch[1]: null;
                if (quizId) {
                    let quiz = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/quizzes/${quizId}`);
                    let assignment = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/assignments/${quiz.assignment_id}`);
                    rubricId = assignment.rubric_settings.id;
                }
            } else if(UtilityFunctions.isDiscussion()) {
                let discussionMatch = path.match(/\/discussion_topics\/(\d+)/);
                let discussionId = discussionMatch ? discussionMatch[1]: null;
                if (discussionId) {
                    let discussion = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/discussion_topics/${discussionId}`)
                    let assignment = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/assignments/${discussion.assignment.id}`);
                    rubricId = assignment.rubric_settings.id;
                }
            } else if (UtilityFunctions.isAssignment()) {
                const assignmentMatch = path.match(/\/assignments\/(\d+)/);
                let assignment = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/assignments/${assignmentMatch[1]}`);
                rubricId = assignment.rubric_settings.id;
            } else if (UtilityFunctions.isRubric()) {
                let rubricButton = document.getElementById(rubricButtonId);
                let rubricParentFirstChild = rubricButton.parentElement.firstElementChild
                let selectedRubricLink = rubricParentFirstChild.getAttribute("href");
                const rubricMatch = selectedRubricLink.match(/\/rubrics\/(\d+)/);
                rubricId = rubricMatch ? rubricMatch[1] : null;
            } else {
                const rubricMatch = path.match(/\/rubrics\/(\d+)/);
                rubricId = rubricMatch ? rubricMatch[1] : null;
            }

            if(rubricId && rubricId !== '') {
                let sourceRubric = await APIHandler.apiGetCall(`/api/v1/courses/${sourceCourseId}/rubrics/${rubricId}`);


                const startMigration = await APIHandler.apiPostCall(
                    `/api/v1/courses/${targetCourseId}/content_migrations`,
                    {
                        migration_type: 'course_copy_importer',
                        settings: {
                            source_course_id: parseInt(sourceCourseId)
                        },
                        selective_import: true
                    }
                );

                const rubricsGroup = await APIHandler.apiGetCall(`/api/v1/courses/${targetCourseId}/content_migrations/${startMigration.id}/selective_data?type=rubrics`);
                let rubricFound = null;

                for(let rubric of rubricsGroup) {
                    if (rubric.title === sourceRubric.title) {
                        rubricFound = rubric;
                        break;
                    }
                }

                if (rubricFound) {
                    let payload = {};

                    // Only include the assignment you want to import
                    payload[rubricFound.property] = 1;


                    const completeMigration = await APIHandler.apiPutCall(
                        `/api/v1/courses/${targetCourseId}/content_migrations/${startMigration.id}`,
                        payload
                    );

                    if(completeMigration) {
                        const checkWorkflowState = async () => {
                            let attempts = 0;
                            const maxAttempts = 120; // 60 seconds maximum
                            
                            const intervalId = setInterval(async () => {
                                const migrationStatus = await APIHandler.apiGetCall(
                                    `/api/v1/courses/${targetCourseId}/content_migrations/${completeMigration.id}`
                                );
                                console.log(migrationStatus)
                                attempts++;
                                
                                if (migrationStatus.workflow_state === 'completed' || attempts >= maxAttempts) {
                                    clearInterval(intervalId);
                                    
                                    document.getElementById('modalContent').innerHTML = `<p>Copied ${sourceRubric.title} into course <a target="_blank" href="https://byui.instructure.com/courses/${targetCourseId}/rubrics/>${targetCourseId}</a></p>`
                                    let importButton = document.getElementById('cott-importButton');
                                    document.getElementById('customModalBox').removeChild(importButton);
                
                                    if(targetAssignmentId !== 0) {
                                        // Apply rubric to assignment
                                        let targetCourseRubrics = await APIHandler.apiGetCall(`/api/v1/courses/${targetCourseId}/rubrics`);
                                        for (let rubric of targetCourseRubrics) {
                                            if(rubric.title === sourceRubric.title) {
                                                let payload = {
                                                    rubric_association: {
                                                        rubric_id: rubric.id,
                                                        association_id: parseInt(targetAssignmentId),
                                                        association_type: "Assignment",
                                                        use_for_grading: true,
                                                        hide_score_total: false,
                                                        purpose: "grading"
                                                    }
                                                }
                                                await APIHandler.apiPostCall(`/api/v1/courses/${targetCourseId}/rubric_associations`, payload);
                                            }
                                        }
                                    }
                                }
                            }, 500);
                        };
                    
                        checkWorkflowState();
                    }


                } else {
                    console.error('Rubric not found in migration content.');
                }


            }
        }



        async function populateCourseModules() {
            let courseId = document.getElementById('cott-dropdown-button').getAttribute('data-course-id');
            const apiUrl = `/api/v1/courses/${courseId}/modules`;

            let modules = await APIHandler.apiGetCall(apiUrl);

            let moduleslist = document.getElementById('cott-moduleSelectList');
            for (let module of modules) {
                const moduleOption = document.createElement('option');
                moduleOption.innerText = module.name;
                moduleOption.value = module.id;
                moduleslist.appendChild(moduleOption);
            }
        }

        async function populateAssignments() {
            let courseId = document.getElementById('cott-dropdown-button').getAttribute('data-course-id');
            const apiUrl = `/api/v1/courses/${courseId}/assignments`;

            let assignments = await APIHandler.apiGetCall(apiUrl);
            let assignmentsList = document.getElementById('cott-moduleSelectList');
            const rubricOnly = document.createElement('option');
            rubricOnly.innerText = 'Import Rubric Only';
            rubricOnly.value = 0;
            assignmentsList.appendChild(rubricOnly);

            for (let assignment of assignments) {
                const moduleOption = document.createElement('option');
                moduleOption.innerText = assignment.name;
                moduleOption.value = assignment.id;
                assignmentsList.appendChild(moduleOption);
            }

        }

        function createCourseButton(contentWrapper) {
            const button = document.createElement('a');
            button.classList.add('btn', 'btn-top-nav');
            button.innerText = 'Copy to My Course';
            button.style.backgroundColor = '#007bff';
            button.style.color = 'white';
            button.style.cursor = 'pointer';

            button.addEventListener('click', function() {
                createModal(false);

            });

            contentWrapper.prepend(button);
        }

        function createRubricButton(contentWrapper, buttonId) {
            const button = document.createElement('a');
            button.classList.add('btn', 'btn-top-nav');
            if(UtilityFunctions.isRubric()) {
                button.classList.add('hide-till-hover');
            }
            button.innerText = 'Copy Rubric';
            button.style.backgroundColor = '#007bff';
            button.style.color = 'white';
            button.style.cursor = 'pointer';

            button.id = buttonId;

            button.addEventListener('click', function() {
                createModal(true, buttonId);

            });

            try {
                if (contentWrapper && typeof contentWrapper.append === 'function') {
                    contentWrapper.append(button);
                }
            } catch (error) {
                // Silently handle the error without logging to console
            }
        }

        async function getCourseData(isRubricImport, termId) {
            const dropdownButton = document.getElementById('cott-dropdown-button');
            const dropdownList = document.getElementById('cott-dropdown-list');
            const searchInput = document.getElementById('cott-search-input');
            const dropdownArrow = document.getElementById('cott-dropdown-arrow');
            //clear dropdown
            for (let i = 1; i < dropdownList.children.length; i++) {
                dropdownList.removeChild(dropdownList.children[i]);
            }
            // createLoadingOption
            const loadingOption = document.createElement('div');
            loadingOption.textContent = "Loading...";
            loadingOption.style.padding = '8px';
            loadingOption.style.cursor = 'pointer';
            loadingOption.style.borderBottom = '1px solid #ddd';


            dropdownList.appendChild(loadingOption);


            // Get Current User
            const user = await getCurrentUser();
            const enrolledCourses = await getTeachingCourses(user.id, termId);


            dropdownList.removeChild(dropdownList.children[1]);
            dropdownButton.textContent = "Select Course";
            dropdownButton.appendChild(dropdownArrow);
            enrolledCourses.forEach(enrollment => {

                const option = document.createElement('div');
                option.textContent = enrollment.courseInfo.name;
                option.style.padding = '8px';
                option.style.cursor = 'pointer';
                option.style.borderBottom = '1px solid #ddd';
                option.setAttribute('data-course-id', enrollment.courseInfo.id);


                option.addEventListener('click', function () {
                    dropdownButton.textContent = enrollment.courseInfo.name;
                    dropdownButton.setAttribute('data-course-id', enrollment.courseInfo.id);
                    dropdownButton.appendChild(dropdownArrow);
                    dropdownList.style.display = 'none';
                    searchInput.value = '';

                    // Get course modules
                    if(!isRubricImport) {
                        populateCourseModules();
                    }
                    else {
                        populateAssignments()
                    }

                    document.getElementById('cott-moduleSelectList').disabled = false;
                });

                dropdownList.appendChild(option);
            });


        }


        async function getCurrentUser() {

            const apiUrl = `/api/v1/users/self`;

            return await APIHandler.apiGetCall(apiUrl);
        }

        /**
         * Gets all courses a user is enrolled in as a teacher
         * @param userId
         */
        async function getTeachingCourses(userId, termId) {


            const apiUrl = `/api/v1/users/${userId}/enrollments?type[]=TeacherEnrollment&enrollment_term_id=${termId}`;

            let enrollments = await APIHandler.apiGetCall(apiUrl);
            for(let enrollment of enrollments) {
                let courseAPIURL = `/api/v1/courses/${enrollment.course_id}`;
                let courseInfo = await APIHandler.apiGetCall(courseAPIURL);
                enrollment['courseInfo'] = courseInfo;
            }

            return enrollments
        }


        // Mutation observer to detect when .buttons element is added
        function observeForButtonsElement(targetElement, isRubric, buttonId) {
            const targetNode = document.body; // Start observing the entire document body
            const config = { childList: true, subtree: true }; // Observe all child nodes and subtrees

            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // Is targetElement
                        if (targetElement) {
                            if(isRubric) {
                                createRubricButton(targetElement, buttonId);

                            } else {
                                createCourseButton(targetElement);
                            }
                            observer.disconnect();
                            break;
                        }
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        }

        // Only run if it's a course page
        if (UtilityFunctions.isAssignment() || UtilityFunctions.isQuiz() || UtilityFunctions.isDiscussion() || UtilityFunctions.isPage()) {
            const targetElement = document.querySelector('.right-of-crumbs');
            observeForButtonsElement(targetElement, false); // Start observing the DOM for the .buttons element

            if(!UtilityFunctions.isPage()) {
                const rubricTargetElement = document.querySelector('#rubrics');
                observeForButtonsElement(rubricTargetElement, true);
            }

        } else if (UtilityFunctions.isRubric()) {

            const rubricElements = document.querySelectorAll('li.hover-container span.links');

            for (let elementKey in rubricElements) {
                let element = rubricElements[elementKey]
                observeForButtonsElement(element, true, `copy-rubric-${elementKey}`);
            }
        }
    })();
});
