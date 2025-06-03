<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Country Entry Filter Tool</title>
  <style>
    :root {
      --primary-color: #3498db;
      --primary-hover: #2980b9;
      --secondary-color: #e74c3c;
      --secondary-hover: #c0392b;
      --light-gray: #ecf0f1;
      --dark-gray: #7f8c8d;
      --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    h2 {
      margin: 0;
      color: #2c3e50;
    }
    
    .refresh-btn {
      background-color: var(--light-gray);
      color: var(--dark-gray);
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .refresh-btn:hover {
      background-color: #dfe6e9;
    }
    
    .input-section, .filter-section, .output-section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: var(--shadow);
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 15px;
      color: #2c3e50;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    
    label {
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    select, textarea, input[type="file"] {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }
    
    select[multiple] {
      height: 200px;
    }
    
    .btn {
      padding: 8px 15px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      transition: background-color 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-hover);
    }
    
    .btn-secondary {
      background-color: var(--secondary-color);
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: var(--secondary-hover);
    }
    
    .btn-outline {
      background-color: white;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--light-gray);
    }
    
    .btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    .counter {
      background: #ffffff;
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      font-weight: 600;
      box-shadow: var(--shadow);
    }
    
    .counter-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    
    .entry {
      background: white;
      border-radius: 6px;
      padding: 15px;
      box-shadow: var(--shadow);
      margin-bottom: 15px;
      white-space: pre-line;
      border-left: 4px solid var(--primary-color);
    }
    
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    @media (max-width: 768px) {
      .two-column {
        grid-template-columns: 1fr;
      }
    }
    
    .group-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
    
    .group-item:last-child {
      border-bottom: none;
    }
    
    .delete-group {
      color: var(--secondary-color);
      cursor: pointer;
      font-size: 14px;
    }
    
    .delete-group:hover {
      color: var(--secondary-hover);
    }
    
    .icon {
      width: 16px;
      height: 16px;
    }
    
    .group-countries {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
      background: #f9f9f9;
      padding: 10px;
      border-radius: 5px;
      display: none;
    }
    
    .country-count {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 5px;
    }
    
    .download-btn {
      margin-top: 15px;
    }
    
    .country-filter-btn {
      margin-top: -10px;
      margin-bottom: 15px;
    }
    
    .group-count-display {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 10px;
    }
    
    .group-count-item {
      background: #f0f7ff;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Country Group Entry Management</h2>
    <button class="refresh-btn" onclick="clearAll()">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Refresh
    </button>
  </div>

  <div class="input-section">
    <h3 class="section-title">Input Data</h3>
    <label for="fileInput">Upload File:</label>
    <input type="file" id="fileInput" accept=".txt">
    
    <label for="manualInput">Or Paste Entries:</label>
    <textarea id="manualInput" rows="5" placeholder="Paste entries here, separated by blank lines..."></textarea>
    
    <div class="btn-group">
      <button class="btn btn-primary" onclick="loadEntries()">Load Entries</button>
      <button class="btn btn-outline" onclick="document.getElementById('manualInput').value = ''">Clear Text</button>
    </div>
  </div>

  <div class="filter-section">
    <h3 class="section-title">Filter Options</h3>
    
    <div class="two-column">
      <div>
        <label for="groupSelect">Select Group(s):</label>
        <select id="groupSelect" multiple size="8">
          <option value="">-- All Entries --</option>
        </select>
        
        <div id="groupCountries" class="group-countries"></div>
        
        <div id="userGroupsContainer" style="margin-top: 15px; display: none;">
          <label>Your Groups:</label>
          <div id="userGroupsList" style="background: var(--light-gray); padding: 10px; border-radius: 5px;"></div>
        </div>
      </div>
      
      <div>
        <label for="countrySelect">Select Countries:</label>
        <select id="countrySelect" multiple size="10"></select>
        <button class="btn btn-primary country-filter-btn" onclick="applyCountryFilter()">Filter by Selected Countries</button>
      </div>
    </div>
    
    <div class="btn-group">
      <button class="btn btn-primary" onclick="copyVisibleEntries()">Copy Visible Entries</button>
      <button class="btn btn-outline" onclick="createNewGroup()">Create New Group</button>
    </div>
  </div>

  <div class="counter">
    <div class="counter-row">
      <span>Total Entries: <span id="totalCount" style="color: var(--primary-color)">0</span></span>
      <span id="filteredCountLabel">Filtered Entries: <span id="filteredCount" style="color: var(--primary-color)">0</span></span>
    </div>
    <div id="groupCounts" class="group-count-display"></div>
  </div>

  <button id="downloadBtn" class="btn btn-primary download-btn" onclick="downloadFilteredEntries()" style="display: none;">
    Download Filtered Entries (TXT)
  </button>

  <div class="output-section">
    <h3 class="section-title">Results</h3>
    <div id="entriesContainer"></div>
  </div>

  <script>
    const countryList = [
      "Afghanistan", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
      "Bahamas", "Bahrain", "Barbados", "Belize", "Benin", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Brasil", "Brunei", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Canada", "Central African Republic", "Chad", "Tchad", "Chile", "Colombia", "Comoros", "Congo", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Eswatini", "Fiji", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "India", "Indonesia", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Jordan", "Kenya", "Kiribati", "Kuwait", "Laos", "Latvia", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Oman", "Pakistan", "Palau", "Palestine", "Philippines", "Qatar", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Solomon Islands", "Somalia", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Switzerland", "Syria", "Taiwan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkiye", "Türkiye", "Turkmenistan", "Tuvalu", "Uganda", "United Arab Emirates", "United States", "Vanuatu", "Vatican City", "Vietnam", "Yemen", "USA", "U.S.A.", "U.S.A", "U. S. A.", "U. S. A", "Korea", "UAE", "U.A.E.", "U. A. E", "U. A. E.", "Hong Kong", "Ivory Coast", "Cote d'Ivoire", "Côte d'Ivoire", "Cote D'Ivoire", "Macau", "Macao", "Macedonia", "Greece", "Albania", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bhutan", "Botswana", "Bulgaria", "Cameroon", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Ethiopia", "Finland", "Hungary", "Iceland", "Iran", "Israel", "Kazakhstan", "Kyrgyzstan", "Lebanon", "Lithuania", "Maldives", "Mongolia", "Myanmar", "Burma", "Nepal", "Netherlands", "New Zealand", "Norway", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Poland", "Portugal", "Romania", "Serbia", "Singapore", "Slovakia", "Slovenia", "Sweden", "Tajikistan", "Tanzania", "Ukraine", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Zambia", "Zimbabwe", "UK", "U.K.", "Viet Nam", "Belarus", "South Africa"
    ];

    // Create a map of country names to their standardized form
    const countryMap = {
      "USA": "United States",
      "U.S.A.": "United States",
      "U.S.A": "United States",
      "U. S. A.": "United States",
      "U. S. A": "United States",
      "UK": "United Kingdom",
      "U.K.": "United Kingdom",
      "Korea": "South Korea",
      "UAE": "United Arab Emirates",
      "U.A.E.": "United Arab Emirates",
      "U. A. E": "United Arab Emirates",
      "U. A. E.": "United Arab Emirates",
      "Hongkong": "Hong Kong",
      "Ivory Coast": "Côte d'Ivoire",
      "Cote d'Ivoire": "Côte d'Ivoire",
      "Cote D'Ivoire": "Côte d'Ivoire",
      "Macau": "Macao",
      "Macedonia": "North Macedonia",
      "Burma": "Myanmar",
      "Viet Nam": "Vietnam",
      "Tchad": "Chad",
      "Brasil": "Brazil"
    };

    let defaultGroups = {
      "A - Japan Group": ["Indonesia", "Italy", "Japan", "Malaysia", "South Korea", "Korea", "Taiwan", "Thailand"],
      "B - African Group": ["Bosnia and Herzegovina", "Burkina Faso", "Chad", "Congo", "Côte d'Ivoire", "Egypt", "Kenya", "Mali", "Morocco", "Niger", "Nigeria", "Rwanda", "Senegal", "South Africa", "Togo", "Uganda", "North Macedonia", "Gabon", "Ghana", "Ivory Coast"],
      "C - Prime Group": ["Brazil", "Colombia", "Jordan", "Kuwait", "Mexico", "Qatar", "United Arab Emirates", "UAE", "U.A.E.", "U. A. E.", "U. A. E", "Philippines", "Russia", "Russian Federation", "Saudi Arabia", "Vietnam", "Viet Nam"],
      "D - European Group": ["Austria", "France", "Germany", "Greece", "Hungary", "Luxembourg", "Spain", "Turkey", "Turkiye", "Türkiye", "Algeria", "Finland"],
      "E - Chinese Group": ["China", "Hong Kong", "Iran", "Iraq"],
      "F - Indian Group": ["India"],
      "G - US Group": ["USA", "U. S. A.", "U. S. A", "U.S.A.", "Canada"],
      "H - Other Countries": [
        "Afghanistan", "Albania", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Botswana", "Brunei Darussalam", "Bulgaria", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Chile",
        "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Czech Republic", "Denmark", "Djibouti",
        "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
        "Fiji", "Gambia", "Georgia", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
        "Iceland", "Ireland", "Israel", "Jamaica", "Kazakhstan", "Kiribati", "Kyrgyzstan", "Lao", "Latvia", "Lebanon",
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Madagascar", "Malawi", "Maldives", "Malta",
        "Marshall Islands", "Mauritania", "Mauritius", "Micronesia", "Monaco", "Mongolia", "Montenegro", "Mozambique",
        "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "North Korea", "Norway", "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Poland", "Portugal", "Republic of Moldova",
        "Romania", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe",
        "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
        "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
        "Timor Leste", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkmenistan", "Tuvalu", "Ukraine", "United Kingdom",
        "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Yemen", "Zambia", "Zimbabwe"
      ]
    };
    
    let userGroups = JSON.parse(localStorage.getItem('userGroups')) || {};
    let countryGroups = { ...defaultGroups, ...userGroups };
    let entries = '';
    let allParts = [];
    let currentFilteredEntries = [];
    let currentGroupNames = [];
    let groupCounts = {};

    // Improved country detection - looks for country on the line before email
    function getCountryFromEntry(entry) {
      const lines = entry.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      // Find the email line (contains @)
      const emailIndex = lines.findIndex(line => line.includes('@'));
      if (emailIndex === -1 || emailIndex === 0) return null;
      
      // The country is likely the line before the email
      const potentialCountryLine = lines[emailIndex - 1];
      
      // Check if this line matches any country
      for (const country of countryList) {
        const standardizedCountry = countryMap[country] || country;
        const patterns = [
          new RegExp(`^\\s*${standardizedCountry}\\s*$`, 'i'),
          new RegExp(`^\\s*${country}\\s*$`, 'i')
        ];
        
        if (patterns.some(pattern => pattern.test(potentialCountryLine))) {
          return standardizedCountry;
        }
      }
      
      return null;
    }

    function entryContainsCountry(entry, country) {
      const entryCountry = getCountryFromEntry(entry);
      if (!entryCountry) return false;
      
      const standardizedCountry = countryMap[country] || country;
      return entryCountry.toLowerCase() === standardizedCountry.toLowerCase();
    }

    function countEntriesForCountry(country) {
      if (!allParts.length) return 0;
      return allParts.filter(entry => entryContainsCountry(entry, country)).length;
    }

    function countEntriesForGroup(groupName) {
      if (!allParts.length || !countryGroups[groupName]) return 0;
      return allParts.filter(entry => 
        countryGroups[groupName].some(country => entryContainsCountry(entry, country))
        ).length;
    }

    function updateGroupCounts() {
      groupCounts = {};
      for (const groupName in countryGroups) {
        groupCounts[groupName] = countEntriesForGroup(groupName);
      }
      renderGroupCounts();
    }

    function renderGroupCounts() {
      const container = document.getElementById('groupCounts');
      container.innerHTML = '';
      
      for (const groupName in groupCounts) {
        const div = document.createElement('div');
        div.className = 'group-count-item';
        div.textContent = `${groupName}: ${groupCounts[groupName]}`;
        container.appendChild(div);
      }
    }

    function populateDropdowns() {
      const groupSelect = document.getElementById('groupSelect');
      const countrySelect = document.getElementById('countrySelect');
      const userGroupsList = document.getElementById('userGroupsList');
      
      groupSelect.innerHTML = '<option value="">-- All Entries --</option>';
      countrySelect.innerHTML = '';
      userGroupsList.innerHTML = '';

      // Add default groups
      for (let group in defaultGroups) {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        groupSelect.appendChild(option);
      }

      // Add user groups
      let hasUserGroups = false;
      for (let group in userGroups) {
        hasUserGroups = true;
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        groupSelect.appendChild(option);
        
        // Add to user groups list
        const groupItem = document.createElement('div');
        groupItem.className = 'group-item';
        groupItem.innerHTML = `
          <span>${group}</span>
          <span class="delete-group" onclick="deleteGroup('${group}')">Delete</span>
        `;
        userGroupsList.appendChild(groupItem);
      }

      // Show/hide user groups section
      document.getElementById('userGroupsContainer').style.display = hasUserGroups ? 'block' : 'none';

      // Add create new group option
      const customOption = document.createElement('option');
      customOption.value = '__create__';
      customOption.textContent = '+ Create New Group';
      groupSelect.appendChild(customOption);

      // Populate country select
      countryList.sort().forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
      });
    }

    function renderEntries(filterFn, groupNames = []) {
      const container = document.getElementById('entriesContainer');
      container.innerHTML = '';
      let count = 0;
      currentFilteredEntries = [];
      currentGroupNames = groupNames;
      
      allParts.forEach(entry => {
        if (filterFn(entry)) {
          const div = document.createElement('div');
          div.className = 'entry';
          div.textContent = entry.trim();
          container.appendChild(div);
          count++;
          currentFilteredEntries.push(entry.trim());
        }
      });
      
      updateCounters(count);
      document.getElementById('downloadBtn').style.display = count > 0 ? 'block' : 'none';
    }

    function updateGroupCountriesDisplay(groupNames) {
      const groupCountriesDiv = document.getElementById('groupCountries');
      if (!groupNames || groupNames.length === 0 || groupNames.includes('')) {
        groupCountriesDiv.style.display = 'none';
        return;
      }
      
      let html = '';
      
      groupNames.forEach(groupName => {
        if (countryGroups[groupName]) {
          html += `<strong>${groupName}:</strong><br>`;
          countryGroups[groupName].forEach(country => {
            const count = countEntriesForCountry(country);
            html += `<span class="country-count">${country}(${count})</span>`;
          });
          html += '<br><br>';
        }
      });
      
      groupCountriesDiv.innerHTML = html;
      groupCountriesDiv.style.display = 'block';
    }

    function loadEntries() {
      const manualText = document.getElementById('manualInput').value;
      if (manualText.trim()) {
        entries = manualText.trim();
        allParts = entries.split(/\n\n+/);
        updateGroupCounts();
        renderEntries(() => true);
      }
    }

    document.getElementById('fileInput').addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        entries = e.target.result;
        allParts = entries.split(/\n\n+/);
        updateGroupCounts();
        renderEntries(() => true);
        document.getElementById('manualInput').value = entries;
      };
      reader.readAsText(file);
    });

    document.getElementById('groupSelect').addEventListener('change', function() {
      const selectedOptions = Array.from(this.selectedOptions).map(opt => opt.value);
      
      if (selectedOptions.includes('__create__')) {
        createNewGroup();
        return;
      }
      
      // Remove empty option if other options are selected
      const filteredOptions = selectedOptions.includes('') && selectedOptions.length > 1 
        ? selectedOptions.filter(opt => opt !== '') 
        : selectedOptions;
      
      updateGroupCountriesDisplay(filteredOptions);
      
      if (filteredOptions.length > 0 && !(filteredOptions.length === 1 && filteredOptions[0] === '')) {
        renderEntries(entry => 
          filteredOptions.some(groupName => 
            countryGroups[groupName]?.some(country => entryContainsCountry(entry, country))
          ),
          filteredOptions
        );
      } else {
        renderEntries(() => true);
      }
    });

    function applyCountryFilter() {
      document.getElementById('groupSelect').value = '';
      document.getElementById('groupCountries').style.display = 'none';
      const selectedOptions = Array.from(document.getElementById('countrySelect').selectedOptions).map(opt => opt.value);
      renderEntries(entry => selectedOptions.some(country => entryContainsCountry(entry, country)));
    }

    function copyVisibleEntries() {
      const visibleEntries = Array.from(document.querySelectorAll('.entry')).map(div => div.textContent).join('\n\n');
      navigator.clipboard.writeText(visibleEntries).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        alert('Failed to copy: ' + err);
      });
    }

    function downloadFilteredEntries() {
      if (currentFilteredEntries.length === 0) return;
      
      const blob = new Blob([currentFilteredEntries.join('\n\n')], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'filtered_entries.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function clearAll() {
      location.reload();
    }

    function createNewGroup() {
      const groupName = prompt("Enter new group name:");
      if (!groupName) return;
      
      const selected = prompt("Enter comma-separated country names:\n(" + countryList.join(', ') + ")");
      if (!selected) return;
      
      const countryListNew = selected.split(',').map(s => s.trim()).filter(Boolean);
      userGroups[groupName] = countryListNew;
      localStorage.setItem('userGroups', JSON.stringify(userGroups));
      countryGroups = { ...defaultGroups, ...userGroups };
      populateDropdowns();
      document.getElementById('groupSelect').value = groupName;
      updateGroupCountriesDisplay([groupName]);
      updateGroupCounts();
      renderEntries(entry => countryListNew.some(c => entryContainsCountry(entry, c)), [groupName]);
    }

    function deleteGroup(groupName) {
      if (confirm(`Are you sure you want to delete the group "${groupName}"?`)) {
        delete userGroups[groupName];
        localStorage.setItem('userGroups', JSON.stringify(userGroups));
        countryGroups = { ...defaultGroups, ...userGroups };
        populateDropdowns();
        updateGroupCounts();
        renderEntries(() => true);
        document.getElementById('groupCountries').style.display = 'none';
      }
    }

    function updateCounters(filteredCount = 0) {
      document.getElementById('totalCount').textContent = allParts.length;
      document.getElementById('filteredCount').textContent = filteredCount;
      
      const filteredLabel = document.getElementById('filteredCountLabel');
      if (currentGroupNames.length > 0) {
        filteredLabel.innerHTML = `${currentGroupNames.join(', ')}: <span id="filteredCount" style="color: var(--primary-color)">${filteredCount}</span>`;
      } else {
        filteredLabel.innerHTML = `Filtered Entries: <span id="filteredCount" style="color: var(--primary-color)">${filteredCount}</span>`;
      }
    }

    // Initialize the page
    populateDropdowns();
  </script>
</body>
</html>
