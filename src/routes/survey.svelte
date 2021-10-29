<script lang="ts">
	window.onload = ()=>{
		/** @TODO: Add copy to clipboard button */
		const thisSurveyAnchorElement: HTMLAnchorElement = document.querySelector(".share_survey");
		thisSurveyAnchorElement.innerText = window.location as string;
		thisSurveyAnchorElement.href = window.location as string;

		const slotCheckboxElements: Array<HTMLInputElement> =  document.querySelectorAll(".appointment_survey [type=\"checkbox\"]") as Array<HTMLInputElement>;
		const nameInputElement: HTMLInputElement = document.querySelector("[name=\"participant\"]");
		const warningParagraphElement = document.querySelector(".appointment_survey .warning");
		const determineWarningVisibility = ()=>{
			if(nameInputElement.value === "" ||
				Array.from(slotCheckboxElements).some((cb)=>cb.checked)
			) {
				warningParagraphElement.classList.add("hidden");
			} else {
				warningParagraphElement.classList.remove("hidden");
			}
		};
		slotCheckboxElements.forEach((element: HTMLInputElement)=>{
			element.onchange = ()=>{
				if(element.checked) {
					element.parentElement.classList.add("selected_slot");
				}
				else {
					element.parentElement.classList.remove("selected_slot");
				}
				determineWarningVisibility();
			};
		});
		nameInputElement.oninput = determineWarningVisibility;
	}
</script>
<style>
    .no_bottom_padding {
        margin-bottom: 0;
    }

    main nav {
        font-size: 0.8em;
    }

    main nav > a {
        margin-left: 1em;
        margin-right: 1em;
        color: var(--inactive_color);
        text-decoration: none;
    }

    .appointment_survey fieldset label {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-weight: bolder;
        justify-content: center;
        align-items: center;
        word-spacing: 2px;
        height: 5em;
        width: 5em;
        border: solid black 1px;
        flex-grow: 0;
        flex-shrink: 0;
        /** @TODO Make not selectable */
    }

    .appointment_survey fieldset label:hover, .appointment_survey fieldset label:focus {
        border-color: var(--bright_main_color);
    }

    .selected_slot {
        background-color: var(--bright_main_color);
    }

    .appointment_survey [type="checkbox"] {
        position:absolute;
        left: -100vh
    }

    .appointment_survey fieldset {
        display: flex;
        align-items: stretch;
        align-content: stretch;
        overflow-x: auto;
        min-width: 0;
        flex-grow: 0;
        flex-shrink: 1;
    }

    .table_container {
        overflow-x: scroll;
    }

    .hidden {
        visibility: hidden;
        font-size: 0;
    }

    @media screen and (max-width:415px) {
        main nav {
            display: flex;
            flex-direction: column;
            font-size: 1em;
        }

        main nav > a {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .appointment_survey fieldset {
            flex-direction: column;
            height: auto;
            max-height: 200px;
        }

        .appointment_survey fieldset label {
            height: 44px;
            width: auto;
            flex-direction: row;
        }

        .appointment_survey fieldset label time {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
</style>
<%
/**
* @type {AppointmentSurvey}
* @external survey
*/
/** @external groupBy */
/** @external toDateTimeFormat */
%>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sirius – <%= survey.title %></title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/survey.css">
    <script src="js/survey.js"></script>
    <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
<div class="grid_container">
    <%- include("includes/header.ejs") %>
    <%- include("includes/nav.ejs") %>
    <main>
        <h2 class="no_bottom_padding"><%= survey.title %></h2>
        <nav>
            <a href="#description">Beschreibung</a>
            <a href="#survey">Umfrageformular</a>
            <a href="#results">Ergebnisse</a>
        </nav>
        <% /** @TODO add copy button */ %>
        <p>Teile diese Umfrage: <a class="share_survey"></a></p>
        <section id="description">
            <h3>Beschreibung</h3>
            <p><%= survey.description %></p>
        </section>
        <section class="appointment_survey" id="survey">
            <h3>Dann habe ich Zeit</h3>
            <form action="<%= survey.id %>" method="post">
                <label>Name:<input
                        required
                        type="text"
                        name="participant"
                        placeholder="max. 64 Zeichen"
                        maxlength="64"></label>
                <% if(survey.repetition === "weekly"){ %>
                <%- include("includes/weekly_appointment_inputs.ejs", survey) %>
                <% } else if(survey.repetition === "daily"){ %>
                <%- include("includes/daily_appointment_inputs.ejs", survey) %>
                <% } else { %>
                <%- include("includes/appointment_inputs.ejs", {
                survey: survey,
                groupBy: groupBy,
                toDateTimeFormat: toDateTimeFormat
            }) %>
                <% } %>
                <p class="warning hidden">
                    <strong>
                        WARNUNG: Sie haben zur Zeit keine Slots ausgewählt.
                        Wenn Sie nun senden, werden Sie als verhindert aufgeführt.
                    </strong>
                </p>
                <input type="submit">
            </form>
        </section>
        <section id="results">
            <h3>Ergebnisse</h3>
            <div class="table_container">
                <table>
                    <% if(survey.repetition === "weekly"){ %>
                    <%- include("includes/weekly_appointment_result_table.ejs", survey) %>
                    <% } else if(survey.repetition === "daily"){ %>
                    <%- include("includes/daily_appointment_result_table.ejs", survey) %>
                    <% } else { %>
                    <%- include("includes/appointment_result_table.ejs", {
                    survey: survey,
                    groupBy: groupBy,
                    toDateTimeFormat: toDateTimeFormat
                }) %>
                    <% } %>
                </table>
            </div>
        </section>
    </main>
</div>
<%- include("includes/footer.ejs") %>
</body>
</html>
