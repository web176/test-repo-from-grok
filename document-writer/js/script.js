// Variables globales
let currentDocument = {
    title: 'Titre de l\'exposé',
    content: ''
};

function formatText(command) {
    document.execCommand(command, false, null);
}

function insertSection(sectionName) {
    const editor = document.getElementById('editor');
    const section = document.createElement('section');
    section.innerHTML = `<h2>${sectionName}</h2><p>Contenu de la section ${sectionName.toLowerCase()}...</p>`;
    editor.appendChild(section);
    editor.scrollTop = editor.scrollHeight;
}

function exportPDF() {
    alert('Export PDF en cours... (Pour une vraie version, on peut ajouter jsPDF via CDN)');
    window.print();
}

function exportWord() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob(['<html><head><meta charset="UTF-8"></head><body>' + content + '</body></html>'], {
        type: 'application/msword'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = (document.getElementById('doc-title').innerText || 'expose') + '.doc';
    link.click();
}

function saveDocument() {
    localStorage.setItem('documentWriter', document.getElementById('editor').innerHTML);
    alert('✅ Document sauvegardé dans le navigateur !');
}

function newDocument() {
    if (confirm('Créer un nouveau document ?')) {
        document.getElementById('editor').innerHTML = `<h1 id="doc-title">Titre de l'exposé</h1>`;
    }
}

// Chargement automatique
window.onload = () => {
    const saved = localStorage.getItem('documentWriter');
    if (saved) document.getElementById('editor').innerHTML = saved;
};