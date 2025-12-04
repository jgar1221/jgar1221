const catalog = [
    {
        vin: "1XKZDP9X6LJ123456",
        wmi: "1XK",
        make: "Kenworth",
        model: "T880 Day Cab",
        year: 2020,
        engine: "PACCAR MX-13 455 HP",
        transmission: "Eaton Endurant 12-speed",
        axle: "Meritor MT-40-14X 40K",
        notes: "Spec'd with severe-duty cooling and Bendix ADB22X air disc brakes.",
        parts: [
            {
                partNumber: "MX13-455-OILKIT",
                name: "MX-13 455 Preventive Oil Service Kit",
                type: "Maintenance",
                url: "https://parts.jgarfleet.com/MX13-455-OILKIT"
            },
            {
                partNumber: "BNDX-ADB22X-PAD",
                name: "Bendix ADB22X Brake Pad Set",
                type: "Brakes",
                url: "https://parts.jgarfleet.com/BNDX-ADB22X-PAD"
            },
            {
                partNumber: "STEMCO-392-9123",
                name: "Stemco Hub Seal Kit",
                type: "Wheel End",
                url: "https://parts.jgarfleet.com/STEMCO-392-9123"
            }
        ]
    },
    {
        vin: "3AKJHHDR5MS234567",
        wmi: "3AK",
        make: "Freightliner",
        model: "Cascadia 126 Sleeper",
        year: 2021,
        engine: "Detroit DD15 Gen 5 505 HP",
        transmission: "DT12-1650AM",
        axle: "Detroit DA-RT-40.0-4 2.41",
        notes: "Factory-installed Detroit Assurance 5.0 safety suite.",
        parts: [
            {
                partNumber: "DD15G5-FUELKIT",
                name: "DD15 Gen5 Fuel Filter Kit",
                type: "Fuel System",
                url: "https://parts.jgarfleet.com/DD15G5-FUELKIT"
            },
            {
                partNumber: "DETROIT-DEF-HOSE",
                name: "Detroit DEF Delivery Hose Assembly",
                type: "Emissions",
                url: "https://parts.jgarfleet.com/DETROIT-DEF-HOSE"
            },
            {
                partNumber: "CASC-LED-HEADLAMP",
                name: "Cascadia LED Headlamp Assembly RH",
                type: "Electrical",
                url: "https://parts.jgarfleet.com/CASC-LED-HEADLAMP"
            }
        ]
    },
    {
        vin: "1M1AN4GY1MM345678",
        wmi: "1M1",
        make: "Mack",
        model: "Anthem 64T",
        year: 2021,
        engine: "Mack MP8 505C",
        transmission: "mDRIVE HD",
        axle: "Meritor RT46-160",
        notes: "Includes Bendix Wingman Fusion with adaptive cruise.",
        parts: [
            {
                partNumber: "MP8-VALVE-COVER",
                name: "MP8 Valve Cover Gasket Kit",
                type: "Engine",
                url: "https://parts.jgarfleet.com/MP8-VALVE-COVER"
            },
            {
                partNumber: "MDRIVE-SVC-FILTER",
                name: "mDRIVE Transmission Service Filter",
                type: "Drivetrain",
                url: "https://parts.jgarfleet.com/MDRIVE-SVC-FILTER"
            },
            {
                partNumber: "HALDEX-ABS-SENSOR",
                name: "Haldex ABS Wheel Speed Sensor",
                type: "ABS",
                url: "https://parts.jgarfleet.com/HALDEX-ABS-SENSOR"
            }
        ]
    },
    {
        vin: "4V4NC9EH1MN456789",
        wmi: "4V4",
        make: "Volvo",
        model: "VNL 760",
        year: 2021,
        engine: "Volvo D13 Turbo Compound",
        transmission: "I-Shift 12-Speed",
        axle: "Dana Spicer D40-145",
        notes: "Volvo Active Driver Assist 2.0 & Xceed fuel package.",
        parts: [
            {
                partNumber: "D13TC-FILTER-PACK",
                name: "Volvo D13TC Annual Filter Pack",
                type: "Maintenance",
                url: "https://parts.jgarfleet.com/D13TC-FILTER-PACK"
            },
            {
                partNumber: "VOLVO-ROTOR-760",
                name: "Volvo VNL 760 Front Rotor",
                type: "Brakes",
                url: "https://parts.jgarfleet.com/VOLVO-ROTOR-760"
            },
            {
                partNumber: "VNL-CAB-AIR-BAG",
                name: "Volvo Cab Air Suspension Bag",
                type: "Suspension",
                url: "https://parts.jgarfleet.com/VNL-CAB-AIR-BAG"
            }
        ]
    }
];

const wmiLookup = {
    "1XK": "Kenworth",
    "3AK": "Freightliner",
    "1M1": "Mack",
    "4V4": "Volvo"
};

const vinForm = document.getElementById("vin-form");
const vinInput = document.getElementById("vin-input");
const vinResult = document.getElementById("vin-result");
const catalogGrid = document.getElementById("catalog-grid");
const recentDecode = document.getElementById("recent-decode");
const currentYear = document.getElementById("current-year");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav ul");

function formatParts(parts) {
    return parts.map(part => {
        const anchor = `<a href="${part.url}" target="_blank" rel="noopener">${part.partNumber}</a>`;
        return `<li><strong>${anchor}</strong><span>${part.name}</span><span class="tag">${part.type}</span></li>`;
    }).join("");
}

