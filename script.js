function getPartsKey(vin) {
    return 'parts-' + vin;
}

function loadParts(vin) {
    const key = getPartsKey(vin);
    const partsData = localStorage.getItem(key);
    return partsData ? JSON.parse(partsData) : [];
}

function savePart(vin, part) {
    const parts = loadParts(vin);
    parts.push(part);
    localStorage.setItem(getPartsKey(vin), JSON.stringify(parts));
}

function showParts(vin) {
    const partsSection = document.getElementById('parts-section');
    const list = document.getElementById('parts-list');
    list.innerHTML = '';
    const parts = loadParts(vin);
    parts.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        list.appendChild(li);
    });
    partsSection.style.display = 'block';
}

document.getElementById('decode-btn').addEventListener('click', async () => {
    const vin = document.getElementById('vin-input').value.trim();
    if (!vin) return;
    const infoDiv = document.getElementById('truck-info');
    infoDiv.textContent = 'Loading...';
    try {
        const resp = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/${vin}?format=json`);
        const data = await resp.json();
        const year = data.Results.find(r => r.Variable === 'Model Year').Value;
        const make = data.Results.find(r => r.Variable === 'Make').Value;
        const model = data.Results.find(r => r.Variable === 'Model').Value;
        infoDiv.textContent = `${year} ${make} ${model}`;
        showParts(vin);
        document.getElementById('add-part-btn').onclick = () => {
            const partInput = document.getElementById('part-input');
            if (partInput.value.trim()) {
                savePart(vin, partInput.value.trim());
                partInput.value = '';
                showParts(vin);
            }
        };
    } catch (e) {
        infoDiv.textContent = 'Error decoding VIN';
    }
});
