
async function fetchFederationData() {
  const federationServer = "https://lobstr.co/federation/"; // Replace with the real server
  const gridContainer = document.getElementById('grid-container');
  const lastUpdated = document.getElementById('timestamp');
  lastUpdated.innerHTML = `Loading...`;
  const tilesData = [];

  gridContainer.innerHTML = "";
  const res = {}
  const gAddresses = [
    ["GCN53ZLABTZ63TMH7YAPA6ACQXYZ7UNQ5R5XUK6B7HS3NTTGKV2LBBWX", "Moon Bun Bun - 1"],
    ["GCPLQKNVMMTSL2SMUALMBMEXNFG3SWGLQFQMDHXBU6NFJILU564WDV5M", "QAZ - 1"],
    ["GBDZ4GYA6LSYMEWPJKGNF7XIEGPIDM5HA2MCQFAAKFC3XAYGTSB3DCMC", "Alexei #1"],
    //["GCMYWBB6YZ45NWC6MDPEKO2KMKBANNZRRDNMFHHPAKQTN4GC7LJFBG5E", "Alexei #2"],
    ["GAAXMMGRVBXKXVGU4DK4ZMRBZZZQSMIW4X2LW5V5DVPSQJKI3DG55PKB", "Lumensier"],
    ["GCA7JLP62TO2QYLUJBYD5JC6MEUQTNUTMPV4LE52R2KWPAUZ6OXQUBTD", "Mr. Dot House"],
    ["GA32RD7M3DEZ4EWK5ULLY4VHXW7OWGTJO47PKO4232NHXBTUKVEMTKOD", "Mr. Potato head"],
    ["GAFQBCA4JSNKGQU5QL5RPIKHI5LOPKU2QSVR7G4AR3J7B5DV35ZUWOEC", "Stellar Russia"],
    ["GAEJNNXAYFWSHTQOWCWCKCFCGILAMZMRLVFPRUQIIBUDWFRRXL3A3D7K", "Synergi"],
    ["GCDDB63ZPFHRUPD3IT3LPSXBPUKRUOMBSTVTS6G2755PFJAJYAQDEUDL", "Token Fundation"],
    ["GDIKMIUVR5D2RTPXS2KFKD3VMQQ3AFSCYYEATKYWFXJUZSMSEZ3OFOXG", "Vanguard"],
    ["GDQT375JIAXHG6XYY7UBBAAOIDOOJQ2JGLIYQXJVF2XKWNI353ONU5RY", "White Hat Home"],
    ["GABW4NGFOLUK7DB4UCRLZATFWLQQNPLQU6TDP5PHYG632WW3JHB4CDRH", "William"]

  ];
  for (let i = 0; i < gAddresses.length; i++) {
    var developer = gAddresses[i][1]
    var gAddress = gAddresses[i][0]
    console.log(gAddress)
    const params = new URLSearchParams({
      q: gAddress,
      type: "id"
    });

    try {
      const response = await fetch(`${federationServer}?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      // formating res
      fed = data["stellar_address"].toUpperCase().replace("QSIGF-", "").replace("*LOBSTR.CO", "");
      
      var balance = "";

      const response1 = await fetch(`https://horizon.stellar.org/accounts/${gAddress}`);
      if (!response1.ok) throw new Error(`HTTP error: ${response1.status}`);
      const data1 = await response1.json();
      const balances = data1["balances"]
      
      for (let i = 0; i < balances.length; i++) {
        if (balances[i]["asset_type"] === "native")
        {
          balance = balances[i]["balance"];
          break;
        }
        
      }
      //parseToTile(gAddress, [fed, balance], gridContainer)
      tilesData.push({
        address: gAddress,
        fed: fed,
        balance: balance,
        developer: developer
    })

    } catch (error) {
      console.log(error.message);
    }
  };

  tilesData.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  
  tilesData.forEach(tileData => {
    // Create the tile container
    const tile = document.createElement('div');
    tile.classList.add('tile');

    // Create the header
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = tileData.fed; // Use the 'fed' value for the header

    const dev = document.createElement('div');
    dev.classList.add('developer');
    dev.textContent = tileData.developer; // developer

    // Create the balance
    const balance = document.createElement('div');
    balance.classList.add('balance');
    balance.textContent = `${parseFloat(tileData.balance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} XLM`;

    // Append the header and balance to the tile
    tile.appendChild(header);
    tile.appendChild(balance);
    tile.appendChild(dev);

    // Append the tile to the grid container
    gridContainer.appendChild(tile);
});
lastUpdated.innerHTML = `Last updated: ${new Date(Date.now()).toLocaleString()}`;

  

  
}

// Call the function every 10 minutes
setInterval(fetchFederationData, 600000);

// Optionally, call it immediately on page load
fetchFederationData();

