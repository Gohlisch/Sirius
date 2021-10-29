<fieldset>
    <Legend>Täglich</Legend>
    <% for(let i = 0; i < survey.slots.length; ++i) { %>
    <%- include("slot_checkbox.ejs", {slot: survey.slots[i], i: i}) %>
    <% }%>
</fieldset>
