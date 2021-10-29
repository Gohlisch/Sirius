<%
const options = {hour: "2-digit", minute:"2-digit"};
/**
 * @type {TimeSlot}
 * @external slot
 */
%>

<label>
    <time><%= slot.start.toLocaleTimeString("de", options) %></time> bis
    <time><%= slot.end.toLocaleTimeString("de", options) %></time>
    <input type="checkbox" name="slot<%= i %>">
</label>
