<% const options = {hour: "2-digit", minute: "2-digit"}; %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 1)){ %>
    <fieldset>
        <Legend>Montag</Legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 1) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 2)){ %>
    <fieldset>
        <legend>Dienstag</legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 2) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 3)){ %>
    <fieldset>
        <legend>Mittwoch</legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 3) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 4)){ %>
    <fieldset>
        <Legend>Donnerstag</Legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 4) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 5)){ %>
    <fieldset>
        <Legend>Freitag</Legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 5) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 6)){ %>
    <fieldset>
        <Legend>Samstag</Legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 6) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 0)){ %>
    <fieldset>
        <Legend>Sonntag</Legend>
        <% for(let i = 0; i < survey.slots.length; ++i) {
        if(survey.slots[i].start.getDay() === 0) { %>
            <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
        <% } } %>
    </fieldset>
<% } %>
