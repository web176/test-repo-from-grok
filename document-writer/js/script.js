// Script Document Writer

function formatText(command) {
    const editor = document.getElementById('editor');
    if (command === 'bold') document.execCommand('bold');
    else if (command === 'italic') document.execCommand('italic');
    else if (command === 'h1') document.execCommand('formatBlock', false, '<h1>');
    else if (command === 'h2') document.execCommand('formatBlock', false, '<h2>');
}

function addSection(title) {
    const editor = document.getElementById('editor');
    const h2 = document.createElement('h2');
    h2.textContent = title;
    editor.appendChild(h2);
    const p = document.createElement('p');
    p.textContent = 'Contenu de la section...';
    editor.appendChild(p);
    editor.focus();
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    doc.html(document.getElementById('editor'), {
        callback: function(doc) {
            doc.save('mon-expose.pdf');
        },
        x: 15,
        y: 15,
        width: 180,
        windowWidth: 900
    });
}

function exportWord() {
    const content = document.getElementById('editor').innerHTML;
    const fullHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${content}</body></html>`;
    const blob = new Blob([fullHTML], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mon-expose.doc';
    link.click();
}

function saveDocument() {
    localStorage.setItem('exposeContent', document.getElementById('editor').innerHTML);
    alert('✅ Document sauvegardé !');
}

function clearDocument() {
    if (confirm('Créer un nouvel exposé ?')) {
        document.getElementById('editor').innerHTML = '<h1>Nouvel Exposé</h1><p>Commencez à rédiger ici...</p>';
        localStorage.removeItem('exposeContent');
    }
}

// Chargement
window.onload = () => {
    const saved = localStorage.getItem('exposeContent');
    if (saved) document.getElementById('editor').innerHTML = saved;
};