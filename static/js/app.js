const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Populate Dropdown
const dataJSON = d3.json(url);
d3.json(url).then(function(data) {
    names = data.names;

    let select = document.getElementById("selDataset");
 
    for (let i = 0; i < names.length; i++) {
        let optn = names[i];
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);

        if (i == 0){
            let value = el.value
            optionChanged(value);
        };
    };
});
  
// Dropdown option changed function
function optionChanged(value) {

    // Remove metadata
    const element = document.getElementById("sample-metadata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    // Populate bar graph and bubble chart
    const dataJSON = d3.json(url);
    d3.json(url).then(function(data) {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    for (let i = 0; i < samples.length; i++) {
        if (samples[i].id === value)
        {
            var list = [];
            for (var j = 0; j < samples[i].sample_values.length; j++)
            {
                list.push({'sample_values': samples[i].sample_values[j], 'otu_ids': "OTU " + samples[i].otu_ids[j], 'otu_labels': samples[i].otu_labels[j]});
            }
            list.sort(function(b, a) {
                return ((a.sample_values < b.sample_values) ? -1 : ((a.sample_values == b.sample_values) ? 0 : 1));
            });

            let top10 = list.slice(0,10);
            let reversed10 = top10.reverse();
            let sample_values = reversed10.map(item => item.sample_values);
            let otu_ids = reversed10.map(item => item.otu_ids);
            let otu_labels = reversed10.map(item => item.otu_labels);
            let trace1 = {
                x: sample_values,
                y: otu_ids,
                type:"bar",
                text : otu_labels,
                orientation: 'h'
            };
            let data = [trace1];
            Plotly.newPlot("bar", data);

            sample_values = samples[i].sample_values;
            otu_ids = samples[i].otu_ids;
            otu_labels = samples[i].otu_labels;
            let trace2 = {
                x: otu_ids,
                y: sample_values,
                mode : 'markers',
                marker:{
                    color: otu_ids,
                    size: sample_values
                },
                text : otu_labels
            };
            let data2 = [trace2];
            let layout2 = {
                xaxis:{
                    title : "OTU ID"
                }
            };
            Plotly.newPlot("bubble", data2, layout2);
            break;
        }
    }
    for (let i = 0; i < metadata.length; i++) {
        if (metadata[i].id == value)
        {
            let select = document.getElementById("sample-metadata");
            let optn = "id: " + metadata[i].id;
            let el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "ethnicity: " + metadata[i].ethnicity;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "gender: " + metadata[i].gender;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "age: " + metadata[i].age;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "location: " + metadata[i].location;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "bbtype: " + metadata[i].bbtype;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);

            optn = "wfreq: " + metadata[i].wfreq;
            el = document.createElement("p");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);
            break;
        }
    }
});

};
