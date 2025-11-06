import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notebooks" element={<Notebooks />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Sidebar = () => (
  <div className="w-64 bg-blue-800 text-white p-5 space-y-4">
    <h1 className="text-2xl font-bold mb-4">Gestão de Notebooks</h1>
    <nav className="space-y-2">
      <Link to="/" className="block hover:bg-blue-700 p-2 rounded">Home</Link>
      <Link to="/notebooks" className="block hover:bg-blue-700 p-2 rounded">Notebooks</Link>
      <Link to="/alunos" className="block hover:bg-blue-700 p-2 rounded">Alunos</Link>
      <Link to="/professores" className="block hover:bg-blue-700 p-2 rounded">Professores</Link>
      <Link to="/emprestimos" className="block hover:bg-blue-700 p-2 rounded">Empréstimos</Link>
      <Link to="/relatorio" className="block hover:bg-blue-700 p-2 rounded">Relatório</Link>
    </nav>
  </div>
);

const Home = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema</h2>
    <p>Gerencie facilmente notebooks, tablets, alunos, professores e empréstimos da escola.</p>
  </div>
);

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notebooks")) || [];
    if (saved.length === 0) {
      const novos = [];
      for (let i = 1; i <= 20; i++) novos.push({ id: `V-${i}`, marca: "VAIO", tipo: "Notebook", status: "Disponível" });
      for (let i = 1; i <= 35; i++) novos.push({ id: `TS-${i}`, marca: "Samsung", tipo: "Tablet", status: "Disponível" });
      for (let i = 1; i <= 10; i++) novos.push({ id: `CS-${i}`, marca: "Samsung", tipo: "Chromebook", status: "Disponível" });
      for (let i = 1; i <= 20; i++) novos.push({ id: `P-${i}`, marca: "Positivo", tipo: "Notebook", status: "Disponível" });
      localStorage.setItem("notebooks", JSON.stringify(novos));
      setNotebooks(novos);
    } else {
      setNotebooks(saved);
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notebooks e Tablets</h2>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {notebooks.map((n, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{n.id}</td>
              <td className="border p-2">{n.marca}</td>
              <td className="border p-2">{n.tipo}</td>
              <td className="border p-2">{n.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Alunos = () => {
  const [alunos, setAlunos] = useState(JSON.parse(localStorage.getItem("alunos")) || []);
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [numero, setNumero] = useState("");

  const addAluno = () => {
    if (!nome || !turma || !numero) return;
    const novo = [...alunos, { nome, turma, numero }];
    setAlunos(novo);
    localStorage.setItem("alunos", JSON.stringify(novo));
    setNome(""); setTurma(""); setNumero("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alunos</h2>
      <div className="flex space-x-2 mb-4">
        <input className="border p-2 flex-1" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="border p-2 w-32" placeholder="Turma" value={turma} onChange={(e) => setTurma(e.target.value)} />
        <input className="border p-2 w-20" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} />
        <button onClick={addAluno} className="bg-blue-600 text-white px-4 rounded">Adicionar</button>
      </div>
      <ul className="bg-white border rounded">
        {alunos.map((a, i) => (
          <li key={i} className="border-b p-2">{a.nome} - Turma {a.turma}, Nº {a.numero}</li>
        ))}
      </ul>
    </div>
  );
};

const Professores = () => {
  const [professores, setProfessores] = useState(JSON.parse(localStorage.getItem("professores")) || []);
  const [nome, setNome] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");

  const addProfessor = () => {
    if (!nome || !materia || !turma) return;
    const novo = [...professores, { nome, materia, turma }];
    setProfessores(novo);
    localStorage.setItem("professores", JSON.stringify(novo));
    setNome(""); setMateria(""); setTurma("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Professores</h2>
      <div className="flex space-x-2 mb-4">
        <input className="border p-2 flex-1" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="border p-2 w-40" placeholder="Matéria" value={materia} onChange={(e) => setMateria(e.target.value)} />
        <input className="border p-2 w-32" placeholder="Turma" value={turma} onChange={(e) => setTurma(e.target.value)} />
        <button onClick={addProfessor} className="bg-blue-600 text-white px-4 rounded">Adicionar</button>
      </div>
      <ul className="bg-white border rounded">
        {professores.map((p, i) => (
          <li key={i} className="border-b p-2">{p.nome} - {p.materia} ({p.turma})</li>
        ))}
      </ul>
    </div>
  );
};

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState(JSON.parse(localStorage.getItem("emprestimos")) || []);
  const [alunos] = useState(JSON.parse(localStorage.getItem("alunos")) || []);
  const [professores] = useState(JSON.parse(localStorage.getItem("professores")) || []);
  const [notebooks, setNotebooks] = useState(JSON.parse(localStorage.getItem("notebooks")) || []);
  const [selecionados, setSelecionados] = useState([]);
  const [alunoSel, setAlunoSel] = useState("");
  const [profSel, setProfSel] = useState("");

  const toggleNotebook = (id) => {
    setSelecionados(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  const iniciarEmprestimo = () => {
    if (!alunoSel || !profSel || selecionados.length === 0) return;
    const novos = selecionados.map(id => ({ id, alunoSel, profSel, status: "Em uso" }));
    const atualizados = [...emprestimos, ...novos];
    setEmprestimos(atualizados);
    localStorage.setItem("emprestimos", JSON.stringify(atualizados));
    setSelecionados([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Empréstimos</h2>
      <div className="mb-4 flex space-x-2">
        <select className="border p-2" value={alunoSel} onChange={(e) => setAlunoSel(e.target.value)}>
          <option value="">Selecione o aluno</option>
          {alunos.map((a, i) => <option key={i} value={a.nome}>{a.nome} - {a.turma}</option>)}
        </select>
        <select className="border p-2" value={profSel} onChange={(e) => setProfSel(e.target.value)}>
          <option value="">Selecione o professor</option>
          {professores.map((p, i) => <option key={i} value={p.nome}>{p.nome} - {p.materia}</option>)}
        </select>
        <button onClick={iniciarEmprestimo} className="bg-blue-600 text-white px-4 rounded">Iniciar</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {notebooks.map((n, i) => (
          <button key={i} onClick={() => toggleNotebook(n.id)} className={`border p-2 rounded ${selecionados.includes(n.id) ? "bg-green-300" : "bg-white"}`}>
            {n.id} ({n.marca})
          </button>
        ))}
      </div>
      <h3 className="text-xl mt-4 font-bold">Ativos</h3>
      <ul className="bg-white border rounded mt-2">
        {emprestimos.map((e, i) => (
          <li key={i} className="border-b p-2">{e.id} - {e.alunoSel} ({e.profSel})</li>
        ))}
      </ul>
    </div>
  );
};

const Relatorio = () => {
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Relatório</h2>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="border p-2">Notebook</th>
            <th className="border p-2">Aluno</th>
            <th className="border p-2">Professor</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((e, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{e.id}</td>
              <td className="border p-2">{e.alunoSel}</td>
              <td className="border p-2">{e.profSel}</td>
              <td className="border p-2">{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
