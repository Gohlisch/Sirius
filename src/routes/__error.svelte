<div class="grid_container">
    <%- include("includes/header.ejs") %>
    <%- include("includes/nav.ejs") %>
    <main>
        <h2>Ups! Etwas ist schiefgelaufen! 🙁</h2>
        <p>Fehlercode <%- error_code %></p>
        <p><%- error_message %></p>
        <% if(error_media) { %>
        <img src="img/<%= error_media.pathFromPublic %>"
        alt="<%= error_media.alt %>">
        <% } %>
    </main>
</div>
