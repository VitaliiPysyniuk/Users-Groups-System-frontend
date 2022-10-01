# Users Groups System (frontend part)
<h4>Backend part of the system you can find <a href="https://github.com/VitaliiPysyniuk/Users-Groups-System-backend">here</a>.</h4> 
<hr style="margin-top: 0"/>
<h3>Description</h3>
Simple React application with using of Bootstrap Framework which uses special REST API, the link for API was given 
higher.
<hr style="margin-top: 0"/>
<h3>Used technologies</h3>
<dl>
  <li>JavaScript</li>
  <li>React Framework</li>
  <li>Bootstrap Framework</li>
  <li>Nginx</li>
  <li>Docker compose</li>
</dl>

<hr style="margin-top: 0"/>
<h3>Requirements</h3>
<dl>
  <li>Node >= 16.17.1</li>
  <li>npm >= 8.15.0</li>
</dl>
Before running the application on your machine in the Docker container you need to have docker and docker-compose installed. 
The installation guide you can find <a href="https://docs.docker.com/desktop/">here</a>.
<br>Also you need to add .env file to the root directory of the project.
<br>Example of <code><b>.env</b></code> file:
<pre>
<code><b>
REACT_APP_API_URL=http://127.0.0.1:8000/v1 # base url to the REST API
</b></code></pre>
<hr style="margin-top: 0"/>
<h3>How to run application</h3>
To install all needed packages run following command
<pre>
<code><b>npm install</b></code>
</pre>
Before running application in the Docker container build it with following command
<pre>
<code><b>npm run build</b></code>
</pre>
After that application is ready to be run in the Docker container (you can add <code><b>-d</b></code> flag to run them 
in background)
<pre>
<code><b>docker-compose up </b></code>
</pre>
To stop and remove the Docker container where the application runs
<pre>
<code><b>docker-compose down</b></code>
</pre>
<hr style="margin-top: 0"/>
