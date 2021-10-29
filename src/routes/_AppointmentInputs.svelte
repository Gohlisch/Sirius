<%
 const timeOptions = { hour: "2-digit", minute:"2-digit" };
 const dateOptions = { weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit" };
 const slotsGroupedByStart = groupBy(survey.slots, (slot)=>slot.start.toLocaleDateString("de-DE", dateOptions));
%>
<% for(const date in slotsGroupedByStart) {%>
<fieldset>
    <Legend>
        <%= date.slice(0, date.indexOf(",")+1) %>
        <time datetime="<%= toDateTimeFormat(slotsGroupedByStart[date][0].start) %>">
            <%= date.slice(date.indexOf(",")+1) %>
        </time>
    </Legend>
    <% for(const slot of slotsGroupedByStart[date]) {
        const index = survey.slots.findIndex(s => s===slot); %>
    <%- include("slot_checkbox.ejs", {slot: slot, i: index }) %>
    <% } %>
</fieldset>
<% }%>
