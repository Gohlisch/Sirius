<%
const timeOptions = {hour: "2-digit", minute: "2-digit"};
const dateOptions = {weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit"};
const slotsGroupedByStart = groupBy(survey.slots, (slot)=>slot.start.toLocaleDateString("de-DE", dateOptions));
%>

<thead>
<tr>
    <th>Termin</th>
    <th>Uhrzeit</th>
    <th>Teilnehmer</th>
    <th>Namen</th>
</tr>
</thead>
<tbody>
<% for(const date in slotsGroupedByStart) {
        for(const slot of slotsGroupedByStart[date]) { %>
    <tr>
        <% if(slotsGroupedByStart[date].indexOf(slot) === 0) { %>
            <td rowspan="<%= slotsGroupedByStart[date].length %>">
                <%= date.slice(0, date.indexOf(",") + 1) %>
                <time datetime="<%= toDateTimeFormat(slotsGroupedByStart[date][0].start) %>">
                    <%= date.slice(date.indexOf(",") + 1) %>
                </time>
            </td>
        <% } %>
        <td>
            <time><%= slot.start.toLocaleTimeString("de-DE", timeOptions) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de-DE", timeOptions) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } %>
<% if(survey.indisposedParticipants.length > 0) { %>
    <tr>
        <td colspan="2">verhindert</td>
        <td><%= survey.indisposedParticipants.length %></td>
        <% if(survey.indisposedParticipants.length>0) { %>
            <td><%= survey.indisposedParticipants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %></td>
        <% } %>
    </tr>
<% } %>
</tbody>
