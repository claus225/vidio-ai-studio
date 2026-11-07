import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles, Film, ImagePlus, Clock3, Download, Settings2, History, LayoutGrid, ChevronDown, WandSparkles, UploadCloud, X, Play, Menu, Clapperboard, AlertCircle } from 'lucide-react';
import './styles.css';

function App() {
  const [mode, setMode] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('5');
  const [ratio, setRatio] = useState('16:9');
  const [quality, setQuality] = useState('Standard');
  const [image, setImage] = useState(null);
  const [notice, setNotice] = useState('');
  const fileRef = useRef(null);

  function chooseImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setNotice('Choisis un fichier image (PNG, JPG ou WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage({ name: file.name, url: reader.result });
    reader.readAsDataURL(file);
    setNotice('');
  }

  function generate() {
    if (mode === 'text' && !prompt.trim()) {
      setNotice('Décris d’abord la vidéo que tu souhaites créer.');
      return;
    }
    if (mode === 'image' && !image) {
      setNotice('Ajoute une image pour commencer.');
      return;
    }
    setNotice('L’interface est prête. Pour lancer une vraie génération, il faut encore connecter un moteur vidéo IA et son serveur sécurisé.');
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Clapperboard size={21}/></div><div><strong>vidio<span>ai</span></strong><small>STUDIO</small></div></div>
      <button className="new-project"><Sparkles size={17}/> Nouveau projet</button>
      <div className="nav-label">ESPACE DE TRAVAIL</div>
      <button className="nav-item active"><LayoutGrid size={18}/> Création</button>
      <button className="nav-item" onClick={() => setNotice('Ton historique apparaîtra ici après la connexion du stockage et des comptes utilisateurs.')}><History size={18}/> Historique</button>
      <div className="sidebar-bottom"><div className="plan-card"><div className="plan-icon"><Sparkles size={16}/></div><strong>Ton studio IA</strong><p>Prépare tes idées et crée tes prochaines vidéos.</p><span className="plan-status">VERSION BÊTA</span></div><button className="nav-item" onClick={() => setNotice('Les paramètres du compte seront disponibles après la mise en place de l’authentification.')}><Settings2 size={18}/> Paramètres</button></div>
    </aside>

    <main className="main">
      <header className="topbar"><button className="mobile-menu"><Menu size={20}/></button><div className="crumb">Espace de travail <span>/</span> <b>Nouvelle création</b></div><div className="top-right"><span className="beta-pill">BÊTA</span><div className="avatar">V</div></div></header>
      <section className="workspace">
        <div className="intro"><div className="eyebrow"><span className="eyebrow-dot"></span> TON STUDIO DE CRÉATION IA</div><h1>Donne vie à tes <span>idées.</span></h1><p>Transforme une description ou une image en une vidéo originale.</p></div>
        <div className="studio-grid">
          <section className="editor panel">
            <div className="panel-heading"><div><span className="step">01</span><div><h2>Créer une vidéo</h2><p>Choisis ton point de départ</p></div></div><WandSparkles size={19} className="muted-icon"/></div>
            <div className="mode-switch">
              <button className={mode === 'text' ? 'mode active-mode' : 'mode'} onClick={() => {setMode('text');setNotice('')}}><Sparkles size={16}/> Texte vers vidéo</button>
              <button className={mode === 'image' ? 'mode active-mode' : 'mode'} onClick={() => {setMode('image');setNotice('')}}><ImagePlus size={16}/> Image vers vidéo</button>
            </div>
            {mode === 'text' ? <div className="field-block"><label htmlFor="prompt">DESCRIPTION DE LA VIDÉO</label><textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={1200} placeholder="Ex. : Une ville futuriste illuminée par des néons sous une pluie légère, travelling cinématographique, ambiance mystérieuse..."/><div className="field-foot"><span>Décris le sujet, le décor et le mouvement.</span><span>{prompt.length}/1200</span></div></div> :
            <div className="field-block"><label>IMAGE DE DÉPART</label>{image ? <div className="image-preview"><img src={image.url} alt="Aperçu de l'image choisie"/><div><strong>{image.name}</strong><small>Image ajoutée</small></div><button className="remove-image" onClick={() => setImage(null)} aria-label="Retirer l’image"><X size={17}/></button></div> : <button className="upload-zone" onClick={() => fileRef.current?.click()}><span className="upload-icon"><UploadCloud size={22}/></span><strong>Importer une image</strong><span>PNG, JPG ou WEBP · depuis ton appareil</span><small>Parcourir les fichiers</small></button>}<input ref={fileRef} hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={e => chooseImage(e.target.files?.[0])}/></div>}
            <div className="settings-heading"><span className="step">02</span><div><h2>Paramètres vidéo</h2><p>Personnalise ton rendu</p></div></div>
            <div className="settings-grid">
              <div className="setting"><label><Clock3 size={14}/> DURÉE</label><div className="select-wrap"><select value={duration} onChange={e => setDuration(e.target.value)}><option value="5">5 secondes</option><option value="10">10 secondes</option></select><ChevronDown size={15}/></div></div>
              <div className="setting"><label><Film size={14}/> FORMAT</label><div className="select-wrap"><select value={ratio} onChange={e => setRatio(e.target.value)}><option>16:9</option><option>9:16</option><option>1:1</option></select><ChevronDown size={15}/></div></div>
              <div className="setting"><label><Sparkles size={14}/> QUALITÉ</label><div className="select-wrap"><select value={quality} onChange={e => setQuality(e.target.value)}><option>Standard</option><option>Haute</option></select><ChevronDown size={15}/></div></div>
            </div>
            <button className="generate-btn" onClick={generate}><Sparkles size={18}/> Préparer la génération <span>→</span></button>
            <div className="secure-note"><AlertCircle size={14}/> La génération réelle sera activée après connexion du moteur IA.</div>
            {notice && <div className="notice" role="status">{notice}</div>}
          </section>

          <section className="preview-column">
            <div className="preview panel"><div className="preview-head"><div><span className="step">APERÇU</span><h2>Ton résultat</h2></div><span className="preview-tag">EN ATTENTE</span></div><div className="preview-stage"><div className="stage-glow"></div><div className="stage-content"><div className="stage-icon"><Play size={23} fill="currentColor"/></div><strong>Ton prochain chef-d’œuvre<br/>commence ici.</strong><p>Ta vidéo apparaîtra dans cet espace<br/>une fois la génération activée.</p></div><div className="stage-corner">VIDIO AI · STUDIO</div></div><div className="preview-footer"><div><span className="footer-label">FORMAT</span><strong>{ratio}</strong></div><div><span className="footer-label">DURÉE</span><strong>{duration} sec</strong></div><div><span className="footer-label">QUALITÉ</span><strong>{quality}</strong></div><button className="download-btn" disabled title="Disponible après génération"><Download size={16}/></button></div></div>
            <div className="tip-card"><div className="tip-icon"><Sparkles size={17}/></div><div><strong>Astuce de création</strong><p>Un bon prompt décrit le sujet, le lieu, la lumière et le mouvement de caméra. Sois précis pour guider le résultat.</p></div></div>
            <div className="roadmap"><div className="roadmap-title">EN COURS DE CONSTRUCTION <span>01 / 04</span></div><div className="roadmap-track"><i></i></div><p>Interface de création · prochaine étape : moteur de génération vidéo.</p></div>
          </section>
        </div>
        <footer className="page-footer">© 2026 VIDIO AI STUDIO <span>FAIT POUR DONNER VIE AUX IDÉES</span></footer>
      </section>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);