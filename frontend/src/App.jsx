import { useEffect, useState } from "react";

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API = "http://localhost:3000/issues";

  const fetchIssues = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setIssues(data);
  };

  const createIssue = async () => {
    if (!title) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchIssues();
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div style={styles.container}>
      <h1>🚀 Issue Tracker</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} onClick={createIssue}>
          Create Issue
        </button>
      </div>

      <div style={styles.list}>
        {issues.map((issue) => (
          <div key={issue.id} style={styles.card}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <button
              style={styles.deleteBtn}
              onClick={() => deleteIssue(issue.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  list: {
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  deleteBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
};

export default App;