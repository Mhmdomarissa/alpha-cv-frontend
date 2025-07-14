'use client';

import { useState } from 'react';

export default function Home() {
  const [cvFiles, setCvFiles] = useState<FileList | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!cvFiles || !jdFile) return alert("Please select CVs and JD file");

    const formData = new FormData();
    for (let i = 0; i < cvFiles.length; i++) {
      formData.append("cv_files", cvFiles[i]);
    }
    formData.append("jd_file", jdFile);

    setLoading(true);
    try {
      const res = await fetch("http://13.51.13.104:8000/upload_cvs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload CVs and Job Description</h1>

      <div style={{ marginBottom: 10 }}>
        <label>CV Files (PDF, DOCX): </label>
        <input type="file" multiple onChange={e => setCvFiles(e.target.files)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Job Description File: </label>
        <input type="file" onChange={e => setJdFile(e.target.files?.[0] || null)} />
      </div>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Job Description Content:</h3>
          <pre>{result.job_description}</pre>

          <h2>Candidate Results:</h2>
          {result.candidates.map((cand: any, idx: number) => (
            <div key={idx} style={{ borderTop: "1px solid #ccc", marginTop: 20 }}>
              <p><strong>Name:</strong> {cand.full_name}</p>
              <p><strong>Title:</strong> {cand.job_title}</p>
              <p><strong>Content:</strong></p>
              <pre>{cand.content}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


