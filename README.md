<h1 align="center">❤️ Heart Disease Prediction App</h1>

<p align="center">
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.13-blue" alt="Python"></a>
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-HighPerformance-green" alt="FastAPI"></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-UI-blue" alt="React"></a>
</p>

<hr>

<h2>📖 About</h2>
<p>
The <b>Heart Disease Prediction App</b> is a full-stack application that predicts the risk of heart disease based on clinical parameters.
It uses a <b>machine learning model</b> on the backend (FastAPI) and a <b>React frontend</b> for input and result display.  
Developers can also export MongoDB data to CSV for analysis or backup.
</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li>Predict heart disease risk based on user input</li>
  <li>Real-time predictions using FastAPI backend</li>
  <li>User-friendly React frontend</li>
  <li>Heuristic fallback if model prediction fails</li>
  <li>Export MongoDB data to CSV</li>
  <li>Deployable on Render</li>
</ul>

<hr>

<h2>🗂 Project Structure</h2>
<pre>
heart-predictor-model-ui/
├─ backend/              
│  ├─ uvicorn_app.py     
│  ├─ database.py        
│  ├─ export_mongo_csv.py
│  └─ .env.example       
├─ frontend/             
│  ├─ src/
│  ├─ package.json
│  └─ ...
├─ .gitignore
└─ README.md
</pre>

<hr>

<h2>⚡ Installation</h2>
<ol>
  <li>Clone the repository:
    <pre>git clone https://github.com/your-username/heart-predictor-model-ui.git
cd heart-predictor-model-ui</pre>
  </li>
  <li>Backend setup:
    <pre>cd backend
python -m venv .venv
# Windows
.\.venv\Scripts\Activate.ps1
# Linux/macOS
source .venv/bin/activate
pip install -r requirements.txt</pre>
  </li>
  <li>Frontend setup:
    <pre>cd ../frontend
npm install</pre>
  </li>
</ol>

<hr>

<h2>🔑 Environment Variables</h2>
<p>Create <code>backend/.env</code> with your MongoDB credentials:</p>
<pre>
MONGO_DB=heart_disease
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_password
MONGO_CLUSTER=your_cluster_url
</pre>
<p>Do <b>not</b> push <code>.env</code> to GitHub.</p>

<hr>

<h2>🚀 Running the Project</h2>

<h3>Backend (FastAPI)</h3>
<pre>
cd backend
uvicorn uvicorn_app:app --reload
# runs at http://127.0.0.1:8000
</pre>

<h3>Frontend (React)</h3>
<pre>
cd frontend
npm start
# runs at http://localhost:3000
</pre>

<hr>

<h2>💾 Exporting Data</h2>
<pre>
cd backend
python export_mongo_csv.py
</pre>
<p>All MongoDB collections will be exported as CSV files in <code>backend/export/</code>.</p>

<hr>

<h2>☁️ Deployment</h2>
<p><b>Backend:</b> Render (FastAPI)</p>
<pre>
uvicorn uvicorn_app:app --host 0.0.0.0 --port $PORT
</pre>
<p><b>Frontend:</b> Render/Netlify</p>
<pre>
cd frontend && npm install && npm run build
</pre>

<hr>

<h2>📷 Screenshots</h2>
<p>
<img src="screenshots/home.png" alt="Home Page" width="400">
<img src="screenshots/result.png" alt="Result Page" width="400">
</p>

<hr>

<h2>📄 License</h2>
<p>MIT License – see <a href="LICENSE">LICENSE</a> file for details.</p>
