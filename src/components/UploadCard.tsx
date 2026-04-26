import { useState, useEffect } from 'react';
import PredictionResult from './PredictionResult';

export default function UploadCard() {
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const endpoint = isLogin ? "/login" : "/register";
    
    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Autentikasi gagal");
      
      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
      } else {
        setIsLogin(true);
        setAuthError("Registrasi berhasil. Silakan login.");
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setResult(null);
    setFile(null);
  };

  const upload = async () => {
    if (!file || !token) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      
      if (res.status === 401) {
        handleLogout();
        throw new Error("Sesi berakhir. Login kembali.");
      }
      
      const data = await res.json();
      if (!res.ok) throw new Error("Gagal analisis.");
      setResult(data);
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="text" placeholder="Username" className="w-full p-2 border rounded" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={e => setPassword(e.target.value)} />
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded font-bold">
            {isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-sm text-blue-600">
          {isLogin ? "Buat akun" : "Sudah punya akun? Login"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analisis AI</h2>
        <button onClick={handleLogout} className="text-sm text-slate-500 border p-2 rounded">Logout</button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <input type="file" onChange={e => {
            if(e.target.files) {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }
          }} className="mb-4" />
          {preview && <img src={preview} className="w-full rounded-lg mb-4" />}
          <button onClick={upload} disabled={!file || loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
            {loading ? "Memproses..." : "Mulai Analisis"}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl">
          {result ? <PredictionResult data={result} /> : <p className="text-slate-400 text-center">Hasil akan muncul di sini</p>}
        </div>
      </div>
    </div>
  );
}