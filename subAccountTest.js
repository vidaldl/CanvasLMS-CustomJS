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

        function createCourseButton(contentWrapper) {
            const button = document.createElement('button');
            button.className = 'btn';
            button.innerText = 'Run API Call';
            button.style.backgroundColor = '#007bff';
            button.style.color = 'white';

            button.addEventListener('click', function() {
                makeApiCall();
            });

            contentWrapper.prepend(button);
        }

        function makeApiCall() {
            const courseId = getCourseId();
            if (!courseId) {
                alert('Could not determine course ID.');
                return;
            }

            const apiUrl = `/api/v1/courses/${courseId}`;

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                alert(`Course Name: ${data.name}`);
            })
            .catch(error => {
                console.error('Error making API call:', error);
                alert('Error making API call');
            });
        }

        function isElementVisible(element) {
            const style = window.getComputedStyle(element);
            const isVisible = style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';

            // Check if the element contains any text
            const hasText = element.textContent.trim().length > 0;

            return isVisible && hasText;
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
                        const cottIsAssignmentList = document.querySelector('.ig-row__layout');
                        const cootIsAssignmentListLoaded = document.querySelector('.ig-details__item');
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
                        if (cootIsAssignmentListLoaded && isElementVisible(cootIsAssignmentListLoaded)) {
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

        // Only run if it's a course page
        if (isAssignment()) {
            observeForButtonsElement(); // Start observing the DOM for the .buttons element
        }
    })();
});
