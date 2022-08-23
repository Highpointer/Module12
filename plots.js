function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      var sampleFirst = sampleNames[0];
      buildMetadata(sampleFirst);
      buildCharts(sampleFirst);
  })
}

  // Initialise the dashboard
  init();

  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);  
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      console.log("data: ", data);
      var metadata = data.metadata;
      console.log("Printing metadata");
      console.log("metadata:", metadata);
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      console.log("resultArray:", resultArray);
      var result = resultArray[0];
      console.log("result:", result);
      var PANEL = d3.select("#sample-metadata");
      console.log("PANEL:", PANEL);

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

  // 1. Create the buildCharts function
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log("data: ", data);
      console.log("Printing samples");
      // 3. Create a variable that holds the samples array
      var samples = data.samples;
      console.log("samples:", samples);
      // 4. Create a variable that filters the samples for the object with the desired sample number
      var resultArray2 = samples.filter(sampleObj => sampleObj.id == sample);
      console.log("resultArray:", resultArray2);
      // 5. Create a variable that holds the first sample in the array
      var result2 = resultArray2[0];
      console.log("result:", result2);
      var PANEL2 = d3.select("#sample-metadata");
      console.log("PANEL:", PANEL2);
 
      PANEL2.append("h6").text("OTU IDS: " + result2.otu_ids.slice(0,10));
      PANEL2.append("h6").text("SAMPLE VALUES: " + result2.sample_values.sort(function(a, b){return b-a}).slice(0,10));
      // 7.    Create the yticks for the bar chart
      var yticks = result2.otu_ids.slice(0,10);
      console.log("yticks: ", yticks);
      for (let i = 0; i < 10; i++) {
        yticks_sliced = "OTU " + yticks[i];
        yticks[i] = yticks_sliced;
      }
      console.log("yticks with OTU: ", yticks);
      console.log("OTU values: ", result2.sample_values.sort(function(a, b){return b-a}).slice(0,10));
      // 8. Create the trace for the bar chart. 
      var trace = {
        x: result2.sample_values.sort(function(a, b){return b-a}).slice(0,10),
        y: yticks,
        type: "bar",
        orientation: 'h'
       }
      var barData = [trace];
    // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
    //  xaxis: {title: "Sample Values"},
        yaxis: {autorange:'reversed'}
    };
    // // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar-plot", barData, barLayout);
    //  });

     //var yticks = ("OTU " + result2.otu_ids.slice(0,10));
     //console.log("yticks: ", yticks)
    });
  }

  init();