function renderVinDetails(entry, vin) {
    if (!entry) {
        vinResult.innerHTML = `
            <div class="result-card result-card--empty">
                <h3>No match found</h3>
                <p>We couldn't find <strong>${vin}</strong> in our database. Send it to <a href="mailto:data@jgarfleet.com">data@jgarfleet.com</a> and we'll add it in minutes.</p>
                <button class="btn btn--ghost" type="button" id="load-wmi">Check manufacturer by WMI</button>
            </div>
        `;
        const checkBtn = document.getElementById("load-wmi");
        if (checkBtn) {
            checkBtn.addEventListener("click", () => {
                const wmi = vin.slice(0, 3);
                const make = wmiLookup[wmi];
                const wmiMessage = make
                    ? `The WMI <strong>${wmi}</strong> belongs to <strong>${make}</strong>. We'll cross-reference build specs and respond within 15 minutes.`
                    : `The WMI <strong>${wmi}</strong> isn't in our quick lookup. Send it to us and we'll verify it manually.`;
                vinResult.innerHTML = `
                    <div class="result-card result-card--info">
                        <h3>Manufacturer Lookup</h3>
                        <p>${wmiMessage}</p>
                        <a class="btn btn--primary" href="mailto:data@jgarfleet.com?subject=Add%20VIN%20${vin}">Email VIN to Data Team</a>
                    </div>
                `;
            });
        }
        return;
    }

    const partItems = formatParts(entry.parts);

    vinResult.innerHTML = `
        <article class="result-card">
            <header>
                <div>
                    <h3>${entry.make} ${entry.model}</h3>
                    <p>${entry.year} • ${entry.engine} • ${entry.transmission}</p>
                </div>
                <span class="vin-tag">${vin}</span>
            </header>
            <div class="result-body">
                <dl class="specs">
                    <div><dt>Axle</dt><dd>${entry.axle}</dd></div>
                    <div><dt>Notes</dt><dd>${entry.notes}</dd></div>
                </dl>
                <section class="parts">
                    <h4>Recommended Parts</h4>
                    <ul>${partItems}</ul>
                </section>
            </div>
        </article>
    `;

    updateRecentDecode(entry, vin);
}

function updateRecentDecode(entry, vin) {
    if (!recentDecode) return;
    const rows = recentDecode.querySelectorAll("dd");
    const partText = entry.parts.map(part => part.partNumber).join(", ");
    rows[0].textContent = vin;
    rows[1].textContent = entry.make;
    rows[2].textContent = entry.model;
    rows[3].textContent = entry.engine;
    rows[4].textContent = partText;
}

function populateCatalogGrid() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = catalog.map(entry => `
        <article class="catalog-card">
            <header>
                <h3>${entry.make} ${entry.model}</h3>
                <span class="tag">${entry.year}</span>
            </header>
            <p>${entry.engine} • ${entry.transmission}</p>
            <p class="notes">${entry.notes}</p>
            <ul class="part-list">
                ${entry.parts.map(part => `
                    <li>
                        <div>
                            <a href="${part.url}" target="_blank" rel="noopener" class="part-number">${part.partNumber}</a>
                            <span class="part-name">${part.name}</span>
                        </div>
                        <span class="tag tag--outline">${part.type}</span>
                    </li>
                `).join("")}
            </ul>
        </article>
    `).join("");
}

function decodeVin(vin) {
    const normalized = vin.toUpperCase();
    return catalog.find(entry => entry.vin === normalized);
}

function sanitizeVin(raw) {
    return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function hasInvalidVinCharacters(vin) {
    return /[IOQ]/.test(vin);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const vin = sanitizeVin(vinInput.value.trim());
    vinInput.value = vin;

    if (hasInvalidVinCharacters(vin)) {
        vinResult.innerHTML = `
            <div class="result-card result-card--error">
                <h3>VIN contains invalid letters</h3>
                <p>VINs never use I, O, or Q. Please update the entry and try again.</p>
            </div>
        `;
        return;
    }

    if (vin.length !== 17) {
        vinResult.innerHTML = `
            <div class="result-card result-card--error">
                <h3>VIN must be 17 characters</h3>
                <p>We removed any spaces or dashes—please double-check for missing digits or letters.</p>
            </div>
        `;
        return;
    }

    const match = decodeVin(vin);
    renderVinDetails(match, vin);
}

function handleInputChange() {
    const sanitized = sanitizeVin(vinInput.value);
    if (sanitized !== vinInput.value) {
        vinInput.value = sanitized;
    }

    if (sanitized.length >= 3) {
        const wmi = sanitized.slice(0, 3);
        vinInput.setAttribute("data-wmi", wmi);
    } else {
        vinInput.removeAttribute("data-wmi");
    }
}

function toggleNav() {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    document.body.classList.toggle("nav-open", !expanded);
}

function init() {
    if (vinForm) {
        vinForm.addEventListener("submit", handleFormSubmit);
    }

    if (vinInput) {
        vinInput.addEventListener("input", handleInputChange);
    }

    populateCatalogGrid();

    if (catalog.length && recentDecode) {
        updateRecentDecode(catalog[0], catalog[0].vin);
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (navToggle) {
        navToggle.addEventListener("click", toggleNav);
    }

    if (mainNav) {
        mainNav.addEventListener("click", event => {
            if (event.target instanceof HTMLAnchorElement && document.body.classList.contains("nav-open")) {
                toggleNav();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
