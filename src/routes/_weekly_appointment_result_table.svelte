<% const options = {hour: "2-digit", minute: "2-digit"}; %>
<thead>
<tr>
    <th>Termin</th>
    <th>Uhrzeit</th>
    <th>Teilnehmer</th>
    <th>Namen</th>
</tr>
</thead>
<tbody>
<% if(survey.slots.some((slot) => slot.start.getDay() === 1)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 1) { %>
    <tr>
        <td>Montag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 2)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 2) { %>
    <tr>
        <td>Dienstag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>

<% if(survey.slots.some((slot) => slot.start.getDay() === 3)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 3) { %>
    <tr>
        <td>Mittwoch</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 4)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 4) { %>
    <tr>
        <td>Donnerstag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 5)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 5) { %>
    <tr>
        <td>Freitag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 6)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 6) { %>
    <tr>
        <td>Samstag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
<% if(survey.slots.some((slot) => slot.start.getDay() === 0)){
        for(const slot of survey.slots) {
if(slot.start.getDay() === 0) { %>
    <tr>
        <td>Sonntag</td>
        <td>
            <time><%= slot.start.toLocaleTimeString("de", options) %></time>
            bis
            <time><%= slot.end.toLocaleTimeString("de", options) %></time>
        </td>
        <td><%= slot.participants.length %></td>
        <td>
            <% if(slot.participants.length > 0) { %>
                <%= slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`)) %>
            <% } %>
        </td>
    </tr>
<% } } } %>
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
