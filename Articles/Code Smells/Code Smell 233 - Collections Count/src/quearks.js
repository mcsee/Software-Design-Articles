const standardModelParticles = {
  quarks: [
    {
      name: "Up",
      charge: "2/3",
      type: "Quark",
    },
    {
      name: "Down",
      charge: "-1/3",
      type: "Quark",
    },
    // ...
  ],
  leptons: [
    {
      name: "Electron",
      charge: "-1",
      type: "Lepton",
    },
    {
      name: "Muon",
      charge: "-1",
      type: "Lepton",
    },
    // ...
  ],
  gaugeBosons: [
    {
      name: "Photon",
      charge: "0",
      type: "Boson",
    },
    {
      name: "W Boson",
      charge: "±1",
      type: "Boson",
    },
    // ...
  ],
  higgsBoson: [
    {
      name: "Higgs Boson",
      charge: "0",
      type: "Scalar Boson",
    },
  ],
};
 
const quarks = standardModelParticles.quarks.length; 
// Bad names name. It is not representing a count