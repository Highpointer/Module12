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
      PANEL.append("h6").text("ID number: " + result.id);
      PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
      PANEL.append("h6").text("Sex: " + result.gender);
      PANEL.append("h6").text("Age: " + result.age);
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("Belly Button Type: " + result.bbtype);
      PANEL.append("h6").text("Washing Frequency: " + result.wfreq);
    });
  }

  // 1. Create the buildCharts function
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      //var washing_frequency = result.wfreq;
      washing_frequency = intToFloat(result.wfreq, 1)
      console.log("Washing frequency:", result.wfreq);
      console.log("Washing frequency float:", washing_frequency);
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
      //PANEL2.append("h6").text("OTU LABELS: " + result2.otu_labels.slice(0,10));
      // 7.    Create the yticks for the bar chart
      var yticks = result2.otu_ids.slice(0,10);
      console.log("yticks: ", yticks);
      for (let i = 0; i < 10; i++) {
        yticks_sliced = "OTU " + yticks[i];
        yticks[i] = yticks_sliced;
      };
      console.log("yticks with OTU: ", yticks);
      console.log("OTU values: ", result2.sample_values.sort(function(a, b){return b-a}).slice(0,10));
      
      // 8. Create the trace for the bar chart. 
      var traceBar = {
        x: result2.sample_values.sort(function(a, b){return b-a}).slice(0,10),
        y: yticks,
        //title: { text: "<b>Top 10 Bacteria Cultures Found</b>" },
        type: "bar",
        orientation: 'h',
        text: result2.otu_labels,
        //hovertemplate: result2.otu_labels.slice(0,10),
      };
      var barData = [traceBar];

//      8. Create the trace for the bubble chart. 
      var traceBubble = {
        x: result2.otu_ids,
        y: result2.sample_values,
        text: result2.otu_labels,
        mode: 'markers',
        //orientation: 'h',
        marker: {
         color: result2.otu_ids,
         colorscale: 'Earth',
         size: result2.sample_values,
         hovertemplate: result2.otu_labels,
        }
      };
      var bubbleData = [traceBubble];

      // 8. Create the trace for the gauge chart.
      var gaugeData = [
                  {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: washing_frequency,
                    title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week</br>" },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                      axis: { range: [null, 10] },
                      bar: { color: "black" },
                      steps: [
                        { range: [0, 2], color: "red" },
                        { range: [2, 4], color: "orange" },
                        { range: [4, 6], color: "yellow" },
                        { range: [6, 8], color: "lightgreen" },
                        { range: [8, 10], color: "green" },
                      ],
                      threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        //value: washing_frequency
                      }
                    }
                  }
      ];
 
    // // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
    //  xaxis: {title: "Sample Values"},
        width: 500,
        yaxis: {autorange:'reversed'}
      };

    // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: {title: "OTU ID"},
        showlegend: false,
        height: 600,
      };

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500, height: 320, margin: { t: 0, b: 0 }
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar-plot", barData, barLayout);
    //  3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

     //var yticks = ("OTU " + result2.otu_ids.slice(0,10));
     //console.log("yticks: ", yticks)
    });
  }

  function intToFloat(num, decPlaces) { return num.toFixed(decPlaces); }

  init();