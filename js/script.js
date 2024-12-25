
async function fetchFederationData() {
  const federationServer = "https://lobstr.co/federation/"; // Replace with the real server
  const gridContainer = document.getElementById('grid-container');
  const res = {}
  const gAddresses = [
    "GDV7HGDG4LKDIQHE7P3FJGDEELZNITWEP7RORGAUKOXRPT2Z67I6SQQW",
    /*"GAVD4E4LKUYPOOO67MXIK6PUDDREC7BRPACXH7JLVI74DCIQ6XQ3ZBU3",
    "GC5SCPJLHX6WFLUG2GF2W57R4LQ4QUEJEXFOXSZTBSGNUD6RJW2ZX4D3",
    "GCRLUZQQKPUB64BA2LYZAMMXSNB5T7GDTHTVBP4XMHPFCXPKVZCPIS4K",
    "GAFQBCA4JSNKGQU5QL5RPIKHI5LOPKU2QSVR7G4AR3J7B5DV35ZUWOEC",
    "GCGKW6V4EJKXRIL2H6P5AFZFLX7GJXUTZC5DHBJ72ZPU4N2HLE2TDRCV",
    "GD2OZMNGK2PKMAHP2EPGUDPUW6MI2MKYI4P5SU4R5SVJDVA2276Q4HS3",
    "GB4WS2WB3VYCH33MBSEDSAQBWBF2GVUXGLLPEQ557ERH77SJZSSHCARQ",
    "GD3VB6TJHFQZS4NDVEZTCV4FEI7KUJESKTWSBAOZY5BKM2FU4ADMX2PJ",
    "GCEHABZCQ3ZYFEZOOPHUWM6RDMQ2V5ZE3Q2I2E7XNVMLE3KKR2P4YLHO",
    "GAHZ2UENZUAGWZSQZMQHHAID5GXLC6C6YMNPLJ7WVMAWUAXRFU5AJVXG",
    "GCN53ZLABTZ63TMH7YAPA6ACQXYZ7UNQ5R5XUK6B7HS3NTTGKV2LBBWX",
    "GDWMUJH3LRSER7JD64XKW35VKWZTHY3BZ4R34SYPB5LJSWVPSAGVCJ5S",
    "GA32RD7M3DEZ4EWK5ULLY4VHXW7OWGTJO47PKO4232NHXBTUKVEMTKOD",
    "GDCFG6KLZJIQEB6ED4UWROPNNEGJDMLY46KUV3FTBXFS6DCUJ3SN7HI5",
    "GBXJSSFO3B7WCPCV3RQ36ERNPQJW3ZQKX5Q2BDPOD64YMYQLRBIWLXO2",
    "GDIKMIUVR5D2RTPXS2KFKD3VMQQ3AFSCYYEATKYWFXJUZSMSEZ3OFOXG",
    "GBT5UPFISSRKJ3HLNURISPGEXSA2PQTLDW5L6LJNKU553NHM3ITDMLS7",
    "GCD22HCPSUAZKW47KR2PP456XRESCOSEVKWOH3JNTER56CVLOP4WCGEF",
    "GBKCHJYIY2G2NQBMJE6ULB4474HLPUDQN2H24BFLOZXUFIFXV5X2WQND",
    "GCPLQKNVMMTSL2SMUALMBMEXNFG3SWGLQFQMDHXBU6NFJILU564WDV5M",*/
    "GANN23MBYYEVDAKHHW7YAN35WNTX4QIFUT7MH5NTZALGEYU5T74JGSCQ"
  ];
  for (let i = 0; i < gAddresses.length; i++) {
    var gAddress = gAddresses[i]
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
      
      res[gAddress] = ([fed, balance])


    } catch (error) {
      console.log(error.message);
      //document.getElementById('response').innerText = `counter: ${counter}: Error: ${error.message}, ${Date.now()}`;
    }
    // string = ""
    // for (let key in res) {
    // string += `${res[key]}\n`;
    // }
      
    // document.getElementById('response').innerText = `${string}`;

    


  };
  gridContainer.innerHTML = "";
  for (let key in res) {
    // Create the tile container
    const tile = document.createElement('div');
    tile.classList.add('tile');
  
    // Create the header
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = res[key][0];
  
    // Create the balance
    const balance = document.createElement('div');
    balance.classList.add('balance');
    balance.textContent = `${parseFloat(res[key][1]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} XLM`;
  
    // Append the header and balance to the tile
    tile.appendChild(header);
    tile.appendChild(balance);
  
    // Append the tile to the grid container
    gridContainer.appendChild(tile);
  };
  
}

// Call the function every 2 minutes
setInterval(fetchFederationData, 120000);

// Optionally, call it immediately on page load
fetchFederationData();

