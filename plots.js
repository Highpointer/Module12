function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var sampleFirst = sampleNames[0];
      buildMetadata(sampleFirst);
  })}

  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    //buildCharts(newSample);  
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      console.log("data: ", data);
      var metadata = data.metadata;
      console.log("Printing metadata");
      //var samples = data.samples;
      //console.log("samples:", samples);
      console.log("metadata:", metadata)
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      console.log("resultArray:", resultArray)
      var result = resultArray[0];
      console.log("result:", result)
      var PANEL = d3.select("#sample-metadata");
      console.log("PANEL:", PANEL)

      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
      PANEL.append("h6").text("SEX: " + result.gender);
      PANEL.append("h6").text("AGE: " + result.age);
      PANEL.append("h6").text("LOCATION: " + result.location);
      PANEL.append("h6").text("BBTYPE: " + result.bbtype);
      PANEL.append("h6").text("WFREQ: " + result.wfreq);
    });
  }

  // function buildCharts(sample) {
  //   d3.json("samples.json").then((data) => {
  //     console.log("data: ", data);
  //     console.log("Printing samples");
  //     var samples = data.samples;
  //     console.log("samples:", samples);
  //     console.log("metadata:", metadata)
  //     //var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  //     var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  //     console.log("resultArray:", resultArray)
  //     var result = resultArray[0];
  //     console.log("result:", result)
  //     var PANEL = d3.select("#sample-metadata");
  //     console.log("PANEL:", PANEL)

  //     PANEL.html("");
  //     for (let i = 0; i < cars.length; i++) {
  //       PANEL.append("h6").text("OTU_ID: " + result.)
  //       text += cars[i] + "<br>";
  //     }
  //     PANEL.append("h6").text("ID: " + result.id);
  //     PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
  //     PANEL.append("h6").text("SEX: " + result.gender);
  //     PANEL.append("h6").text("AGE: " + result.age);
  //     PANEL.append("h6").text("LOCATION: " + result.location);
  //     PANEL.append("h6").text("BBTYPE: " + result.bbtype);
  //     PANEL.append("h6").text("WFREQ: " + result.wfreq);
  //   });
  // }

  init();  